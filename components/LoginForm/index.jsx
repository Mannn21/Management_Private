"use client"

import { useState } from "react";
import { signIn } from "next-auth/react"
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
    const router = useRouter()
    const [form, setForm] = useState({email: "", password: ""})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = e => {
        setForm({... form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false
        })

        if(result?.error) {
            setError("Email atau password salah")
            setLoading(false)
            return
        }

        router.push("/")
        router.refresh()
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {
                error && (
                    <div className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-md">{error}</div>
                )
            }

            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin123@gmail.com" value={form.email} onChange={handleChange} required/>
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="********" value={form.password} onChange={handleChange} required /> 
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>{loading? "Masuk..." : "Masuk"}</Button>
        </form>
    )
}