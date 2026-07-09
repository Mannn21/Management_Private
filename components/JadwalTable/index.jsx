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

const columns = [
  {
    key: "siswa",
    label: "Siswa",
    render: (item) => item.siswa?.nama,
  },
  {
    key: "hari",
    label: "Hari",
  },
  {
    key: "jam",
    label: "Jam",
    render: (item) => `${item.jamMulai} - ${item.jamSelesai}`,
  },
  {
    key: "mapel",
    label: "Mapel",
  },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <Badge variant={statusVariant(item.status)}>
        {item.status}
      </Badge>
    ),
  },
  {
    key: "catatan",
    label: "Catatan",
    render: (item) => item.catatan || "-",
  },
];

export default function JadwalTabble({ jadwalList, hiddenColumns = [] }) {
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

    const visibleColumns = columns.filter(
        col => !hiddenColumns.includes(col.key)
    )

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
                            {
                                visibleColumns.map(col => (
                                    <TableHead  key={col.key}>{col.label}</TableHead>
                                ))
                            }
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jadwalList.map(jadwal => (
                            <TableRow key={jadwal.id}>
                                {
                                    visibleColumns.map(col => (
                                        <TableCell key={col.key}>
                                            <p className="font-medium text-black">
                                                {col.render ? col.render(jadwal) : jadwal[col.key]}
                                            </p>
                                        </TableCell>
                                    ))
                                }
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" className="cursor-pointer" size="sm" onClick={() => router.push(`/jadwal/${jadwal.id}/edit`) } >Edit</Button>

                                    <Button variant="destructive" className="cursor-pointer" size="sm" disabled={loadingId === jadwal.id} onClick={() => handleDelete(jadwal.id)}>{loadingId === jadwal.id ? "Menghapus..." : "Hapus"}</Button>
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
                            {
                                !hiddenColumns.includes("siswa") && (
                                    <CardTitle className="text-base">{jadwal.siswa?.nama}</CardTitle>
                                )
                            }
                            <Badge variant={statusVariant(jadwal.status)} className="w-fit text-sm">{jadwal.status}</Badge>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm text-muted-foreground">
                            {
                                visibleColumns.map(col => {
                                    if(col.key === "siswa" || col.key === "status") return null;

                                    return (
                                        <div key={col.key}>
                                            <p className="font-medium text-black">
                                                {col.label}:{" "}
                                                {col.render ? col.render(jadwal) : jadwal[col.key]}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                            <div className='flex gap-2 pt-2'>
                                <Button variant="outline" size="sm" className="flex-1 cursor-pointer" onClick={() => router.push(`/jadwal/${jadwal.id}/edit`)}>Edit</Button>
                                <Button variant="destructive" size="sm" className="flex-1 cursor-pointer" onClick={() => handleDelete(jadwal.id)}>{loadingId === jadwal.id ? "Menghapus..." : "Hapus"}</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}