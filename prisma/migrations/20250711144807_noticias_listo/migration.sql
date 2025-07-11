/*
  Warnings:

  - You are about to drop the column `active` on the `Noticia` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Noticia` table. All the data in the column will be lost.
  - Added the required column `author` to the `Noticia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Noticia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `days` to the `Noticia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Noticia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redaction` to the `Noticia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Noticia" DROP COLUMN "active",
DROP COLUMN "text",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "days" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "redaction" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Noticia_id_seq";
