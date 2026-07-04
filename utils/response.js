import {NextResponse} from 'next/server'

const successResponse = (data, message = 'Berhasil', statusCode = 200) => {
    return NextResponse.json({
        success: true,
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
        }
    },
        { status: statusCode }
    )
}

const errorResponse = (message = 'Terjadi kesalahan', statusCode = 500) => {
    return NextResponse.json({
        success: false,
        message,
        data: null,
        meta: {
            timestamp: new Date().toISOString(),
        }
    },
        { status: statusCode }
    )
}

export { successResponse, errorResponse }