import type { OfferRepo } from "./repo-interface.js";

/**
 * Returns the appropriate OfferRepo implementation for the current runtime.
 * - Node/server: dynamically import the Drizzle-backed `repository.ts` (server-only).
 * - Browser: dynamically import the Dexie adapter.
 *
 * Consumers should call `const repo = await getOfferRepo()` and then call repo methods.
 */
export async function getOfferRepo(): Promise<OfferRepo> {
  if (typeof window === "undefined") {
    // server runtime — use the existing Drizzle-backed repository
    const mod = await import("./repository.js");
    return {
      upsertOffers: mod.upsertOffers,
      upsertOffer: mod.upsertOffer,
      // repository.ts doesn't currently export getOffer; that's optional
    };
  } else {
    // browser runtime — use the Dexie adapter
    const mod = await import("./dexie-repo.js");
    return mod.dexieRepo;
  }
}
