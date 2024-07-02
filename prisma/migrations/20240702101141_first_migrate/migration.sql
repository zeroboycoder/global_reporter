/*
  Warnings:

  - You are about to drop the `CommentReply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCommentReply` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentReply" DROP CONSTRAINT "CommentReply_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentReply" DROP CONSTRAINT "CommentReply_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubCommentReply" DROP CONSTRAINT "SubCommentReply_commentReplyId_fkey";

-- DropForeignKey
ALTER TABLE "SubCommentReply" DROP CONSTRAINT "SubCommentReply_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "partentCommentId" INTEGER;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "CommentReply";

-- DropTable
DROP TABLE "SubCommentReply";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_partentCommentId_fkey" FOREIGN KEY ("partentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
