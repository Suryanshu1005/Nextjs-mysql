"use client"
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { Popover, Grid, User, Button } from "@nextui-org/react";
import Navbar from "@/components/navbar";
import Logout from "@/components/canvas/logout";



const UserProfile = () => {
    const { user, error } = useContext(AuthContext);


    return (
        <>
            <div>
                <div className="p-9 h-[500px] items-center relative flex justify-center place-items-center before:absolute before:w-[480px] before:rounded-full before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] before:dark:bg-gradient-to-br before:dark:from-transparent before:lg:h-[360px] z-[1]">
                    <p className="relative font-bold text-3xl dark:drop-shadow-[0_0_0.3rem_#ffffff70]">Have a wonderful visit</p>
                </div>
            </div>
        </>
    );
}

export default UserProfile;