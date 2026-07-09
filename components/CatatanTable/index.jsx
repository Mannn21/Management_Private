"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteCatatanSiswa } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pemahamanVariant = pemahaman => {
    if(pemahaman === "Baik") return 'default'
    if(pemahaman === "Kurang") return 'destructive'
    return 'secondary'
}

const columns = [
    {
        key: "tanggal",
        label: "Tanggal",
        render: (item) => new Date(item.tanggal).toLocaleDateString('id-ID')
    },
    {
        key: "materi",
        label: "Materi"
    },
    {
        key: "pemahaman",
        label: "Pemahaman",
        render: (item) => (
          <Badge variant={pemahamanVariant(item.pemahaman)}>
            {item.pemahaman}
          </Badge>
        ),
    },
    {
        key: "pr",
        label: "PR",
        render: (item) => item.pr || "-",
    },
    {
        key: "catatan",
        label: "Catatan",
        render: (item) => item.catatan || "-",
    },
]

export default function CatatanTable({ catatanList }) {
    const router = useRouter()
    const [loadingId, setLoadingId] = useState(null)

    const handleDelete = async (id, catatanId) => {
        const confirm = window.confirm("Yakin ingin menghapus catatan ini?")
        if(!confirm) return

        setLoadingId(id)
        const result = await deleteCatatanSiswa(id, catatanId)

        if(!result.success) {
            alert(result.message)
            setLoadingId(null)
            return
        }

        router.refresh()
        setLoadingId(null)
    }

    if(catatanList.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Belum ada catatan. Silahkan buat catatan dahulu.
            </div>
        )
    }

    return (
        <>
            {/* Desktop */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {
                                    columns.map(col => (
                                        <TableHead key={col.key}>{col.label}</TableHead>
                                    ))
                                }
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                catatanList.map(catatan => (
                                    <TableRow key={catatan.id}>
                                        {
                                            columns.map(col => (
                                                <TableCell key={col.key}>
                                                    <p className="font-medium text-black">
                                                        {
                                                            col.render ? col.render(catatan) : catatan[col.key]
                                                        }
                                                    </p>
                                                </TableCell>
                                            ))
                                        }
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" className="cursor-pointer" size="sm" onClick={() => router.push(`/siswa/${catatan.siswaId}/catatan/${catatan.id}/edit`)}>Edit</Button>

                                            <Button variant="destructive" className="cursor-pointer" size="sm" disabled={loadingId === catatan.id} onClick={() => handleDelete(catatan.siswaId, catatan.id)}>{loadingId === catatan.id ? "Menghapus..." : "Hapus"}</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            
            {/* Mobile */}
            <div className="grid gap-4 md:hidden">
                {
                    catatanList.map(catatan => (
                        <Card key={catatan.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{catatan.materi}</CardTitle>
                                <Badge variant={pemahamanVariant(catatan.pemahaman)} className="w-fit">{catatan.pemahaman}</Badge>
                            </CardHeader>
                            <CardContent className="space-y-1 text-sm text-muted-foreground">
                            {
                                columns.map(col => {
                                    if(col.key === "pemahaman") return null;

                                    return (
                                        <div key={col.key}>
                                            <p className="font-medium text-black">
                                                {col.label}:{" "}
                                                {col.render ? col.render(catatan) : catatan[col.key]}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/siswa/${catatan.siswaId}/catatan/${catatan.id}/edit`)}>Edit</Button>
                                <Button variant="destructive" size="sm" className="flex-1" disabled={loadingId === catatan.id} onClick={() => handleDelete(catatan.siswaId, catatan.id)}>{loadingId === catatan.id ? "Menghapus..." : "Hapus"}</Button>
                            </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}