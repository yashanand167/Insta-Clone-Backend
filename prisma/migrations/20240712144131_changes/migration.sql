/*
  Warnings:

  - You are about to drop the column `commentId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postid` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the `_liked` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `commentedById` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postid_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followId_fkey";

-- DropForeignKey
ALTER TABLE "_liked" DROP CONSTRAINT "_liked_A_fkey";

-- DropForeignKey
ALTER TABLE "_liked" DROP CONSTRAINT "_liked_B_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentId",
DROP COLUMN "postid",
ADD COLUMN     "commentedById" INTEGER NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "content",
DROP COLUMN "followId",
ADD COLUMN     "followingId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_liked";

-- CreateTable
CREATE TABLE "_Liked" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Liked_AB_unique" ON "_Liked"("A", "B");

-- CreateIndex
CREATE INDEX "_Liked_B_index" ON "_Liked"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentedById_fkey" FOREIGN KEY ("commentedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Liked" ADD CONSTRAINT "_Liked_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Liked" ADD CONSTRAINT "_Liked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
