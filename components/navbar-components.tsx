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
            active: pathname === `/${params.userid}`
        },
        {
            href: `/${params.userid}/profile`,
            lables: 'About us',
        },
        {
            href: '#',
            lables: 'What we do?',
        },
        {
            href: `/${params.userid}/suggestions`,
            lables: 'Have a suggestion?',
        },
    ]
    return (
        <div className="flex m-2 gap-4">
            {
                routes.map((item) => (
                    <Link
                        href={item.href}
                        className={
                            cn(
                                "hover:text-red-700 hover:font-bold"
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