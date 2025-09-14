-- CreateTable
CREATE TABLE "public"."Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personType" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "email" TEXT,
    "birthDate" TIMESTAMP(3),
    "landline" TEXT,
    "mobilePhone" TEXT,
    "addressStreet" TEXT,
    "addressNumber" TEXT,
    "addressComplement" TEXT,
    "addressNeighborhood" TEXT,
    "addressCity" TEXT,
    "addressUf" TEXT,
    "addressZipCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpfCnpj_key" ON "public"."Client"("cpfCnpj");

-- CreateIndex
CREATE INDEX "Document_clientId_idx" ON "public"."Document"("clientId");

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
