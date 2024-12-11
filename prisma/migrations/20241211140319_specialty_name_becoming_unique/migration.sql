/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `specialties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "specialties_name_key" ON "specialties"("name");
