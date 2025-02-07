-- CreateTable
CREATE TABLE "Vms" (
    "id" TEXT NOT NULL,
    "vmId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "flag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vpn" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vpn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vmUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vmId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vmUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vms_vmId_key" ON "Vms"("vmId");

-- AddForeignKey
ALTER TABLE "Vms" ADD CONSTRAINT "Vms_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vpn" ADD CONSTRAINT "vpn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vpn" ADD CONSTRAINT "vpn_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vmUser" ADD CONSTRAINT "vmUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vmUser" ADD CONSTRAINT "vmUser_vmId_fkey" FOREIGN KEY ("vmId") REFERENCES "Vms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
