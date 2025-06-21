-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" TEXT NOT NULL,
    "CustomerID" INTEGER,
    CONSTRAINT "Document_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("CustomerID", "ID", "Type") SELECT "CustomerID", "ID", "Type" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
