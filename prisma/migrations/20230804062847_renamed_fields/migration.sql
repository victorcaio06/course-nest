/*
  Warnings:

  - The primary key for the `tasks_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tasksId` on the `tasks_users` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `tasks_users` table. All the data in the column will be lost.
  - Added the required column `task_id` to the `tasks_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tasks_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks_users" DROP CONSTRAINT "tasks_users_tasksId_fkey";

-- DropForeignKey
ALTER TABLE "tasks_users" DROP CONSTRAINT "tasks_users_usersId_fkey";

-- AlterTable
ALTER TABLE "tasks_users" DROP CONSTRAINT "tasks_users_pkey",
DROP COLUMN "tasksId",
DROP COLUMN "usersId",
ADD COLUMN     "task_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "tasks_users_pkey" PRIMARY KEY ("id", "user_id", "task_id");

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
