'use client'
import Link from "next/link";

export default function LoginButton() {
    return (
        <Link href='/login' className="absolute right-2 text-transparent">Login</Link>
    );
}
