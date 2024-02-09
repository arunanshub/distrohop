CREATE TABLE `answers` (
	`id` char(36) NOT NULL,
	`msgid` varchar(100) NOT NULL,
	`media_source_path` varchar(256),
	`question_id` char(36) NOT NULL,
	CONSTRAINT `answers_id` PRIMARY KEY(`id`),
	CONSTRAINT `answers_msgid_unique` UNIQUE(`msgid`)
);

--> statement-breakpoint
CREATE TABLE `_answers_blocked` (
	`answer_id` char(36) NOT NULL,
	`blocked_by_answer_id` char(36) NOT NULL,
	CONSTRAINT `_answers_blocked_blocked_by_answer_id_answer_id_pk` PRIMARY KEY(`blocked_by_answer_id`, `answer_id`)
);

--> statement-breakpoint
CREATE TABLE `distributions` (
	`id` char(36) NOT NULL,
	`name` varchar(200) NOT NULL,
	`identifier` varchar(200) NOT NULL,
	`fg_color` varchar(50),
	`bg_color` varchar(50),
	`logo` varchar(256),
	`url` varchar(256),
	CONSTRAINT `distributions_id` PRIMARY KEY(`id`)
);

--> statement-breakpoint
CREATE TABLE `questions` (
	`id` char(36) NOT NULL,
	`msgid` varchar(100) NOT NULL,
	`is_multiple_choice` boolean DEFAULT false,
	`is_media_question` boolean DEFAULT false,
	`additional_info` varchar(256),
	`section_id` char(36) NOT NULL,
	CONSTRAINT `questions_id` PRIMARY KEY(`id`),
	CONSTRAINT `questions_msgid_unique` UNIQUE(`msgid`)
);

--> statement-breakpoint
CREATE TABLE `_important_answers` (
	`result_id` char(36) NOT NULL,
	`important_answer_id` char(36) NOT NULL,
	CONSTRAINT `_important_answers_result_id_important_answer_id_pk` PRIMARY KEY(`result_id`, `important_answer_id`)
);

--> statement-breakpoint
CREATE TABLE `results` (
	`id` char(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `results_id` PRIMARY KEY(`id`)
);

--> statement-breakpoint
CREATE TABLE `_selected_answers` (
	`result_id` char(36) NOT NULL,
	`selected_answer_id` char(36) NOT NULL,
	CONSTRAINT `_selected_answers_result_id_selected_answer_id_pk` PRIMARY KEY(`result_id`, `selected_answer_id`)
);

--> statement-breakpoint
CREATE TABLE `sections` (
	`id` char(36) NOT NULL,
	`msgid` varchar(100) NOT NULL,
	`icon_name` varchar(100) NOT NULL,
	CONSTRAINT `sections_id` PRIMARY KEY(`id`),
	CONSTRAINT `sections_msgid_unique` UNIQUE(`msgid`)
);

--> statement-breakpoint
ALTER TABLE
	`answers`
ADD
	CONSTRAINT `answers_question_id_questions_id_fk` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE cascade ON UPDATE cascade;

--> statement-breakpoint
ALTER TABLE
	`_answers_blocked`
ADD
	CONSTRAINT `_answers_blocked_answer_id_answers_id_fk` FOREIGN KEY (`answer_id`) REFERENCES `answers`(`id`) ON DELETE cascade ON UPDATE cascade;

--> statement-breakpoint
ALTER TABLE
	`_answers_blocked`
ADD
	CONSTRAINT `_answers_blocked_blocked_by_answer_id_answers_id_fk` FOREIGN KEY (`blocked_by_answer_id`) REFERENCES `answers`(`id`) ON DELETE cascade ON UPDATE cascade;

--> statement-breakpoint
ALTER TABLE
	`questions`
ADD
	CONSTRAINT `questions_section_id_sections_id_fk` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE cascade ON UPDATE cascade;

--> statement-breakpoint
ALTER TABLE
	`_important_answers`
ADD
	CONSTRAINT `_important_answers_result_id_results_id_fk` FOREIGN KEY (`result_id`) REFERENCES `results`(`id`) ON DELETE cascade ON UPDATE cascade;

--> statement-breakpoint
ALTER TABLE
	`_important_answers`
ADD
	CONSTRAINT `_important_answers_important_answer_id_answers_id_fk` FOREIGN KEY (`important_answer_id`) REFERENCES `answers`(`id`) ON DELETE cascade ON UPDATE cascade;

--> statement-breakpoint
ALTER TABLE
	`_selected_answers`
ADD
	CONSTRAINT `_selected_answers_result_id_results_id_fk` FOREIGN KEY (`result_id`) REFERENCES `results`(`id`) ON DELETE cascade ON UPDATE cascade;

--> statement-breakpoint
ALTER TABLE
	`_selected_answers`
ADD
	CONSTRAINT `_selected_answers_selected_answer_id_answers_id_fk` FOREIGN KEY (`selected_answer_id`) REFERENCES `answers`(`id`) ON DELETE cascade ON UPDATE cascade;
