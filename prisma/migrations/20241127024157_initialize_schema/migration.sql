/*
  Warnings:

  - You are about to drop the column `matkul` on the `Prak` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Prak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `Prak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Prak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prak" DROP COLUMN "matkul",
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "img_url" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
