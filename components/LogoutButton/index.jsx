"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
    return (
        <Button variant="outline" className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/login" })}>
            Keluar
        </Button>
    )
}