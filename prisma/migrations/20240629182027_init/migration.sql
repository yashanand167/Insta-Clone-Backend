/*
  Warnings:

  - Added the required column `profile_pic` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_pic" TEXT NOT NULL;
