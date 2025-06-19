-- CreateTable
CREATE TABLE "Customer" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Fname" TEXT NOT NULL,
    "Lname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "Trips" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Destination" TEXT NOT NULL,
    "Places" INTEGER NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "Price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Registration" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TripsID" INTEGER NOT NULL,
    "CustomerID" INTEGER NOT NULL,
    CONSTRAINT "Registration_TripsID_fkey" FOREIGN KEY ("TripsID") REFERENCES "Trips" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registration_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerID" INTEGER NOT NULL,
    "RegistrationID" INTEGER NOT NULL,
    "Amount" REAL NOT NULL,
    CONSTRAINT "Payment_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_RegistrationID_fkey" FOREIGN KEY ("RegistrationID") REFERENCES "Registration" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" TEXT NOT NULL,
    "CustomerID" INTEGER NOT NULL,
    CONSTRAINT "Document_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DocumentToRegistration" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DocumentToRegistration_A_fkey" FOREIGN KEY ("A") REFERENCES "Document" ("ID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DocumentToRegistration_B_fkey" FOREIGN KEY ("B") REFERENCES "Registration" ("ID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_TripsID_key" ON "Registration"("TripsID");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_RegistrationID_key" ON "Payment"("RegistrationID");

-- CreateIndex
CREATE UNIQUE INDEX "_DocumentToRegistration_AB_unique" ON "_DocumentToRegistration"("A", "B");

-- CreateIndex
CREATE INDEX "_DocumentToRegistration_B_index" ON "_DocumentToRegistration"("B");
