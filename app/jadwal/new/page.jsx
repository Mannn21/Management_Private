import JadwalForm from "@/components/JadwalForm";
import prisma from "@/lib/prisma"

export default async function TambahJadwalPage() {
    const siswaList = await prisma.siswa.findMany({
        select: { id: true, nama: true },
        orderBy: { nama: 'asc' }
    })

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Tambah Jadwal</h1>
                <p className="text-muted-foreground text-sm mt-1">Field bertanda * wajib diisi</p>
            </div>

            <JadwalForm siswaList={siswaList} />
        </main>
    )
}