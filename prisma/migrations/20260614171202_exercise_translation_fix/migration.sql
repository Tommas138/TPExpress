/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciseTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseTranslation" DROP CONSTRAINT "ExerciseTranslation_exerciseId_fkey";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "ExerciseTranslation";

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "difficulty" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "targetIntensity" TEXT NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exerciseTranslation" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "breathing" TEXT NOT NULL,
    "technique" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "exerciseTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exerciseTranslation" ADD CONSTRAINT "exerciseTranslation_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
