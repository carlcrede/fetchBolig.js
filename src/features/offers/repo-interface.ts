export type OfferRepo = {
  upsertOffers(offers: import("./domain.js").Offer[]): Promise<void>;
  upsertOffer?(o: import("./domain.js").Offer): Promise<void>;
  getOffer?(id: string): Promise<import("./domain.js").Offer | undefined>;
};
