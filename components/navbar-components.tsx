"use client";

import Link from "next/link";
import { cn } from "@/utils/utils";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useParams, usePathname } from "next/navigation";

const NavbarComponents = () => {

    const { user, error } = useContext(AuthContext);
    const params = useParams();
    const pathname = usePathname()

    const routes = [
        {
            href: `/${params.userid}/homepage`,
            lables: 'Home',
            active: pathname === `/${params.userid}/homepage`
        },
        {
            href: `/${params.userid}/profile`,
            lables: 'About us',
            active: pathname === `/${params.userid}/profile`
        },
        {
            href: '#',
            lables: 'What we do?',
        },
        {
            href: `/${params.userid}/suggestions`,
            lables: 'Have a suggestion?',
            active: pathname === `/${params.userid}/suggestions`
        },
    ]
    return (
        <div className="flex m-2 gap-4">
            {
                routes.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={
                            cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                item.active ? "text-black dark:text-white" : "text-muted-foreground"
                            )
                        }
                    >
                        {item.lables}
                    </Link>
                ))
            }
        </div>
    );
}

export default NavbarComponents;