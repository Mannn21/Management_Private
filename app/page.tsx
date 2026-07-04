import Link from 'next/link'
import { getAllSiswa } from '@/lib/api'
import { Button } from '@/components/ui/button'
import SiswaTable from '@/components/SiswaTable'

export default async function Home() {
  const result = await getAllSiswa()
  const siswaList = result.success ? result.data : []

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Les Private</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {siswaList.length} Siswa Terdaftar
          </p>
        </div>
        <Link href="/siswa/new">
          <Button>Tambah Siswa</Button>
        </Link>
      </div>

      <SiswaTable siswaList={siswaList} />
    </main>
  )
}