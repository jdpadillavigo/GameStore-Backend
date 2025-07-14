/*
  Warnings:

  - You are about to drop the column `comment` on the `Calificacion` table. All the data in the column will be lost.
  - You are about to drop the column `ranking` on the `Calificacion` table. All the data in the column will be lost.
  - The primary key for the `Juego` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `Juego` table. All the data in the column will be lost.
  - You are about to drop the column `isOffer` on the `Juego` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Juego` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Juego` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Juego` table. All the data in the column will be lost.
  - The primary key for the `PlataformaJuego` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amountPaid` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Venta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[juegoId]` on the table `Venta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `Calificacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Calificacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Juego` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Juego` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailer` to the `Juego` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_price` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calificacion" DROP CONSTRAINT "Calificacion_juegoId_fkey";

-- DropForeignKey
ALTER TABLE "Juego" DROP CONSTRAINT "Juego_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "PlataformaJuego" DROP CONSTRAINT "PlataformaJuego_juegoId_fkey";

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_juegoId_fkey";

-- AlterTable
ALTER TABLE "Calificacion" DROP COLUMN "comment",
DROP COLUMN "ranking",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL,
ALTER COLUMN "juegoId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Juego" DROP CONSTRAINT "Juego_pkey",
DROP COLUMN "categoriaId",
DROP COLUMN "isOffer",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "status",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "trailer" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Juego_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Juego_id_seq";

-- AlterTable
ALTER TABLE "PlataformaJuego" DROP CONSTRAINT "PlataformaJuego_pkey",
ALTER COLUMN "juegoId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlataformaJuego_pkey" PRIMARY KEY ("juegoId", "plataformaId");

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "amountPaid",
DROP COLUMN "code",
DROP COLUMN "date",
ADD COLUMN     "base_price" INTEGER NOT NULL,
ADD COLUMN     "discount" INTEGER NOT NULL,
ALTER COLUMN "juegoId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "CategoriaJuego" (
    "juegoId" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "CategoriaJuego_pkey" PRIMARY KEY ("juegoId","categoriaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Venta_juegoId_key" ON "Venta"("juegoId");

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlataformaJuego" ADD CONSTRAINT "PlataformaJuego_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaJuego" ADD CONSTRAINT "CategoriaJuego_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaJuego" ADD CONSTRAINT "CategoriaJuego_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
