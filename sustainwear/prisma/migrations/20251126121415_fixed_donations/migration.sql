/*
  Warnings:

  - You are about to drop the `charityaddresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `donationitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sizes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[charityTeleNumber]` on the table `charities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `charityaddresses` DROP FOREIGN KEY `charityAddresses_charityId_fkey`;

-- DropForeignKey
ALTER TABLE `donationitems` DROP FOREIGN KEY `donationItems_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `donationitems` DROP FOREIGN KEY `donationItems_conditionId_fkey`;

-- DropForeignKey
ALTER TABLE `donationitems` DROP FOREIGN KEY `donationItems_distributionId_fkey`;

-- DropForeignKey
ALTER TABLE `donationitems` DROP FOREIGN KEY `donationItems_donationId_fkey`;

-- DropForeignKey
ALTER TABLE `donationitems` DROP FOREIGN KEY `donationItems_genderId_fkey`;

-- DropForeignKey
ALTER TABLE `donationitems` DROP FOREIGN KEY `donationItems_sizeId_fkey`;

-- DropForeignKey
ALTER TABLE `inventories` DROP FOREIGN KEY `inventories_sizeId_fkey`;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- DropTable
DROP TABLE `charityaddresses`;

-- DropTable
DROP TABLE `donationitems`;

-- DropTable
DROP TABLE `sizes`;

-- CreateTable
CREATE TABLE `charity_addresses` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `charityId` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `postCode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NULL,

    INDEX `charity_addresses_charityId_idx`(`charityId`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donation_items` (
    `itemId` INTEGER NOT NULL AUTO_INCREMENT,
    `photoUrl` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `donationId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `conditionId` INTEGER NOT NULL,
    `sizeId` INTEGER NULL,
    `genderId` INTEGER NOT NULL,
    `distributionId` INTEGER NULL,

    INDEX `donation_items_donationId_idx`(`donationId`),
    INDEX `donation_items_categoryId_idx`(`categoryId`),
    INDEX `donation_items_conditionId_idx`(`conditionId`),
    INDEX `donation_items_sizeId_idx`(`sizeId`),
    INDEX `donation_items_genderId_idx`(`genderId`),
    INDEX `donation_items_distributionId_idx`(`distributionId`),
    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `size` (
    `sizeId` INTEGER NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sizeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `charities_charityTeleNumber_key` ON `charities`(`charityTeleNumber`);

-- AddForeignKey
ALTER TABLE `charity_addresses` ADD CONSTRAINT `charity_addresses_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `charities`(`charityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `donations`(`donationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_conditionId_fkey` FOREIGN KEY (`conditionId`) REFERENCES `conditions`(`conditionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `size`(`sizeId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `genders`(`genderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_distributionId_fkey` FOREIGN KEY (`distributionId`) REFERENCES `distributions`(`distributionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `size`(`sizeId`) ON DELETE SET NULL ON UPDATE CASCADE;
