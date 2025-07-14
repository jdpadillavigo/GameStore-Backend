/*
  Warnings:

  - Added the required column `date_release` to the `Juego` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Juego" ADD COLUMN     "date_release" TEXT NOT NULL;
