/*
  Warnings:

  - You are about to drop the column `followersId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Followers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Following` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_followersId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_followingId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "followersId",
ADD COLUMN     "followerId" TEXT;

-- DropTable
DROP TABLE "Followers";

-- DropTable
DROP TABLE "Following";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
