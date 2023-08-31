import prismadb from "@/lib/prismadb";
import { getSession } from "next-auth/react";

const AllUsers = async ({
    params
}: {
    params: { id: string }
}) => {

    const users = await prismadb.user.findMany({
        where: {
            id: params.id
        }
    })

    console.log('userId: ', users)

    // users.map((user) => (
    //     <div className="flex mb-2 p-2">
    //         {/* <div className="p-2"> <span> User Emails: </span>{user.email}</div> */}
    //         <div className="p-2"> <span> User Id: </span>{user.id}</div>
    //         {/* <div className="p-2"> <span> User Password: </span>{user.password}</div> */}
    //     </div>
    // ))
    return (
        // <div className="m-10 p-2 mb-2">
        //     {
        //         users.map((user) => (
        //             <div>
        //                 <div className="flex mb-2 p-2">
        //                     {/* <div className="p-2"> <span> User Emails: </span>{user.email}</div> */}
        //                     <div className="p-2"> <span> User Id: </span>{user.id}</div>
        //                     {/* <div className="p-2"> <span> User Password: </span>{user.password}</div> */}
        //                 </div>
        //             </div>
        //         ))
        //     }
        // </div>
        <>
            user page
        </>

    );
}

export default AllUsers;


export async function getServerSideProps(context : any) {

    const session = await getSession(context)
    console.log('session: ', session)
    return {
            props: {
                data: session ? 'this is a navbar' : 'no navbar'
            }
        }
}