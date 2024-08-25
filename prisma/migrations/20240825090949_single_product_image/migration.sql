/*
  Warnings:

  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN "productImage" TEXT DEFAULT '기본 상품 이미지 url';

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductImage";
PRAGMA foreign_keys=on;
