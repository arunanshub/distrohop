CREATE TABLE "distrohop_answers" (
	"id" text PRIMARY KEY NOT NULL,
	"msgid" text NOT NULL,
	"media_source_path" text,
	"question_id" text NOT NULL,
	CONSTRAINT "distrohop_answers_msgid_unique" UNIQUE("msgid")
);
--> statement-breakpoint
CREATE TABLE "distrohop__answers_blocked" (
	"answer_id" text NOT NULL,
	"blocked_by_answer_id" text NOT NULL,
	CONSTRAINT "distrohop__answers_blocked_blocked_by_answer_id_answer_id_pk" PRIMARY KEY("blocked_by_answer_id","answer_id")
);
--> statement-breakpoint
CREATE TABLE "distrohop_distributions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"identifier" text NOT NULL,
	"fg_color" text,
	"bg_color" text,
	"url" text,
	CONSTRAINT "distrohop_distributions_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
CREATE TABLE "distrohop_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"msgid" text NOT NULL,
	"is_multiple_choice" boolean DEFAULT false,
	"is_media_question" boolean DEFAULT false,
	"additional_info" text,
	"section_id" text NOT NULL,
	CONSTRAINT "distrohop_questions_msgid_unique" UNIQUE("msgid")
);
--> statement-breakpoint
CREATE TABLE "distrohop__important_answers" (
	"result_id" text NOT NULL,
	"important_answer_id" text NOT NULL,
	CONSTRAINT "distrohop__important_answers_result_id_important_answer_id_pk" PRIMARY KEY("result_id","important_answer_id")
);
--> statement-breakpoint
CREATE TABLE "distrohop_results" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "distrohop__selected_answers" (
	"result_id" text NOT NULL,
	"selected_answer_id" text NOT NULL,
	CONSTRAINT "distrohop__selected_answers_result_id_selected_answer_id_pk" PRIMARY KEY("result_id","selected_answer_id")
);
--> statement-breakpoint
CREATE TABLE "distrohop_sections" (
	"id" text PRIMARY KEY NOT NULL,
	"msgid" text NOT NULL,
	"icon_name" text NOT NULL,
	CONSTRAINT "distrohop_sections_msgid_unique" UNIQUE("msgid")
);
--> statement-breakpoint
ALTER TABLE "distrohop_answers" ADD CONSTRAINT "distrohop_answers_question_id_distrohop_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."distrohop_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distrohop__answers_blocked" ADD CONSTRAINT "distrohop__answers_blocked_answer_id_distrohop_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."distrohop_answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distrohop__answers_blocked" ADD CONSTRAINT "distrohop__answers_blocked_blocked_by_answer_id_distrohop_answers_id_fk" FOREIGN KEY ("blocked_by_answer_id") REFERENCES "public"."distrohop_answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distrohop_questions" ADD CONSTRAINT "distrohop_questions_section_id_distrohop_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."distrohop_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distrohop__important_answers" ADD CONSTRAINT "distrohop__important_answers_result_id_distrohop_results_id_fk" FOREIGN KEY ("result_id") REFERENCES "public"."distrohop_results"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distrohop__important_answers" ADD CONSTRAINT "distrohop__important_answers_important_answer_id_distrohop_answers_id_fk" FOREIGN KEY ("important_answer_id") REFERENCES "public"."distrohop_answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distrohop__selected_answers" ADD CONSTRAINT "distrohop__selected_answers_result_id_distrohop_results_id_fk" FOREIGN KEY ("result_id") REFERENCES "public"."distrohop_results"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distrohop__selected_answers" ADD CONSTRAINT "distrohop__selected_answers_selected_answer_id_distrohop_answers_id_fk" FOREIGN KEY ("selected_answer_id") REFERENCES "public"."distrohop_answers"("id") ON DELETE cascade ON UPDATE no action;