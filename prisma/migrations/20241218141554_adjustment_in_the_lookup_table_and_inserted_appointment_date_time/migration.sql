/*
  Warnings:

  - You are about to drop the column `date` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `appointmentDateTime` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "date",
ADD COLUMN     "appointmentDateTime" TIMESTAMP(3) NOT NULL;
