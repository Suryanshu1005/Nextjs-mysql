"use client";
// import { createTheme, NextUIProvider } from "@nextui-org/react"
import AuthProvider from "@/provider/AuthProvider";
// import { Switch, useTheme } from '@nextui-org/react'
// import useDarkMode from 'use-dark-mode';
import Navbar from "@/components/navbar";
import Header from "@/components/header";

// const lightTheme = createTheme({
//     type: 'lightTheme',
// })

// const darkTheme = createTheme({
//     type: 'dark',
//     theme: {
//         colors: {
//             text: '#ffffff',
//             link: 'white',
//             background: 'black',
//             primary: '#4ADE7B',

//         }
//     }
// })






export default function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // let cookie = req.cookies.get('cookie')
    // const darkMode = useDarkMode(false);
    // const { type, isDark } = useTheme();
    return (

        // <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
            <main className="bg-gradient-to-b from-orange-500/10 h-[70%]">
                <AuthProvider>
                    <Header />
                    {children}
                </AuthProvider>
            </main>
        // </NextUIProvider>
    );
}