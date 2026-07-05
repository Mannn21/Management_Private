-- CreateTable
CREATE TABLE "Jadwal" (
    "id" SERIAL NOT NULL,
    "siswaId" INTEGER NOT NULL,
    "hari" TEXT NOT NULL,
    "jamMulai" TEXT NOT NULL,
    "jamSelesai" TEXT NOT NULL,
    "mapel" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Terjadwal',
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
