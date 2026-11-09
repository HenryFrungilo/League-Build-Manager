import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { LeagueBuildManagerComponent } from './league-build-manager.component';
import { FALLBACK_DATA, toBuildData } from './data-dragon.service';

const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';
const ITEMS_URL =
  'https://ddragon.leagueoflegends.com/cdn/99.1.1/data/en_US/item.json';

function itemFile(names: string[]) {
  return {
    data: Object.fromEntries(
      names.map((name, i) => [
        String(1000 + i),
        {
          name,
          plaintext: `${name} text`,
          gold: { total: 3000 + i, purchasable: true },
          maps: { '11': true },
          image: { full: `${1000 + i}.png` },
        },
      ])
    ),
  };
}

describe('LeagueBuildManagerComponent', () => {
  let component: LeagueBuildManagerComponent;
  let fixture: ComponentFixture<LeagueBuildManagerComponent>;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      declarations: [LeagueBuildManagerComponent],
      imports: [HttpClientTestingModule, CardModule, ButtonModule],
    });
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LeagueBuildManagerComponent);
    component = fixture.componentInstance;
  });

  function loadLive() {
    fixture.detectChanges();
    http.expectOne(VERSIONS_URL).flush(['99.1.1', '98.1.1']);
    http
      .expectOne(ITEMS_URL)
      .flush(itemFile(FALLBACK_DATA.items.map((item) => item.name)));
    fixture.detectChanges();
  }

  it('loads live items from Data Dragon using the latest version', () => {
    loadLive();
    expect(component.data?.live).toBeTrue();
    expect(component.data?.items.length).toBe(FALLBACK_DATA.items.length);
    expect(component.data?.items[0].icon).toBe(
      'https://ddragon.leagueoflegends.com/cdn/99.1.1/img/item/1000.png'
    );
  });

  it('falls back to example data when Data Dragon is unreachable', () => {
    fixture.detectChanges();
    http.expectOne(VERSIONS_URL).error(new ProgressEvent('error'));
    fixture.detectChanges();
    expect(component.data).toBe(FALLBACK_DATA);
    expect(fixture.nativeElement.textContent).toContain('example items');
  });

  it('falls back when too few shop items are found upstream', () => {
    expect(toBuildData('99.1.1', itemFile(['Trinity Force'])).items.length).toBe(1);
    fixture.detectChanges();
    http.expectOne(VERSIONS_URL).flush(['99.1.1']);
    http.expectOne(ITEMS_URL).flush(itemFile(['Trinity Force']));
    expect(component.data).toBe(FALLBACK_DATA);
  });

  it('adds items to the first free slot and sums their cost', () => {
    loadLive();
    const [a, b] = component.data!.items;
    component.add(a);
    component.add(b);
    expect(component.slots[0]).toBe(a);
    expect(component.slots[1]).toBe(b);
    expect(component.total).toBe(a.cost + b.cost);
  });

  it('does not add the same item twice or more than 6 items', () => {
    loadLive();
    const items = component.data!.items;
    component.add(items[0]);
    component.add(items[0]);
    expect(component.slots.filter(Boolean).length).toBe(1);

    items.slice(1).forEach((item) => component.add(item));
    expect(component.slots.filter(Boolean).length).toBe(6);
    expect(component.isFull).toBeTrue();
  });

  it('removes a slot and resets the build', () => {
    loadLive();
    const [a, b] = component.data!.items;
    component.add(a);
    component.add(b);
    component.remove(0);
    expect(component.slots[0]).toBeNull();
    expect(component.total).toBe(b.cost);

    component.reset();
    expect(component.total).toBe(0);
  });

  it('restores the saved build on the next visit', () => {
    loadLive();
    const [a, b] = component.data!.items;
    component.add(a);
    component.add(b);

    const second = TestBed.createComponent(LeagueBuildManagerComponent);
    second.detectChanges();
    http.expectOne(VERSIONS_URL).flush(['99.1.1']);
    http
      .expectOne(ITEMS_URL)
      .flush(itemFile(FALLBACK_DATA.items.map((item) => item.name)));
    expect(second.componentInstance.slots.map((slot) => slot?.id)).toEqual([
      a.id,
      b.id,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  });
});
