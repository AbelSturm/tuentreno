CREATE TABLE "client_trainer" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"trainer_id" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"start_date" timestamp with time zone DEFAULT now() NOT NULL,
	"end_date" timestamp with time zone,
	"monthly_fee" numeric(10, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "exercise" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"sets" integer,
	"reps" integer,
	"weight" numeric(5, 2),
	"duration" integer,
	"rest_time" integer,
	"grade" text,
	"holds" text,
	"description" text,
	"completed" boolean DEFAULT false NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "route" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"grade" text NOT NULL,
	"type" text NOT NULL,
	"location" text NOT NULL,
	"sector" text,
	"description" text,
	"height" integer,
	"bolts" integer,
	"style" text,
	"rock_type" text,
	"orientation" text,
	"created_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "route_ascent" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"route_id" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"style" text NOT NULL,
	"attempts" integer,
	"rating" integer,
	"notes" text,
	"is_personal_record" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trainer_stats" (
	"id" text PRIMARY KEY NOT NULL,
	"trainer_id" text NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"active_clients" integer DEFAULT 0 NOT NULL,
	"total_sessions" integer DEFAULT 0 NOT NULL,
	"revenue" numeric(10, 2) DEFAULT '0' NOT NULL,
	"new_clients" integer DEFAULT 0 NOT NULL,
	"retained_clients" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "training_plan" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"trainer_id" text NOT NULL,
	"duration" integer,
	"level" text NOT NULL,
	"focus" text NOT NULL,
	"is_template" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "training_session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"trainer_id" text,
	"title" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"duration" integer,
	"status" text DEFAULT 'programada' NOT NULL,
	"difficulty" text,
	"location" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"max_grade" text,
	"weight" numeric(5, 2),
	"body_fat_percentage" numeric(5, 2),
	"finger_strength" integer,
	"pull_ups" integer,
	"campus_level" text,
	"flexibility" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "user_training_plan" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan_id" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"status" text DEFAULT 'active' NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"assigned_by" text
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "profile_picture" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "birth_date" date;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "experience" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "max_grade" text;--> statement-breakpoint
ALTER TABLE "client_trainer" ADD CONSTRAINT "client_trainer_client_id_user_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_trainer" ADD CONSTRAINT "client_trainer_trainer_id_user_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_session_id_training_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."training_session"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route" ADD CONSTRAINT "route_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_ascent" ADD CONSTRAINT "route_ascent_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_ascent" ADD CONSTRAINT "route_ascent_route_id_route_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."route"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trainer_stats" ADD CONSTRAINT "trainer_stats_trainer_id_user_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_plan" ADD CONSTRAINT "training_plan_trainer_id_user_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_session" ADD CONSTRAINT "training_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_session" ADD CONSTRAINT "training_session_trainer_id_user_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_training_plan" ADD CONSTRAINT "user_training_plan_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_training_plan" ADD CONSTRAINT "user_training_plan_plan_id_training_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."training_plan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_training_plan" ADD CONSTRAINT "user_training_plan_assigned_by_user_id_fk" FOREIGN KEY ("assigned_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;