-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "repliesToId" TEXT;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_repliesToId_fkey" FOREIGN KEY ("repliesToId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
