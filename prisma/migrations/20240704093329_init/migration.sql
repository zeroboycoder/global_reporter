/*
  Warnings:

  - You are about to drop the `_CategoryToNews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporterId` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToNews" DROP CONSTRAINT "_CategoryToNews_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToNews" DROP CONSTRAINT "_CategoryToNews_B_fkey";

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "hotNews" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reporterId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToNews";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "newsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reporter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER,
    "cityId" INTEGER,
    "isGlobalReporter" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToReporter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Like_newsId_userId_idx" ON "Like"("newsId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToReporter_AB_unique" ON "_CategoryToReporter"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToReporter_B_index" ON "_CategoryToReporter"("B");

-- CreateIndex
CREATE INDEX "Comment_newsId_userId_parentCommentId_idx" ON "Comment"("newsId", "userId", "parentCommentId");

-- CreateIndex
CREATE INDEX "News_title_breakingNews_hotNews_views_reporterId_cityId_cou_idx" ON "News"("title", "breakingNews", "hotNews", "views", "reporterId", "cityId", "countryId", "categoryId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "Reporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporter" ADD CONSTRAINT "Reporter_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporter" ADD CONSTRAINT "Reporter_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToReporter" ADD CONSTRAINT "_CategoryToReporter_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToReporter" ADD CONSTRAINT "_CategoryToReporter_B_fkey" FOREIGN KEY ("B") REFERENCES "Reporter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
