-- CreateTable
CREATE TABLE "Story" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "storyTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buttonLabel" TEXT,
    "buttonLink" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'Active',
    "image" TEXT,
    "video" TEXT,
    "product" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
