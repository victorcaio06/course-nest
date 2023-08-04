/*
  Warnings:

  - The primary key for the `tasks_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `tasks_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tasks_users" DROP CONSTRAINT "tasks_users_pkey",
ADD CONSTRAINT "tasks_users_pkey" PRIMARY KEY ("user_id", "task_id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_users_id_key" ON "tasks_users"("id");
