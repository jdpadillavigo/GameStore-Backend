/*
  Warnings:

  - You are about to drop the column `pasword` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Venta` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Plataforma` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `base_price` to the `Juego` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Juego` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `token` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_juegoId_fkey";

-- AlterTable
ALTER TABLE "Juego" ADD COLUMN     "base_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "pasword",
DROP COLUMN "status",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
DROP COLUMN "token",
ADD COLUMN     "token" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Venta";

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_name_key" ON "Categoria"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plataforma_name_key" ON "Plataforma"("name");
