CREATE INDEX "distrohop_answers_question_id_index" ON "distrohop_answers" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "distrohop__answers_blocked_answer_id_index" ON "distrohop__answers_blocked" USING btree ("answer_id");--> statement-breakpoint
CREATE INDEX "distrohop_questions_section_id_index" ON "distrohop_questions" USING btree ("section_id");