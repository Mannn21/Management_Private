import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiswaTable from "@/components/SiswaTable"
import LogoutButton from "@/components/LogoutButton"
import prisma from "@/lib/prisma"

export default async function Home() {
  const siswaList = await prisma.siswa.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Les Private</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {siswaList.length} Siswa Terdaftar
          </p>
        </div>
        <Link href="/siswa/tambah">
          <Button>Tambah Siswa</Button>
        </Link>
        <LogoutButton />
      </div>

      <SiswaTable siswaList={siswaList} />
    </main>
  )
}