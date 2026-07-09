import prisma from "@/lib/prisma"
import CatatanForm from "@/components/CatatanForm"
import { notFound } from "next/navigation"

export default async function EditCatatanPage({ params }) {
    const { id, catatanId } = await params
    const catatan = await prisma.catatan.findUnique({
        where: { id: parseInt(catatanId) }
    })

    if (!catatan) {
        notFound()
    }

    return (
        <main className="container mx-auto p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Edit Data Siswa</h1>
                <p className="text-sm mt-1 text-muted-foreground">Field bertanda * wajib diisi</p>
            </div>
            <CatatanForm initialData={catatan} siswaId={parseInt(id)} />
        </main>
    )
}