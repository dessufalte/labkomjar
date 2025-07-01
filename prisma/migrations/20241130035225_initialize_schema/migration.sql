/*
  Warnings:

  - Added the required column `tipe` to the `Dokumen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dokumen" ADD COLUMN     "tipe" TEXT NOT NULL;
