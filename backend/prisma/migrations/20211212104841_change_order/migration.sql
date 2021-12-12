/*
  Warnings:

  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `status` VARCHAR(255) NOT NULL,
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL;
