import { createContext, useEffect, useState } from "react"
import { UserResponse, getUser } from "@/utils/apiUtil"
import { useRouter } from "next/navigation";
import { Loading, Grid } from "@nextui-org/react";

export const AuthContext = createContext<UserResponse>({ user: null, error: null })

const AuthProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [userData, setUserData] = useState<UserResponse>({ user: null, error: null });
    const [loading, setLoading] = useState(true);
    const { push } = useRouter();

    console.log('dfaskhdfas', userData)

    useEffect(() => {
        (async () => {
            const { user, error } = await getUser();
            if (error) {
                push('/')
                return
            } else {
                setUserData({ user, error: null });
            }
            setLoading(false)
        })();
    }, [push])

    console.log("this is auth")

    console.log("____user", userData?.user)
    if (loading) {
        return (
            <div>
                <Grid.Container gap={2} justify="center" alignItems="center" className="h-[100%]">
                    <Grid>
                        <Loading type="gradient" />
                    </Grid>
                </Grid.Container>
            </div>
        );
    }

    console.log('Hello world')



    return <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
}

export default AuthProvider;