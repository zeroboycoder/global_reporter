/*
  Warnings:

  - You are about to drop the column `is_active` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `repoterId` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `repoter_id` on the `login_access_token` table. All the data in the column will be lost.
  - You are about to drop the column `repoter_id` on the `notifications` table. All the data in the column will be lost.
  - The values [REPOTER] on the enum `notifications_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [POST] on the enum `reports_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `repoterId` on the `save_blogs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_devices` table. All the data in the column will be lost.
  - Added the required column `reporter_id` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `user_devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_repoterId_fkey`;

-- DropForeignKey
ALTER TABLE `login_access_token` DROP FOREIGN KEY `login_access_token_repoter_id_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_repoter_id_fkey`;

-- DropForeignKey
ALTER TABLE `save_blogs` DROP FOREIGN KEY `save_blogs_repoterId_fkey`;

-- DropForeignKey
ALTER TABLE `user_devices` DROP FOREIGN KEY `user_devices_userId_fkey`;

-- DropIndex
DROP INDEX `blogs_created_at_idx` ON `blogs`;

-- DropIndex
DROP INDEX `blogs_is_active_idx` ON `blogs`;

-- DropIndex
DROP INDEX `versions_url_key` ON `versions`;

-- AlterTable
ALTER TABLE `blogs` DROP COLUMN `is_active`,
    DROP COLUMN `repoterId`,
    ADD COLUMN `hot_count` INTEGER NULL,
    ADD COLUMN `publish_date` DATETIME(3) NULL,
    ADD COLUMN `reporter_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `likes` DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `login_access_token` DROP COLUMN `repoter_id`,
    ADD COLUMN `reporter_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `repoter_id`,
    ADD COLUMN `reporter_id` VARCHAR(191) NULL,
    MODIFY `type` ENUM('HOT_NEW', 'COMMENT', 'COMMENT_REPLY', 'LIKE', 'SYSTEM', 'USER', 'REPORTER', 'CUSTOM') NOT NULL;

-- AlterTable
ALTER TABLE `reports` MODIFY `type` ENUM('COMMENT', 'BLOG') NOT NULL;

-- AlterTable
ALTER TABLE `save_blogs` DROP COLUMN `repoterId`,
    ADD COLUMN `reporterId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user_devices` DROP COLUMN `userId`,
    ADD COLUMN `type` ENUM('WEB', 'ANDROID', 'IOS') NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `photo_url` VARCHAR(200) NULL;

-- CreateIndex
CREATE INDEX `blogs_status_idx` ON `blogs`(`status`);

-- CreateIndex
CREATE INDEX `blogs_publish_date_idx` ON `blogs`(`publish_date` DESC);

-- AddForeignKey
ALTER TABLE `user_devices` ADD CONSTRAINT `user_devices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `login_access_token` ADD CONSTRAINT `login_access_token_reporter_id_fkey` FOREIGN KEY (`reporter_id`) REFERENCES `reporters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_reporter_id_fkey` FOREIGN KEY (`reporter_id`) REFERENCES `reporters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `save_blogs` ADD CONSTRAINT `save_blogs_reporterId_fkey` FOREIGN KEY (`reporterId`) REFERENCES `reporters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_reporter_id_fkey` FOREIGN KEY (`reporter_id`) REFERENCES `reporters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
