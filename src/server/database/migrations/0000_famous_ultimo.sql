CREATE TABLE `answers` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`msgid` text(100) NOT NULL,
	`media_source_path` text(256),
	`question_id` text(36) NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE cascade ON DELETE cascade
);

--> statement-breakpoint
CREATE TABLE `_answers_blocked` (
	`answer_id` text(36) NOT NULL,
	`blocked_by_answer_id` text(36) NOT NULL,
	PRIMARY KEY(`answer_id`, `blocked_by_answer_id`),
	FOREIGN KEY (`answer_id`) REFERENCES `answers`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`blocked_by_answer_id`) REFERENCES `answers`(`id`) ON UPDATE cascade ON DELETE cascade
);

--> statement-breakpoint
CREATE TABLE `distributions` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text(200) NOT NULL,
	`identifier` text(200) NOT NULL,
	`fg_color` text(50),
	`bg_color` text(50),
	`logo` text(256),
	`url` text(256)
);

--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`msgid` text(100) NOT NULL,
	`is_multiple_choice` integer DEFAULT false,
	`is_media_question` integer DEFAULT false,
	`additional_info` text(256),
	`section_id` text(36) NOT NULL,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE cascade ON DELETE cascade
);

--> statement-breakpoint
CREATE TABLE `_important_answers` (
	`result_id` text(36) NOT NULL,
	`important_answer_id` text(36) NOT NULL,
	PRIMARY KEY(`important_answer_id`, `result_id`),
	FOREIGN KEY (`result_id`) REFERENCES `results`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`important_answer_id`) REFERENCES `answers`(`id`) ON UPDATE cascade ON DELETE cascade
);

--> statement-breakpoint
CREATE TABLE `results` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);

--> statement-breakpoint
CREATE TABLE `_selected_answers` (
	`result_id` text(36) NOT NULL,
	`selected_answer_id` text(36) NOT NULL,
	PRIMARY KEY(`result_id`, `selected_answer_id`),
	FOREIGN KEY (`result_id`) REFERENCES `results`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`selected_answer_id`) REFERENCES `answers`(`id`) ON UPDATE cascade ON DELETE cascade
);

--> statement-breakpoint
CREATE TABLE `sections` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`msgid` text(100) NOT NULL,
	`icon_name` text(100) NOT NULL
);

--> statement-breakpoint
CREATE UNIQUE INDEX `answers_msgid_unique` ON `answers` (`msgid`);

--> statement-breakpoint
CREATE UNIQUE INDEX `questions_msgid_unique` ON `questions` (`msgid`);

--> statement-breakpoint
CREATE UNIQUE INDEX `sections_msgid_unique` ON `sections` (`msgid`);
