/*
  Warnings:

  - Added the required column `password` to the `Reporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporterId` to the `Reporter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reporter" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "reporterId" TEXT NOT NULL;
