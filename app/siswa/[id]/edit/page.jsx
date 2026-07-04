import SiswaForm from "@/components/SiswaForm"
import { getSiswaById } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function EditSiswaPage({ params }) {
    const { id } = await params
    const result = await getSiswaById(id)

    if (!result.success) {
        notFound()
    }

    return (
        <main className="container mx-auto p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Edit Data Siswa</h1>
                <p className="text-sm mt-1 text-muted-foreground">Field bertanda * wajib diisi</p>
            </div>
            <SiswaForm initialData={result.data} />
        </main>
    )
}