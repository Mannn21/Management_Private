"use client"

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import { deleteSiswa } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SiswaTable = ({ siswaList }) => {
    const router = useRouter()
    const [loadingId, setLoadingId] = useState(null)

    const handleDelete = async(id) => {
        const confirm = window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')
        if(!confirm) return

        try {
            setLoadingId(id)
            const result = await deleteSiswa(id)

            if(!result.success) {
                alert(result.message || 'Gagal menghapus data siswa')
                setLoadingId(null)
                return
            }

            router.refresh()
            setLoadingId(null)
        } catch (error)  {
            alert('Terjadi kesalahan pada server')
        }
    }

    if(!siswaList || siswaList.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-muted-foreground">Tidak ada data siswa yang tersedia.</p>
            </div>
        )
    }

    return (
        <>
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Usia</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Jenjang</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {siswaList.map((siswa, index) => (
                            <TableRow key={siswa.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{siswa.nama}</TableCell>
                                <TableCell>{siswa.usia}</TableCell>
                                <TableCell>{siswa.jenisKelamin}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{siswa.jenjang}</Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => router.push(`/siswa/${siswa.id}/edit`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(siswa.id)}
                                        disabled={loadingId === siswa.id}
                                    >
                                        {loadingId === siswa.id ? 'Menghapus...' : 'Hapus'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Tampilan mobile - card */}
            <div className="grid gap-4 md:hidden">
                    {
                        siswaList.map((siswa, index) => (
                            <Card key={siswa.id}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">{siswa.nama}</CardTitle>
                                    <Badge variant="secondary" className="w-fit">{siswa.jenjang}</Badge>
                                </CardHeader>
                                <CardContent className="space-y-1 text-sm text-muted-foreground">
                                    <p>Usia: {siswa.usia || 'N/A'}</p>
                                    <p>Jenis Kelamin: {siswa.jenisKelamin}</p>
                                    <p>Sekolah: {siswa.sekolah || 'N/A'}</p>
                                    <p>Jenjang: {siswa.jenjang || 'N/A'}</p>
                                    <div className="flex gap-2 pt-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => router.push(`/siswa/${siswa.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleDelete(siswa.id)}
                                            disabled={loadingId === siswa.id}
                                        >
                                            {loadingId === siswa.id ? 'Menghapus...' : 'Hapus'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
            </div>
        </>
    )
}

export default SiswaTable