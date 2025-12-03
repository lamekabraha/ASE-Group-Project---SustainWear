/*
  Warnings:

  - You are about to drop the column `charityRegistrationNumber` on the `charities` table. All the data in the column will be lost.
  - You are about to drop the column `charityTeleNum` on the `charities` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `distributions` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to drop the `charity_address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `donation_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[charityRegNumber]` on the table `charities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `charityRegNumber` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `charityTeleNumber` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Made the column `staffId` on table `donations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `charity_address` DROP FOREIGN KEY `charity_address_charityId_fkey`;

-- DropForeignKey
ALTER TABLE `donation_items` DROP FOREIGN KEY `donation_items_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `donation_items` DROP FOREIGN KEY `donation_items_conditionId_fkey`;

-- DropForeignKey
ALTER TABLE `donation_items` DROP FOREIGN KEY `donation_items_distributionId_fkey`;

-- DropForeignKey
ALTER TABLE `donation_items` DROP FOREIGN KEY `donation_items_donationId_fkey`;

-- DropForeignKey
ALTER TABLE `donation_items` DROP FOREIGN KEY `donation_items_genderId_fkey`;

-- DropForeignKey
ALTER TABLE `donation_items` DROP FOREIGN KEY `donation_items_sizeId_fkey`;

-- DropForeignKey
ALTER TABLE `donations` DROP FOREIGN KEY `donations_staffId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `inventory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `inventory_conditionId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `inventory_genderId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `inventory_sizeId_fkey`;

-- AlterTable
ALTER TABLE `charities` DROP COLUMN `charityRegistrationNumber`,
    DROP COLUMN `charityTeleNum`,
    ADD COLUMN `charityRegNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `charityTeleNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `distributions` MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `notes` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `donations` MODIFY `staffId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `charity_address`;

-- DropTable
DROP TABLE `donation_items`;

-- DropTable
DROP TABLE `gender`;

-- DropTable
DROP TABLE `inventory`;

-- DropTable
DROP TABLE `size`;

-- CreateTable
CREATE TABLE `charityAddresses` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `charityId` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `postCode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NULL,

    INDEX `charityAddresses_charityId_idx`(`charityId`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donationItems` (
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

    INDEX `donationItems_donationId_idx`(`donationId`),
    INDEX `donationItems_categoryId_idx`(`categoryId`),
    INDEX `donationItems_conditionId_idx`(`conditionId`),
    INDEX `donationItems_sizeId_idx`(`sizeId`),
    INDEX `donationItems_genderId_idx`(`genderId`),
    INDEX `donationItems_distributionId_idx`(`distributionId`),
    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventories` (
    `inventoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `totalStock` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NULL,
    `categoryId` INTEGER NOT NULL,
    `conditionId` INTEGER NOT NULL,
    `sizeId` INTEGER NULL,
    `genderId` INTEGER NOT NULL,

    INDEX `inventories_categoryId_idx`(`categoryId`),
    INDEX `inventories_conditionId_idx`(`conditionId`),
    INDEX `inventories_sizeId_idx`(`sizeId`),
    INDEX `inventories_genderId_idx`(`genderId`),
    PRIMARY KEY (`inventoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genders` (
    `genderId` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `genders_gender_key`(`gender`),
    PRIMARY KEY (`genderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sizes` (
    `sizeId` INTEGER NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sizes_size_key`(`size`),
    PRIMARY KEY (`sizeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `charities_charityRegNumber_key` ON `charities`(`charityRegNumber`);

-- AddForeignKey
ALTER TABLE `charityAddresses` ADD CONSTRAINT `charityAddresses_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `charities`(`charityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donationItems` ADD CONSTRAINT `donationItems_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `donations`(`donationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donationItems` ADD CONSTRAINT `donationItems_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donationItems` ADD CONSTRAINT `donationItems_conditionId_fkey` FOREIGN KEY (`conditionId`) REFERENCES `conditions`(`conditionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donationItems` ADD CONSTRAINT `donationItems_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `sizes`(`sizeId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donationItems` ADD CONSTRAINT `donationItems_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `genders`(`genderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donationItems` ADD CONSTRAINT `donationItems_distributionId_fkey` FOREIGN KEY (`distributionId`) REFERENCES `distributions`(`distributionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_conditionId_fkey` FOREIGN KEY (`conditionId`) REFERENCES `conditions`(`conditionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `sizes`(`sizeId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `genders`(`genderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
