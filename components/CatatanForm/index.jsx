"use client"

import { useState } from "react"
import { useRouter }  from "next/navigation"
import { createCatatanSiswa, updateCatatanSiswa } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const PEMAHAMAN_OPTIONS = ["Baik", "Cukup", "Kurang"] 

export default function CatatanForm({ initialData = null, siswaId }) {
    const router = useRouter()
    const isEdit = !!initialData

    const [form, setForm] = useState({
        tanggal: initialData?.tanggal ? new Date(initialData.tanggal).toISOString().split('T')[0] : "", // format jadi "2026-07-09": "",
        materi: initialData?.materi || "",
        pemahaman: initialData?.pemahaman || "Cukup",
        pr: initialData?.pr || "",
        catatan: initialData?.catatan || "",
    })


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const result = isEdit ? await updateCatatanSiswa(siswaId, initialData.id, form) : await createCatatanSiswa(siswaId, form)

        if(!result.success) {
            setError(result.message)
            setLoading(false)
            return
        }

        router.refresh()
        router.push(`/siswa/${siswaId}`)
    }

    return (
        <form className="space-y-4 max-w-mmd" onSubmit={handleSubmit}>
            {
                error && (
                    <div className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-md">{error}</div>
                )
            }
            <div className="space-y-1">
                <Label htmlFor="tanggal">Tanggal *</Label>
                <Input
                    id="tanggal"
                    name="tanggal"
                    type="date"
                    required
                    value={form.tanggal}
                    onChange={handleChange}
                    className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="materi">Materi *</Label>
                <Input
                    id="materi"
                    name="materi"
                    type="text"
                    required
                    value={form.materi}
                    onChange={handleChange}
                    placeholder="Contoh: Fisika Hukum Newton 3"
                    className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="pemahaman">Pemahaman *</Label>
                <select
                    id="pemahaman"
                    name="pemahaman"
                    required
                    value={form.pemahaman}
                    onChange={handleChange}
                    className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >{
                    PEMAHAMAN_OPTIONS.map(pemahaman => (
                        <option key={pemahaman} value={pemahaman}>{pemahaman}</option>
                    ))
                }</select>
            </div>
            <div className="space-y-1">
                <Label htmlFor="pr">PR *</Label>
                <Input
                    id="pr"
                    name="pr"
                    type="text"
                    value={form.pr}
                    onChange={handleChange}
                    className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="catatan">Catatan *</Label>
                <Input
                    id="catatan"
                    name="catatan"
                    type="text"
                    value={form.catatan}
                    onChange={handleChange}
                    className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
            </div>
            <div className="flex gap-2 pt-2">
                <Button type="submit" className="cursor-pointer" disabled={loading}>
                    {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Catatan"}
                </Button>
                <Button type="button" className="cursor-pointer" variant="outline" onClick={() => router.push(`/siswa/${siswaId}`)}>
                    Batal
                </Button>
            </div>
        </form>
    )
}