import SiswaForm from "@/components/SiswaForm"

export default function NewSiswaPage() {
    return (
        <main className="container mx-auto p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Tambah Siswa Baru</h1>
                <p className="text-sm mt-1 text-muted-foreground">Field bertanda * wajib diisi</p>
            </div>
            <SiswaForm />
        </main>
    )
}