"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteJadwal } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead,TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const statusVariant = status => {
    if(status === 'Selesai') return 'default'
    if(status === "Batal") return "destructive"
    return "secondary"
}

export default function JadwalTabble({ jadwalList }) {
    const router = useRouter()
    const [loadingId, setLoadingId] = useState(null)

    const handleDelete = async (id) => {
        const confirm = window.confirm("Yakin ingin menghapus jadwal ini?")
        if(!confirm) return

        setLoadingId(id)
        const result = await deleteJadwal(id)

        if(!result.success) {
            alert(result.message)
            setLoadingId(null)
            return
        }

        router.refresh()
        setLoadingId(null)
    }

    if(jadwalList.length === 0) {
        return (
            <div className='text-center py-12 text-muted-foreground'>
                Belum ada jadwal. Silahkan tambah jadwal baru.
            </div>
        )
    }

    return (
        <>
            {/* Desktop */}
            <div className='hidden md:block'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Siswa</TableHead>
                            <TableHead>Hari</TableHead>
                            <TableHead>Jam</TableHead>
                            <TableHead>Mapel</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Catatan</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jadwalList.map(jadwal => (
                            <TableRow key={jadwal.id}>
                                <TableCell className="font-medium">{jadwal.siswa.nama}</TableCell>
                                <TableCell>{jadwal.hari}</TableCell>
                                <TableCell>{jadwal.jamMulai} - {jadwal.jamSelesai}</TableCell>
                                <TableCell>{jadwal.mapel}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant(jadwal.status)}>{jadwal.status}</Badge>
                                </TableCell>
                                <TableCell>{jadwal.catatan || "-"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => router.push(`/jadwal/${jadwal.id}/edit`) } >Edit</Button>

                                    <Button variant="destructive" size="sm" disabled={loadingId === jadwal.id} onClick={() => handleDelete(jadwal.id)}>{loadingId === jadwal.id ? "Menghapus..." : "Hapus"}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile */}
            <div className='grid gap-4 md:hidden'>
                {jadwalList.map(jadwal => (
                    <Card key={jadwal.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">{jadwal.siswa.nama}</CardTitle>
                            <Badge variant={statusVariant(jadwal.status)} className="w-fit">{jadwal.status}</Badge>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm text-muted-foreground">
                            <p>Hari: {jadwal.hari}</p>
                            <p>Jam: {jadwal.jamMulai} - {jadwal.jamSelesai}</p>
                            <p>Mapel: {jadwal.mapel}</p>
                            <p>Catatan: {jadwal.catatan || "-"}</p>
                            <div className='flex gap-2 pt-2'>
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/jadwal/${jadwal.id}/edit`)}>Edit</Button>
                                <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(jadwal.id)}>{loadingId === jadwal.id ? "Menghapus..." : "Hapus"}</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}