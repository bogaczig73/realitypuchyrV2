/*
  Warnings:

  - You are about to drop the column `rating` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "rating",
DROP COLUMN "reviewCount",
ADD COLUMN     "files" JSONB DEFAULT '[]',
ADD COLUMN     "layout" TEXT;
