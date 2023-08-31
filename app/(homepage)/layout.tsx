"use client";
// import { createTheme, NextUIProvider } from "@nextui-org/react"
import AuthProvider, { AuthContext } from "@/provider/AuthProvider";
import Header from "@/components/header";
import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";

export default function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const user = useContext(AuthContext)
    const router = useRouter()
    const params = useParams()

    console.log('userinlayout', user)

    return (
            <main className="bg-gradient-to-b from-orange-500/10 h-[100%]">
                <AuthProvider>
                    <Header />
                    {children}
                </AuthProvider>
            </main>
    );
}