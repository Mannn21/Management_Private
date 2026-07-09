import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ButtonAksi({ url, label, className = "" }) {
    return (
        <Link href={url}>
            <Button className={className}>
                {label}
            </Button>
        </Link>
    )
}