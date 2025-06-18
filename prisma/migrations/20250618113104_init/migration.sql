/*
  Warnings:

  - You are about to drop the `Flight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `FlightID` on the `Registration` table. All the data in the column will be lost.
  - Added the required column `Montant` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TripsID` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Flight";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Trips" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Destination" TEXT NOT NULL,
    "Places" INTEGER NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'AVAILABLE'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerID" INTEGER NOT NULL,
    "RegistrationID" INTEGER NOT NULL,
    "Montant" REAL NOT NULL,
    CONSTRAINT "Payment_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_RegistrationID_fkey" FOREIGN KEY ("RegistrationID") REFERENCES "Registration" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("CustomerID", "ID", "RegistrationID") SELECT "CustomerID", "ID", "RegistrationID" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_RegistrationID_key" ON "Payment"("RegistrationID");
CREATE TABLE "new_Registration" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TripsID" INTEGER NOT NULL,
    "CustomerID" INTEGER NOT NULL,
    CONSTRAINT "Registration_TripsID_fkey" FOREIGN KEY ("TripsID") REFERENCES "Trips" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registration_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Registration" ("CustomerID", "ID") SELECT "CustomerID", "ID" FROM "Registration";
DROP TABLE "Registration";
ALTER TABLE "new_Registration" RENAME TO "Registration";
CREATE UNIQUE INDEX "Registration_TripsID_key" ON "Registration"("TripsID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
