/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Consultant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consultant" DROP CONSTRAINT "Consultant_serviceId_fkey";

-- DropIndex
DROP INDEX "Consultant_serviceId_idx";

-- AlterTable
ALTER TABLE "Consultant" DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "_ConsultantToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ConsultantToService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ConsultantToService_B_index" ON "_ConsultantToService"("B");

-- CreateIndex
CREATE INDEX "Consultant_email_idx" ON "Consultant"("email");

-- AddForeignKey
ALTER TABLE "_ConsultantToService" ADD CONSTRAINT "_ConsultantToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Consultant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsultantToService" ADD CONSTRAINT "_ConsultantToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
