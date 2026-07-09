import prisma from "@/lib/prisma"
import SiswaForm from "@/components/SiswaForm"
import { notFound } from "next/navigation"

export default async function EditSiswaPage({ params }) {
    const { id } = await params
    const siswa = await prisma.siswa.findUnique({
        where: { id: parseInt(id) }
    })

    if (!siswa) {
        notFound()
    }

    return (
        <main className="container mx-auto p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Edit Data Siswa</h1>
                <p className="text-sm mt-1 text-muted-foreground">Field bertanda * wajib diisi</p>
            </div>
            <SiswaForm initialData={siswa} />
        </main>
    )
}