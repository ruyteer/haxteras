/*
  Warnings:

  - Added the required column `days` to the `Nenbot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nenbot" ADD COLUMN     "days" INTEGER NOT NULL;
