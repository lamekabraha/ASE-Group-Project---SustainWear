-- CreateTable
CREATE TABLE `users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `role` ENUM('Donor', 'Staff', 'Admin') NOT NULL DEFAULT 'Donor',
    `charityId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_charityId_idx`(`charityId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charities` (
    `charityId` INTEGER NOT NULL AUTO_INCREMENT,
    `charityName` VARCHAR(191) NOT NULL,
    `charityEmail` VARCHAR(191) NOT NULL,
    `charityTeleNum` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `charityRegistrationNumber` VARCHAR(191) NULL,

    UNIQUE INDEX `charities_charityEmail_key`(`charityEmail`),
    PRIMARY KEY (`charityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charity_address` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `charityId` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `postcode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NULL,

    INDEX `charity_address_charityId_idx`(`charityId`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donations` (
    `donationId` INTEGER NOT NULL AUTO_INCREMENT,
    `donationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `donorId` INTEGER NOT NULL,
    `charityId` INTEGER NOT NULL,
    `notes` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'SCHEDULED', 'COLLECTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `staffId` INTEGER NULL,

    INDEX `donations_donorId_idx`(`donorId`),
    INDEX `donations_charityId_idx`(`charityId`),
    INDEX `donations_staffId_idx`(`staffId`),
    PRIMARY KEY (`donationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donation_items` (
    `itemId` INTEGER NOT NULL AUTO_INCREMENT,
    `photoUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `donationId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `conditionId` INTEGER NOT NULL,

    INDEX `donation_items_donationId_idx`(`donationId`),
    INDEX `donation_items_categoryId_idx`(`categoryId`),
    INDEX `donation_items_conditionId_idx`(`conditionId`),
    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `avgWeight` DECIMAL(10, 2) NOT NULL,
    `avgCo2Saved` DECIMAL(10, 2) NOT NULL,

    UNIQUE INDEX `categories_category_key`(`category`),
    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conditions` (
    `conditionId` INTEGER NOT NULL AUTO_INCREMENT,
    `condition` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `conditions_condition_key`(`condition`),
    PRIMARY KEY (`conditionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `inventoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `totalStock` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NULL,
    `charityId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `inventory_charityId_categoryId_key`(`charityId`, `categoryId`),
    PRIMARY KEY (`inventoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `charities`(`charityId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charity_address` ADD CONSTRAINT `charity_address_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `charities`(`charityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_donorId_fkey` FOREIGN KEY (`donorId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `charities`(`charityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `donations`(`donationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donation_items` ADD CONSTRAINT `donation_items_conditionId_fkey` FOREIGN KEY (`conditionId`) REFERENCES `conditions`(`conditionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `charities`(`charityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
