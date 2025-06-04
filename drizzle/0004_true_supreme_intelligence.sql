CREATE TABLE "client_invite" (
	"id" text PRIMARY KEY NOT NULL,
	"trainer_id" text NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone,
	"used" boolean DEFAULT false NOT NULL,
	CONSTRAINT "client_invite_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "client_invite" ADD CONSTRAINT "client_invite_trainer_id_user_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;