import prisma from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import JadwalTabble from "@/components/JadwalTable"
import CatatanTable from "@/components/CatatanTable"
import ButtonAksi from "@/components/ButtonAksi"

export default async function DetailSiswa({ params }) {
    const {id}  = await params

    const [siswaData, siswaSchedule, siswaNotes] = await Promise.all([
    prisma.siswa.findUnique({
        where: { id: parseInt(id) }
    }),
    prisma.jadwal.findMany({
        where: { siswaId: parseInt(id) },
        orderBy: { jamMulai: "asc" },
    }),
    prisma.catatan.findMany({
        where: { siswaId: parseInt(id) },
        orderBy: { tanggal: "asc" },
    })
    ])

    if (!siswaData) notFound()
    

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-6 flex flex-row justify-between px-4">
                <div>
                    <h1 className="text-3xl font-bold">Detail Siswa</h1>
                    {/* <p className="text-muted-foreground text-sm mt-1">{siswaData.nama}</p> */}
                </div>
                <div>
                    <ButtonAksi url="/siswa" className="cursor-pointer" label="Kembali" />
                </div>
            </div>

            <div className="md:col-span-1 px-4 py-8">
                <Card className="w-full md:w-2/3">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{siswaData.nama}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {siswaData.jenjang} • {siswaData.sekolah}
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-base font-medium">Umur</span>
                            <span>{siswaData.usia}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-base font-medium">Gender</span>
                            <span>{siswaData.jenisKelamin}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-base font-medium">Alamat</span>
                            <span>{siswaData.alamat}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-base font-medium">Orang Tua</span>
                            <span>{siswaData.namaOrtu}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-base font-medium">No HP</span>
                            <span>{siswaData.noHp}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-base font-medium">Bergabung</span>
                            <span>
                                {new Date(siswaData.createdAt).toLocaleDateString("id-ID")}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-2 space-y-6 px-4 py-2">

            {/* Jadwal */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">Jadwal Les Siswa</h3>
                        <ButtonAksi url={`/jadwal/new`} className="cursor-pointer" label="+ Jadwal Siswa" />
                    </div>

                    {siswaSchedule.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Tidak ada jadwal les
                        </p>
                    ) : (
                        <JadwalTabble
                            jadwalList={siswaSchedule}
                            hiddenColumns={["siswa"]}
                        />
                    )}
                </div>

                {/* Catatan */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">Catatan Pemahaman</h3>
                        <ButtonAksi
                            url={`/siswa/${siswaData.id}/catatan/new`}
                            label="+ Catatan Siswa"
                            className="cursor-pointer"
                        />
                    </div>

                    {siswaNotes.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Tidak ada catatan siswa
                        </p>
                    ) : (
                        <CatatanTable catatanList={siswaNotes} />
                    )}
                </div>

            </div>
        </main>
    )
    
}