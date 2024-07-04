/*
  Warnings:

  - You are about to drop the column `likes` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `shears` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailImg` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `News` table. All the data in the column will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thumbnailImgUrl` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailImgUrl` to the `SystemNotification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropIndex
DROP INDEX "News_title_breakingNews_hotNews_views_reporterId_cityId_cou_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "likes",
ADD COLUMN     "likeCounts" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "News" DROP COLUMN "likes",
DROP COLUMN "shears",
DROP COLUMN "thumbnailImg",
DROP COLUMN "views",
ADD COLUMN     "likeCounts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shearCounts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "thumbnailImgUrl" TEXT NOT NULL,
ADD COLUMN     "viewCounts" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "SystemNotification" ADD COLUMN     "thumbnailImgUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "Like";

-- CreateTable
CREATE TABLE "LikedComment" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikedComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedNews" (
    "id" SERIAL NOT NULL,
    "newsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikedNews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LikedComment_commentId_userId_idx" ON "LikedComment"("commentId", "userId");

-- CreateIndex
CREATE INDEX "LikedNews_newsId_userId_idx" ON "LikedNews"("newsId", "userId");

-- CreateIndex
CREATE INDEX "City_countryId_idx" ON "City"("countryId");

-- CreateIndex
CREATE INDEX "News_title_breakingNews_hotNews_viewCounts_reporterId_cityI_idx" ON "News"("title", "breakingNews", "hotNews", "viewCounts", "reporterId", "cityId", "countryId", "categoryId");

-- CreateIndex
CREATE INDEX "Notification_newsId_commentId_systemNotificationId_idx" ON "Notification"("newsId", "commentId", "systemNotificationId");

-- CreateIndex
CREATE INDEX "Reporter_countryId_cityId_idx" ON "Reporter"("countryId", "cityId");

-- CreateIndex
CREATE INDEX "UserNotification_userId_idx" ON "UserNotification"("userId");

-- CreateIndex
CREATE INDEX "UserSetting_countryId_cityId_userNotificationId_idx" ON "UserSetting"("countryId", "cityId", "userNotificationId");

-- AddForeignKey
ALTER TABLE "LikedComment" ADD CONSTRAINT "LikedComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedComment" ADD CONSTRAINT "LikedComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedNews" ADD CONSTRAINT "LikedNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedNews" ADD CONSTRAINT "LikedNews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
