'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast";


const RegistrationForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [password2, setPassword2] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const router = useRouter()

    const handleSubmit = async () => {
        const payload = JSON.stringify({ email, password, username, password2 });

        try {
            const response = await fetch('api/auth', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: payload
            });

            console.log("Signup success", response);

            setEmail('');
            setPassword('');
            setUsername('');
            setPassword2('');
            router.push('/login')


            // Handle success or perform additional actions here
        } catch (error:any) {
            console.log("Signup failed", error.message);
            console.error(error);
            toast.error(error.message);
        }

        if(password!==password2) {
            toast.error("Please enter the same password");
        }
    };


    useEffect(() => {
        if(email.length > 0 && password.length > 0 && username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email.length, password.length, username.length]);

    return (
        <div className="flex lg:text-center justify-center items-center min-h-screen p-6">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Username</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id="username"
                            placeholder="Your Name"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="password">Enter your Password again</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password" name="password2"
                            id="password2"
                            value={password2}
                            placeholder="Enter Your password again"
                            onChange={(e) => setPassword2(e.target.value)}
                            required />
                        <div className="items-center flex justify-center">
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
}

export default RegistrationForm;