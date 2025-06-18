/*
  Warnings:

  - You are about to drop the column `Montant` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `Amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Trips` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerID" INTEGER NOT NULL,
    "RegistrationID" INTEGER NOT NULL,
    "Amount" REAL NOT NULL,
    CONSTRAINT "Payment_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_RegistrationID_fkey" FOREIGN KEY ("RegistrationID") REFERENCES "Registration" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("CustomerID", "ID", "RegistrationID") SELECT "CustomerID", "ID", "RegistrationID" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_RegistrationID_key" ON "Payment"("RegistrationID");
CREATE TABLE "new_Trips" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Destination" TEXT NOT NULL,
    "Places" INTEGER NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "Price" REAL NOT NULL
);
INSERT INTO "new_Trips" ("Destination", "ID", "Places", "Status") SELECT "Destination", "ID", "Places", "Status" FROM "Trips";
DROP TABLE "Trips";
ALTER TABLE "new_Trips" RENAME TO "Trips";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
