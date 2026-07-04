"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createSiswa, updateSiswa } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SiswaForm({ initialData = null }) {
    const router = useRouter()
    const isEdit = !!initialData

    const [form, setForm] = useState({
        nama: initialData?.nama || "",
        usia: initialData?.usia || "",
        jenisKelamin: initialData?.jenisKelamin || "",
        alamat: initialData?.alamat || "",
        jenjang: initialData?.jenjang || "",
        sekolah: initialData?.sekolah || "",
        namaOrtu: initialData?.namaOrtu || "",
        noHp: initialData?.noHp || ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const result = isEdit ?
            await updateSiswa(initialData.id, form)  :
            await createSiswa(form)

        if (!result.success) {
            setError(result.message)
            setLoading(false)
            return
        }


        router.push('/')
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {
                error && (
                    <div className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-md">{error}</div> 
                )
            }

            <div className="space-y-2">
                <Label htmlFor="nama">Nama Siswa *</Label>
                <Input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Contoh: Budi Sudrajat"
                    value={form.nama}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="usia">Usia Siswa *</Label>
                <Input
                    id="usia"
                    name="usia"
                    type="number"
                    placeholder="Contoh: 20"
                    value={form.usia}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                <Input
                    id="jenisKelamin"
                    name="jenisKelamin"
                    type="text"
                    placeholder="Contoh: Laki-laki"
                    value={form.jenisKelamin}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="alamat">Alamat Siswa *</Label>
                <Input
                    id="alamat"
                    name="alamat"
                    type="text"
                    placeholder="Contoh: Jl. Merdeka No. 123"
                    value={form.alamat}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="jenjang">Jenjang Pendidikan *</Label>
                <Input
                    id="jenjang"
                    name="jenjang"
                    type="text"
                    placeholder="Contoh: SMA"
                    value={form.jenjang}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="sekolah">Nama Sekolah *</Label>
                <Input
                    id="sekolah"
                    name="sekolah"
                    type="text"
                    placeholder="Contoh: SMA Negeri 1"
                    value={form.sekolah}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="namaOrtu">Nama Orang Tua *</Label>
                <Input
                    id="namaOrtu"
                    name="namaOrtu"
                    type="text"
                    placeholder="Contoh: John Doe"
                    value={form.namaOrtu}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="noHp">Nomor HP *</Label>
                <Input
                    id="noHp"
                    name="noHp"
                    type="text"
                    placeholder="Contoh: 081234567890"
                    value={form.noHp}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading} >
                    {loading ? 'Menyimpan...' : isEdit ? 'Perbarui' : 'Simpan'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => router.push('/')}>
                    Batal
                </Button>
            </div>
            
        </form>
    )
}