/*
  Warnings:

  - You are about to drop the column `points` on the `ReportComment` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `ReportNews` table. All the data in the column will be lost.
  - Added the required column `point` to the `ReportComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point` to the `ReportNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportComment" DROP COLUMN "points",
ADD COLUMN     "point" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReportNews" DROP COLUMN "points",
ADD COLUMN     "point" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reporter" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "country" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "adminId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ipAddresses" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Admin_adminId_name_idx" ON "Admin"("adminId", "name");
