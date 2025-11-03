import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { offer } from "../../db/schema.js";
import type { Offer } from "./domain.js";
import { domainOfferToDb } from "./domain.js";

/**
 * Upsert an array of offers into the database.
 * This keeps DB persistence concerns isolated so it can be extended later.
 */
export async function upsertOffers(offers: Offer[]): Promise<void> {
  for (const o of offers) {
    const row = domainOfferToDb(o);
    try {
      const existing = await db
        .select()
        .from(offer)
        .where(eq(offer.id, row.id));
      if ((existing as any[]).length === 0) {
        await db.insert(offer).values(row);
        process.stdout.write(`Inserted offer ${row.id}\n`);
      } else {
        await db
          .update(offer)
          .set({
            created_at: row.created_at,
            updated_at: row.updated_at,
            number: row.number,
            residence_address: row.residence_address,
            has_unread_messages: row.has_unread_messages,
            unread_messages_count: row.unread_messages_count,
          })
          .where(eq(offer.id, row.id));
        process.stdout.write(`Updated offer ${row.id}\n`);
      }
    } catch (err) {
      console.error(`DB error for offer ${row.id}:`, err);
    }
  }
}

export async function upsertOffer(o: Offer): Promise<void> {
  await upsertOffers([o]);
}
