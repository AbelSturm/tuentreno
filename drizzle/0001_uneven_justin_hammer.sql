ALTER TABLE "user" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");