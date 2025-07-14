/*
  Warnings:

  - You are about to drop the column `date_release` on the `Juego` table. All the data in the column will be lost.
  - Added the required column `release_date` to the `Juego` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Juego" DROP COLUMN "date_release",
ADD COLUMN     "release_date" TEXT NOT NULL;
