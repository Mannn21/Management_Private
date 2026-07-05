import prisma from "@/lib/prisma"
import { successResponse, errorResponse } from "@/utils/response"

// GET /api/jadwal - ambil semua jadwal
export async function GET() {
    try {
        const jadwal = await prisma.jadwal.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })
        return successResponse(jadwal, 'Data jadwal berhasil didapatkan')
    } catch (error) {
        return errorResponse('Gagal mengambil data jadwal', 500)
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { siswaId, hari, jamMulai, jamSelesai, mapel, status, catatan } = body
        
        if(!siswaId || !hari || !jamMulai || !jamSelesai ||!mapel ) {
            return errorResponse('Data tidak lengkap', 400)
        }

        const jadwalBaru = await prisma.jadwal.create({
            data: {
                siswaId: parseInt(siswaId),
                hari,
                jamMulai,
                jamSelesai,
                mapel,
                status: status || 'Terjadwal',
                catatan
            },  
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })

        return successResponse(jadwalBaru, 'Jadwal berhasil ditambahkan', 201)
    } catch (error) {
        return errorResponse('Gagal menambah jadwal', 500)
    }
}