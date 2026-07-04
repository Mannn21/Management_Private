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