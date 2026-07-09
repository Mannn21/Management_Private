import prisma from "@/lib/prisma"
import { successResponse, errorResponse } from "@/utils/response"

export async function GET(req, {params}) {
    try {
        const { id, catatanId } = await params

        const siswaExist = await prisma.siswa.findUnique({
            where: { id: parseInt(id) }
        })

        if(!siswaExist) return errorResponse("Data siswa tidak ditemukan", 404)
        
        const catatan = await prisma.catatan.findUnique({
            where: { siswaId: parseInt(id), id: parseInt(catatanId) },
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })

        if(!catatan) return errorResponse("Catatan tidak ditemukan", 404)
        
        return successResponse(catatan, "Catatan berhasil ditemukan")
    } catch (error) {
        return errorResponse("Data catatan gagal ditemukan", 500)
    }
}

export async function PUT(req, { params }) {
    try{
        const { id, catatanId } = await params
        const body = await req.json()

        const { tanggal, materi, pemahaman, pr, catatan } = body
        
        if(!id || !tanggal || !materi)  return errorResponse("Data tidak lengkap", 400)
        
        const siswaExist = await prisma.siswa.findUnique({
            where: { id: parseInt(id) }
        })

        if(!siswaExist) return errorResponse("Data siswa tidak ditemukan", 404)

        const catatanExist = await prisma.catatan.findUnique({
            where: { id: parseInt(catatanId) }
        })

        if(!catatanExist) return errorResponse("Catatan tidak ditemukan", 404)

        const catatanUpdate = await prisma.catatan.update({
            where: { id: parseInt(catatanId) },
            data: {
                siswaId: parseInt(id),
                tanggal,
                materi,
                pemahaman,
                pr,
                catatan
            },
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })

        return successResponse(catatanUpdate, "Catatan berhasil diubah")
    } catch (error) {
        return errorResponse("Catatan gagal diubah", 500)
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id, catatanId } = await params;

        const siswaExist = await prisma.siswa.findUnique({
            where: { id: parseInt(id) }
        })

        if(!siswaExist) return errorResponse("Data siswa tidak ditemukan", 404)

        const catatanExist = await prisma.catatan.findUnique({
            where: { id: parseInt(catatanId) }
        })

        if(!catatanExist) return errorResponse("Data catatan tidak ditemukan", 404)

        await prisma.catatan.delete({
            where: { id: parseInt(catatanId) }
        })

        return successResponse(null, "Catatan berhasil dihapus")
    } catch (error) {
        return errorResponse("Catatan gagal dihapus", 500)
    }
}