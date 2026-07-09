import CatatanForm from "@/components/CatatanForm"

export default async function newCatatan({ params }) {
    const { id } = await params;
    
    return (
            <main className="container mx-auto p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Tambah Catatan Baru</h1>
                    <p className="text-sm mt-1 text-muted-foreground">Field bertanda * wajib diisi</p>
                </div>
                <CatatanForm siswaId={parseInt(id)} />
            </main>
        )
}