"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"

const navLinks = [
    {href: "/", label: "Dashboard"},
    {href: "/siswa", label: "Siswa"},
    {href: "/jadwal", label: "Jadwal"}
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="border-b px-4 py-3">
            <div className="container mx-auto flex items-center justify-between ">
                <div className="flex items-center gap-6">
                    <span className="font-bold text-sm">Les Private</span>
                    <div className="flex gap-4">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className={`text-sm transition-colors hover:text-foreground ${pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground"}`}>{link.label}</Link>
                        ))}
                    </div>
                </div>

                <LogoutButton />
            </div>
        </nav>
    )
}