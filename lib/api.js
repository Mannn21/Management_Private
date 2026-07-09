// import { headers } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

const fetcher = async (endpoint, options = {}) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, options)
        const data = await res.json()
        return data
    } catch (error) {
        return {
            success: false, 
            message: "Terjadi kesalahan pada server",
            data: null,
            meta: null
        }
    }
}

export const getAllSiswa = async () => {
    return await fetcher('/api/siswa', {
        cache: 'no-store'
    })
}

export const getSiswaById = async (id) => {
    return await fetcher (`/api/siswa/${id}`, {
        cache: 'no-store' 
    })
}

export const createSiswa = async (data) => {
    return await fetcher('/api/siswa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const updateSiswa = async (id, data) => {
    return await fetcher(`/api/siswa/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteSiswa = async (id) => {
    return await fetcher(`/api/siswa/${id}`, {
        method: 'DELETE'
    })
}

// =============================JADWAL=============================
export const getAllJadwal = async () => {
    return await fetcher('/api/jadwal', { cache: 'no-store' })
}

export const getJadwalById = async ( id ) => {
    return await fetcher(`/api/jadwal/${id}`, { cache: 'no-store' })
}

export const createJadwal = async (data) => {
    return await fetcher ('/api/jadwal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const updateJadwal = async (id, data) => {
    return await fetcher(`/api/jadwal/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteJadwal = async (id) => {
    return await fetcher(`/api/jadwal/${id}`, {
        method: 'DELETE'
    })
}

// ======================================Catatan==================================
export const getAllCatatanSiswa = async (id) => {
    return await fetcher(`/api/siswa/${id}/catatan`, {cache: 'no-store'})
}

export const createCatatanSiswa = async (id, data) => {
    return await fetcher(`/api/siswa/${id}/catatan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const updateCatatanSiswa = async (id, catatanId, data) => {
    return await fetcher(`/api/siswa/${id}/catatan/${catatanId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteCatatanSiswa = async (id, catatanId) => {
    return await fetcher(`/api/siswa/${id}/catatan/${catatanId}`, {
        method: 'DELETE'
    })
}