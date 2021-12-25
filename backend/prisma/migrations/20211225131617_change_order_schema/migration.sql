/*
  Warnings:

  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `hasBeenPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL;
