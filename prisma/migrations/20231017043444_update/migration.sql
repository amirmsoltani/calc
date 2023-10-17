/*
  Warnings:

  - Added the required column `title` to the `oprators` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_oprators" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstValue" INTEGER,
    "secondValue" INTEGER
);
INSERT INTO "new_oprators" ("firstValue", "id", "secondValue", "userKey") SELECT "firstValue", "id", "secondValue", "userKey" FROM "oprators";
DROP TABLE "oprators";
ALTER TABLE "new_oprators" RENAME TO "oprators";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
