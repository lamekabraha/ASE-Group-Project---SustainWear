-- DropForeignKey
ALTER TABLE `distributions` DROP FOREIGN KEY `distributions_charityId_fkey`;

-- DropForeignKey
ALTER TABLE `distributions` DROP FOREIGN KEY `distributions_staffId_fkey`;

-- AlterTable
ALTER TABLE `distributions` MODIFY `charityId` INTEGER NULL,
    MODIFY `staffId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `distributions` ADD CONSTRAINT `distributions_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `charities`(`charityId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distributions` ADD CONSTRAINT `distributions_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
