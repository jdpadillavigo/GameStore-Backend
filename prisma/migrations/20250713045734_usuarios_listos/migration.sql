/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Calificacion` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Venta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calificacion" DROP CONSTRAINT "Calificacion_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Calificacion" DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "usuarioId";
