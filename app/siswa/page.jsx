export const dynamic = 'force-dynamic'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiswaTable from "@/components/SiswaTable"
import ButtonAksi from "@/components/ButtonAksi"
import prisma from "@/lib/prisma"

export default async function SiswaPage() {
  const siswaList = await prisma.siswa.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Data Siswa</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {siswaList.length} siswa terdaftar
          </p>
        </div>
        <ButtonAksi className="cursor-pointer" url={"/siswa/new"} label={"+ Tambah Siswa"}/>
      </div>

      <SiswaTable siswaList={siswaList} />
    </main>
  )
}