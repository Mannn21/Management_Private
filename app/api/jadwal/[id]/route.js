import prisma from "@/lib/prisma"
import { successResponse, errorResponse } from "@/utils/response"

// GET /api/jadwal/:id
export async function GET(req, {params}) {
    try {
        const {id} = await params
        const jadwal = await prisma.jadwal.findUnique({
            where: { id: parseInt(id) },
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })

        if(!jadwal) return errorResponse('Jadwal tidak ditemukan', 404)
        
        return successResponse(jadwal, 'Data jadwal berhasil ditemukan')
    } catch (error) {
        return errorResponse('Gagal mendapatkan data jadwal', 500)
    }
}

// PUT /api/jadwal/:id
export async function PUT(req, { params }) {
    try {
        const { id } = await params
        const body = await req.json()
        const { siswaId, hari, jamMulai, jamSelesai, mapel, status, catatan } = body
        
        if(!siswaId || !hari || !jamMulai || !jamSelesai || !mapel) return errorResponse('Data tidak lengkap', 400)
        
        const jadwalExist = await prisma.jadwal.findUnique({
            where: { id: parseInt(id) }
        })

        const jadwalUpdated = await prisma.jadwal.update({
            where: { id: parseInt(id) },
            data: {
                siswaId: parseInt(siswaId),
                hari,
                jamMulai,
                jamSelesai,
                mapel,
                status,
                catatan
            }, 
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })

        return successResponse(jadwalUpdated, 'Jadwal berhasil diperbarui')
    } catch (error) {
        return errorResponse('Gagal memperbarui jadwal', 500)
    }
}

// DELETE /api/jadwal/:id
export async function DELETE(req, { params }) {
    try {
        const { id } = await params

        const jadwalExist = await prisma.jadwal.findUnique({
            where: {id: parseInt(id)}
        })

        if(!jadwalExist) return errorResponse('Jadwal tidak ditemukan', 404)

        await prisma.jadwal.delete({
            where: {
                id: parseInt(id)
            }
        })

        return successResponse(null, 'Jadwal berhasil dihapus')
    } catch (error) {
        return errorResponse('Gagal menghapus jadwal', 500)
    }
}