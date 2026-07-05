import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold">Manajemen Les Private</h1>
                    <p className="text-muted-foreground text-sm mt-1">Masuk untuk melanjutkan</p>
                </div>
                <LoginForm />
            </div>
        </main>
    )
}