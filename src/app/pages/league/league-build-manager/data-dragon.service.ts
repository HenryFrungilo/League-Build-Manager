import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, timeout } from 'rxjs';

import { BuildData, Champion, Item } from './build.model';

const CDN = 'https://ddragon.leagueoflegends.com';
const SUMMONERS_RIFT = '11';

const EZREAL = { name: 'Ezreal', title: 'The Prodigal Explorer', role: 'Marksman' };

/** Items shown in the shop, matched by name against the live Data Dragon item list. */
const SHOP_ITEMS = [
  'Trinity Force',
  'Essence Reaver',
  'Infinity Edge',
  "Lord Dominik's Regards",
  "Serylda's Grudge",
  "Sterak's Gage",
  'Maw of Malmortius',
  'Guardian Angel',
  "Death's Dance",
  'Black Cleaver',
  "Berserker's Greaves",
  'Ionian Boots of Lucidity',
];

/** Example values, only used when Data Dragon can't be reached. */
export const FALLBACK_DATA: BuildData = {
  champion: EZREAL,
  live: false,
  items: [
    ['Trinity Force', 3333, 'Attack damage, haste and a spellblade proc.'],
    ['Essence Reaver', 3000, 'Attack damage, crit and mana restore.'],
    ['Infinity Edge', 3400, 'Attack damage and critical strike damage.'],
    ["Lord Dominik's Regards", 3100, 'Armor penetration against tanky targets.'],
    ["Serylda's Grudge", 3200, 'Armor penetration and slow on abilities.'],
    ["Sterak's Gage", 3200, 'Attack damage and a shield when low.'],
    ['Maw of Malmortius', 3100, 'Attack damage and a magic shield.'],
    ['Guardian Angel', 3200, 'Attack damage, armor and a revive.'],
    ["Death's Dance", 3300, 'Attack damage and delayed damage.'],
    ['Black Cleaver', 3000, 'Attack damage, health and shred armor.'],
    ["Berserker's Greaves", 1100, 'Boots with attack speed.'],
    ['Ionian Boots of Lucidity', 950, 'Boots with ability haste.'],
  ].map(([name, cost, description]) => ({
    id: String(name),
    name: String(name),
    cost: Number(cost),
    description: String(description),
  })),
};

interface ItemFile {
  data: Record<
    string,
    {
      name: string;
      plaintext?: string;
      gold: { total: number; purchasable: boolean };
      maps: Record<string, boolean>;
      image: { full: string };
    }
  >;
}

export function toBuildData(version: string, file: ItemFile): BuildData {
  const items: Item[] = [];
  for (const name of SHOP_ITEMS) {
    const entry = Object.entries(file.data).find(
      ([, item]) =>
        item.name === name && item.gold.purchasable && item.maps[SUMMONERS_RIFT]
    );
    if (entry) {
      const [id, item] = entry;
      items.push({
        id,
        name: item.name,
        cost: item.gold.total,
        description: item.plaintext ?? '',
        icon: `${CDN}/cdn/${version}/img/item/${item.image.full}`,
      });
    }
  }

  const champion: Champion = {
    ...EZREAL,
    icon: `${CDN}/cdn/${version}/img/champion/${EZREAL.name}.png`,
  };
  return { champion, items, live: true };
}

@Injectable({ providedIn: 'root' })
export class DataDragonService {
  constructor(private _http: HttpClient) {}

  load(): Observable<BuildData> {
    return this._http.get<string[]>(`${CDN}/api/versions.json`).pipe(
      switchMap((versions) =>
        this._http
          .get<ItemFile>(`${CDN}/cdn/${versions[0]}/data/en_US/item.json`)
          .pipe(map((file) => toBuildData(versions[0], file)))
      ),
      // A list with only a couple of matches means the item names changed upstream.
      map((data) => (data.items.length >= 8 ? data : FALLBACK_DATA)),
      timeout(8000),
      catchError(() => of(FALLBACK_DATA))
    );
  }
}
