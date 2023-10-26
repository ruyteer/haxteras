-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nickname" TEXT;

-- CreateTable
CREATE TABLE "Nenbot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "screen" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Nenbot_pkey" PRIMARY KEY ("id")
);
