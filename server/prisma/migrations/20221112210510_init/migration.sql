-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "durationMinutes" INTEGER NOT NULL
);
