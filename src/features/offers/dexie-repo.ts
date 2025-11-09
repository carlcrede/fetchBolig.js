import * as DexieModule from "dexie";
import type { Offer } from "./domain.js";
import type { OfferRepo } from "./repo-interface.js";

// Dexie can be exported as a default or as the module namespace depending on
// bundler/tsconfig interop settings. Resolve the constructor defensively.
const DexieCtor: any = (DexieModule as any).default ?? DexieModule;

/**
 * Dexie-based client-side repository for Offer domain.
 * Stores Date fields as ISO strings and converts on read/write.
 */

type LocalOffer = Omit<Offer, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

class LocalDB {
  db: any;
  offers!: DexieModule.Dexie.Table<LocalOffer, string>;
  constructor() {
    this.db = new DexieCtor("fetchBolig_local");
    this.db.version(1).stores({
      offers: "id, createdAt, hasUnreadMessages",
    });
    this.offers = this.db.table("offers");
  }
}
const db = new LocalDB();

export const dexieRepo: OfferRepo = {
  async upsertOffers(offers) {
    const putItems: LocalOffer[] = offers.map((o) => ({
      ...o,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    }));
    await db.offers.bulkPut(putItems as any);
  },
  async upsertOffer(o) {
    await this.upsertOffers([o]);
  },
  async getOffer(id) {
    const raw = await db.offers.get(id as any);
    if (!raw) return undefined;
    return {
      ...raw,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    } as unknown as Offer;
  },
};
