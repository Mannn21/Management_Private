import prisma from '../../../lib/prisma'
import { successResponse, errorResponse } from '../../../utils/response'

// GET /api/siswa - ambil semua data siswa
export async function GET() {
    try {
        const siswa = await prisma.siswa.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return successResponse(siswa, 'Data siswa berhasil didapatkan')
    } catch (error) {
        return errorResponse('Gagal mendapatkan data siswa', 500)
    }
}

// POST /api/siswa - buat data siswa baru
export async function POST(request) {
    try {
        const body = await request.json()
        const { nama, usia, jenisKelamin, alamat, jenjang, sekolah, namaOrtu, noHp } = body

        if(!nama || !usia || !alamat || !jenisKelamin || !jenjang) {
            return errorResponse('Data tidak lengkap', 400)
        }

        const siswaBaru = await prisma.siswa.create({
            data: {nama, usia: parseInt(usia), jenisKelamin, alamat, jenjang, sekolah, namaOrtu, noHp}
        })
        return successResponse(siswaBaru, 'Berhasil membuat data siswa', 201)
        
    } catch (error) {
        return errorResponse('Gagal membuat data siswa', 500)
    }
}

