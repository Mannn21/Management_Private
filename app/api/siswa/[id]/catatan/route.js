import prisma from "@/lib/prisma"
import { successResponse, errorResponse } from "@/utils/response"

export async function GET(req, {params}) {
    try {
        const { id } = await params

        const siswaExist = await prisma.siswa.findUnique({
            where: { id: parseInt(id) }
        })

        if(!siswaExist) return errorResponse("Data siswa tidak ditemukan", 404)

        const catatan = await prisma.catatan.findMany({
            where: { siswaId: parseInt(id) },
            orderBy: { createdAt: "desc" },
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })
        
        return successResponse(catatan, "Data catatan berhasil didapatkan")
    } catch (error) {
        return errorResponse("Gagal mengambil data catatan", 500)
    }
}

export async function POST(req, { params }) {
    try {
        const { id } = await params
        const body = await req.json()
        const { tanggal, materi, pemahaman, pr, catatan } = body

        if(!id || !tanggal || !materi) {
            return errorResponse("Data tidak lengkap", 400)
        }

        const siswaExist = await prisma.siswa.findUnique({
            where: { id: parseInt(id) }
        })



        if(!siswaExist) return errorResponse("Data siswa tidak ditemukan", 404)

        const catatanBaru = await prisma.catatan.create({
            data: {
                siswaId: parseInt(id),
                tanggal: new Date(tanggal),
                materi,
                pemahaman: pemahaman || "Cukup",
                pr,
                catatan
            },
            include: {
                siswa: {
                    select: { id: true, nama: true }
                }
            }
        })


        return successResponse(catatanBaru, "Catatan berhasil dibuat", 201)
    } catch (error) {
        return errorResponse("Gagal membuat catatan baru", 500)
    }
}