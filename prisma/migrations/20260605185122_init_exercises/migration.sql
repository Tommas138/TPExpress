-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "breathing" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "technique" TEXT NOT NULL,
    "targetIntensity" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
