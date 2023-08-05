/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "avatar_url";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT;
