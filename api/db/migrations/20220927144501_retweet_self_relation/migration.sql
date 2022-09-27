/*
  Warnings:

  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_tweetId_fkey";

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "retweetId" TEXT;

-- DropTable
DROP TABLE "Share";

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_retweetId_fkey" FOREIGN KEY ("retweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
