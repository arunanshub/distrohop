-- CreateTable
CREATE TABLE "Section" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "msgid" VARCHAR(100) NOT NULL,
    "iconName" VARCHAR(100) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "msgid" VARCHAR(100) NOT NULL,
    "isMultipleChoice" BOOLEAN NOT NULL DEFAULT false,
    "isMediaQuestion" BOOLEAN NOT NULL DEFAULT false,
    "additionalInfo" TEXT,
    "sectionId" UUID NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "msgid" VARCHAR(100) NOT NULL,
    "mediaSourcePath" TEXT,
    "questionId" UUID NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distribution" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(200) NOT NULL,
    "identifier" VARCHAR(200) NOT NULL,
    "fgColor" VARCHAR(100),
    "bgColor" VARCHAR(100),
    "logo" TEXT,
    "url" TEXT,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ip" INET,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlockedAnswer" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SelectedAnswers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ImportantAnswers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_msgid_key" ON "Section"("msgid");

-- CreateIndex
CREATE UNIQUE INDEX "Question_msgid_key" ON "Question"("msgid");

-- CreateIndex
CREATE UNIQUE INDEX "Question_sectionId_key" ON "Question"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_msgid_key" ON "Answer"("msgid");

-- CreateIndex
CREATE UNIQUE INDEX "Distribution_identifier_key" ON "Distribution"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "_BlockedAnswer_AB_unique" ON "_BlockedAnswer"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockedAnswer_B_index" ON "_BlockedAnswer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SelectedAnswers_AB_unique" ON "_SelectedAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_SelectedAnswers_B_index" ON "_SelectedAnswers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImportantAnswers_AB_unique" ON "_ImportantAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_ImportantAnswers_B_index" ON "_ImportantAnswers"("B");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedAnswer" ADD CONSTRAINT "_BlockedAnswer_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedAnswer" ADD CONSTRAINT "_BlockedAnswer_B_fkey" FOREIGN KEY ("B") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SelectedAnswers" ADD CONSTRAINT "_SelectedAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SelectedAnswers" ADD CONSTRAINT "_SelectedAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportantAnswers" ADD CONSTRAINT "_ImportantAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportantAnswers" ADD CONSTRAINT "_ImportantAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;
