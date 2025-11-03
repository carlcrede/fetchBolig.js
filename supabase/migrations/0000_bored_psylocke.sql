CREATE TABLE "message" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"thread_id" integer NOT NULL,
	"sender_id" varchar(191),
	"sender_name" varchar(512),
	"receiver_id" varchar(191),
	"receiver_name" varchar(512),
	"body" text,
	"status" varchar(191),
	"attachments" jsonb,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_thread" (
	"id" integer PRIMARY KEY NOT NULL,
	"related_entity" varchar(191),
	"related_entity_type" varchar(191),
	"related_entity_state" varchar(191),
	"title" varchar(1024),
	"has_unread_messages" boolean DEFAULT false NOT NULL,
	"has_attachments" boolean DEFAULT false NOT NULL,
	"last_message" jsonb,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "offer" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"number" integer NOT NULL,
	"offer_text" text,
	"showing_text" text,
	"internal_note" text,
	"deadline" timestamp with time zone,
	"recipients" jsonb,
	"recipients_count" integer,
	"winner_id" varchar(191),
	"state" varchar(191),
	"organization_id" varchar(191),
	"company_id" varchar(191),
	"residence_id" varchar(191),
	"property_id" varchar(191),
	"residence_address" varchar(1024),
	"has_unread_messages" boolean DEFAULT false NOT NULL,
	"unread_messages_count" integer DEFAULT 0 NOT NULL,
	"only_for_students" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_message_thread_unread" ON "message_thread" USING btree ("has_unread_messages");--> statement-breakpoint
CREATE INDEX "idx_message_thread_created" ON "message_thread" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_message_thread_rel_ent" ON "message_thread" USING btree ("related_entity");--> statement-breakpoint
CREATE INDEX "idx_offer_has_unread" ON "offer" USING btree ("has_unread_messages");--> statement-breakpoint
CREATE INDEX "idx_offer_created_at" ON "offer" USING btree ("created_at");