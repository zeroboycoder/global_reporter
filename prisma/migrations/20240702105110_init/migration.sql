/*
  Warnings:

  - You are about to drop the column `partentCommentId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_partentCommentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "partentCommentId",
ADD COLUMN     "parentCommentId" INTEGER,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "reportedPoint" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
