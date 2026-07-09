"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createJadwal, updateJadwal } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const HARI_OPTIONS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
const STATUS_OPTION = ["Terjadwal", "Selesai", "Batal"]

export default function JadwalForm({ initialData = null, siswaList = [] }) {
    const router = useRouter()
    const isEdit = !!initialData

    const [form, setForm] = useState({
        siswaId: initialData?.siswaId || "",
        hari: initialData?.hari || "",
        jamMulai: initialData?.jamMulai || "",
        jamSelesai: initialData?.jamSelesai || "",
        mapel: initialData?.mapel || "",
        status: initialData?.status || "",
        catatan: initialData?.catatan || "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const result = isEdit ? await updateJadwal(initialData.id, form) : await createJadwal(form)

        if(!result.success) {
            setError(result.message)
            setLoading(false)
            return
        }

        router.refresh()
        router.push("/jadwal")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {
                error && (
                    <div className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-md">{error}</div>
                )
            }

            <div className="space-y-1">
                <Label htmlFor="siswaId">Siswa *</Label>
                <select name="siswaId" id="siswaId" value={form.siswaId} onChange={handleChange} required className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                    <option value="">Pilih siswa...</option>
                    {
                        siswaList.map(siswa => (
                            <option key={siswa.id} value={siswa.id}>{siswa.nama}</option>
                        ))
                    }
                </select>
            </div>

            <div className="space-y-1">
                <Label htmlFor="hari">Hari *</Label>
                <select name="hari" id="hari" value={form.hari} onChange={handleChange} required className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                    <option value="">Pilih hari...</option>
                    {
                        HARI_OPTIONS.map(hari => (
                            <option key={hari} value={hari}>{hari}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex gap-4">
                <div className="space-y-1 flex-1">
                    <Label htmlFor="jamMulai">Jam mulai *</Label>
                    <Input id="jamMulai" name="jamMulai" type="time" value={form.jamMulai} onChange={handleChange} required />
                </div>
                <div className="space-y-1 flex-1">
                    <Label htmlFor="jamSelesai">Jam selesai *</Label>
                    <Input id="jamSelesai" name="jamSelesai" type="time" value={form.jamSelesai} onChange={handleChange} required />
                </div>
            </div>

            <div className="space-y-1">
                <Label htmlFor="mapel">Mata pelajaran *</Label>
                <Input id="mapel" name="mapel" type="text" placeholder="Contoh: Matematika" value={form.mapel} onChange={handleChange} required />
            </div>

            <div className="space-y-1">
                <Label htmlFor="status">Status *</Label>
                <select name="status" id="status" value={form.status} onChange={handleChange} required className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                    {
                        STATUS_OPTION.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))
                    }
                </select>
            </div>

            <div className="space-y-1">
                <Label htmlFor="catatan">Catatan</Label>
                <Input id="catatan" name="catatan" type="text" placeholder="Contoh: Pengenalan Aljabar" value={form.catatan} onChange={handleChange} />
            </div>
            
            <div className="flex gap-2 pt-2">
                <Button type="submit" className="cursor-pointer" disabled={loading}>{loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Jadwal"}</Button>
                <Button type="button" className="cursor-pointer" variant="outline" onClick={() => router.push("/jadwal")}>Batal</Button>
            </div>
            
        </form>
    )
}