import Link from "next/link"
import { Button } from "@/components/ui/button"
import JadwalTable from "@/components/JadwalTable"
import prisma from "@/lib/prisma"

export default async function JadwalPage() {
    const jadwalList = await prisma.jadwal.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            siswa: {
                select: { id: true, nama: true }
            }
        }
    })


    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Jadwal Les Private</h1>
                    <p className="text-muted-foreground text-sm mt-1">{jadwalList.length} jadwal terdaftar</p>
                </div>
                <Link href="/jadwal/new">
                    <Button className="cursor-pointer">Tambah Jadwal</Button>
                </Link>
            </div>

            <JadwalTable jadwalList={jadwalList} />
        </main>
    )
}