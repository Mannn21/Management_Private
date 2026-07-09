-- CreateTable
CREATE TABLE "Catatan" (
    "id" SERIAL NOT NULL,
    "siswaId" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "materi" TEXT NOT NULL,
    "pemahaman" TEXT NOT NULL DEFAULT 'Cukup',
    "pr" TEXT,
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Catatan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Catatan" ADD CONSTRAINT "Catatan_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
