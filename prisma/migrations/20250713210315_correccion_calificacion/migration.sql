/*
  Warnings:

  - Added the required column `author` to the `Calificacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calificacion" ADD COLUMN     "author" TEXT NOT NULL;
