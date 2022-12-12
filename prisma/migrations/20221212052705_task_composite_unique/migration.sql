/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,title]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Task_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Task_ownerId_title_key" ON "Task"("ownerId", "title");
