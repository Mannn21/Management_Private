import prisma from "@/lib/prisma"
import { successResponse, errorResponse } from "@/utils/response"

// GET /api/siswa/:id - ambil data siswa berdasarkan id
export async function GET(request, { params }) {
    try {
        const { id } = await params
        const siswa = await prisma.siswa.findUnique({
            where: { id: parseInt(id) } 
        })
        if (!siswa) {
            return errorResponse('Data siswa tidak ditemukan', 404)
        }
        return successResponse(siswa, 'Data siswa berhasil didapatkan')
    } catch (error) {
        return errorResponse('Kesalahan pada server', 500)
    }
}

// PUT /api/siswa/:id - update data siswa berdasarkan id
export async function PUT(request, { params }) {
    try {
        const { id } = await params
        const body = await request.json()
        const { nama, usia, alamat, jenjang, sekolah, namaOrtu, noHp } = body

        if(!nama || !usia || !alamat || !jenjang || !sekolah || !namaOrtu || !noHp) {
            return errorResponse('Data tidak lengkap', 400)
        }
        const siswaExist = await prisma.siswa.findUnique({
            where: { id: parseInt(id) }
        })
        if(!siswaExist) {
            return errorResponse('Data siswa tidak ditemukan', 404)
        }

        const siswaUpdate = await prisma.siswa.update({
            where: { id: parseInt(id) },
            data: { nama, usia: parseInt(usia), jenjang, alamat, sekolah, namaOrtu, noHp }
        })
        if(!siswaUpdate) {
            return errorResponse('Gagal mengupdate data siswa', 500)
        }

        return successResponse(siswaUpdate, 'Data siswa berhasil diupdate')
    } catch (error) {
        return errorResponse('Kesalahan pada server', 500)
    }
}

// DELETE /api/siswa/:id - hapus data siswa berdasarkan id
export async function DELETE(request, { params }) {
    try {
        const { id } = await params
        const siswaExist = await prisma.siswa.findUnique({
            where: { id: parseInt(id) }
        })
        if(!siswaExist) {
            return errorResponse('Data siswa tidak ditemukan', 404)
        }
        const siswaDelete = await prisma.siswa.delete({
            where: { id: parseInt(id) }
        })
        if(!siswaDelete) {
            return errorResponse('Gagal menghapus data siswa', 500)
        }
        return successResponse(null, 'Data siswa berhasil dihapus')
    } catch (error) {
        return errorResponse('Kesalahan pada server', 500)
    }
}