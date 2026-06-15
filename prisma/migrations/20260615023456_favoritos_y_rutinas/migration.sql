-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT 'anonymous',
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routines" (
    "id" SERIAL NOT NULL,
    "routineName" TEXT NOT NULL,
    "selectedDays" INTEGER NOT NULL,
    "cantRoutines" INTEGER NOT NULL,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favorites_userId_idx" ON "favorites"("userId");

-- CreateIndex
CREATE INDEX "favorites_exerciseId_idx" ON "favorites"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_exerciseId_key" ON "favorites"("userId", "exerciseId");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
