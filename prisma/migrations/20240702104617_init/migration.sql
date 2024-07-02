/*
  Warnings:

  - You are about to drop the column `breakingnews` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "breakingnews",
ADD COLUMN     "breakingNews" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "views" SET DEFAULT 0,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "shears" SET DEFAULT 0,
ALTER COLUMN "reportedPoint" SET DEFAULT 0.0;
