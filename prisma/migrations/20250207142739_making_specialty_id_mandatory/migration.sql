/*
  Warnings:

  - Made the column `specialtyId` on table `appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_specialtyId_fkey";

-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "specialtyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
