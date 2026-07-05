import JadwalForm from "@/components/JadwalForm";
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation";

export default async function EditJadwalPage({ params }) {
    const { id } = await params

    const [jadwal, siswaList] = await Promise.all([
        prisma.jadwal.findUnique({where: {id: parseInt(id)}}),
        prisma.siswa.findMany({
            select: { id: true, nama: true },
            orderBy: { nama: "asc" }
        })
    ]) 

    if(!jadwal) notFound()

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Edit Jadwal</h1>
                <p className="text-muted-foreground text-sm mt-1">Field bertanda * wajib diisi</p>
            </div>

            <JadwalForm initialData={jadwal} siswaList={siswaList} />
        </main>
    )
}