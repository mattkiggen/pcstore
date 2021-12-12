/*
  Warnings:

  - You are about to drop the column `productId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the `_categorytoproduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categorytoproduct_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categorytoproduct_ibfk_2`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_productId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_categorytoproduct`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
