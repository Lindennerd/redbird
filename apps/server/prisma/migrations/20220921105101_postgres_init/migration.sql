-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresIn" SET DEFAULT NOW() + interval '1 hour';
