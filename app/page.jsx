import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

export default async function DashboardPage() {
  const hariIni = HARI[new Date().getDay()]

  const [totalSiswa, jadwalHariIni, totalAktif, totalSelesai] = await Promise.all([
    prisma.siswa.count(),
    prisma.jadwal.findMany({
      where: { hari: hariIni },
      orderBy: { jamMulai: "asc" },
      include: { siswa: {select: {nama: true}} }
    }),
    prisma.jadwal.count({ where: { status: "Terjadwal" } }),
    prisma.jadwal.count({ where: { status: "Selesai" } })
  ])

  const stats = [
    { label: "Total Siswa", value: totalSiswa },
    { label: "Jadwal Hari ini", value: jadwalHariIni.length },
    { label: "Jadwal Aktif", value: totalAktif },
    { label: "Jadwal Selesai", value: totalSelesai }
  ]

  const statusVariant = status => {
    if(status === "Selesai") return "default"
    if(status === "Batal") return "destructive"
    return "secondary"
  }


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashhboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Selamat datang - hari ini {hariIni}</p>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jadwal Hari Ini */}
      <div>
        <h2 className="text-lg font-semiboold mb-4">Jadwal Hari Ini</h2>
        {jadwalHariIni.length === 0 ? (
          <p className="text-muted-foreground text-sm">Tidak ada jadwal hari ini.</p>
        ) : (
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Siswa</TableHead>
                  <TableHead>Jam</TableHead>
                  <TableHead>Mapel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jadwalHariIni.map(jadwal => (
                  <TableRow key={jadwal.id}>
                    <TableCell className="font-medium">{jadwal.siswa.nama}</TableCell>
                    <TableCell>{jadwal.jamMulai} - {jadwal.jamSelesai}</TableCell>
                    <TableCell>{jadwal.mapel}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(jadwal.status)}>
                        {jadwal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{jadwal.catatan || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  )
  
}