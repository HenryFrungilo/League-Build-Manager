import { Component, OnInit } from '@angular/core';

import { BUILD_SIZE, BuildData, Item } from './build.model';
import { DataDragonService } from './data-dragon.service';

const STORAGE_KEY = 'league-build-manager.ezreal';

@Component({
  selector: 'app-league-build-manager',
  templateUrl: './league-build-manager.component.html',
  styleUrls: ['./league-build-manager.component.scss']
})
export class LeagueBuildManagerComponent implements OnInit {
  data?: BuildData;
  slots: (Item | null)[] = Array(BUILD_SIZE).fill(null);

  constructor(private _dataDragon: DataDragonService) {}

  ngOnInit(): void {
    this._dataDragon.load().subscribe((data) => {
      this.data = data;
      this.restore();
    });
  }

  get total(): number {
    return this.slots.reduce((sum, item) => sum + (item?.cost ?? 0), 0);
  }

  get isFull(): boolean {
    return !this.slots.includes(null);
  }

  inBuild(item: Item): boolean {
    return this.slots.some((slot) => slot?.id === item.id);
  }

  add(item: Item): void {
    const free = this.slots.indexOf(null);
    if (free === -1 || this.inBuild(item)) {
      return;
    }
    this.slots[free] = item;
    this.save();
  }

  remove(index: number): void {
    this.slots[index] = null;
    this.save();
  }

  reset(): void {
    this.slots = Array(BUILD_SIZE).fill(null);
    this.save();
  }

  hideIcon(target: { icon?: string }): void {
    target.icon = undefined;
  }

  private save(): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.slots.map((slot) => slot?.id ?? null))
      );
    } catch {
      // Storage can be blocked (private mode); the build just won't persist.
    }
  }

  private restore(): void {
    try {
      const ids: (string | null)[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? '[]'
      );
      this.slots = Array.from(
        { length: BUILD_SIZE },
        (_, i) => this.data?.items.find((item) => item.id === ids[i]) ?? null
      );
    } catch {
      this.slots = Array(BUILD_SIZE).fill(null);
    }
  }
}
