"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

const LoginForm = () => {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const payload = JSON.stringify({ email, password });
        if (!email || !password) {
            toast.error('Please enter required credentials')
            return
        }
        try {
            setLoading(true);
            const response = await axios.post('api/user/login', payload)
            console.log("Login success", response);
            toast.success('Login Successfull')

            if (response.data && response.data.success) {
                toast.success('Login Successful');
                router.push('/all_users');
            } else if (response.data && response.data.userNotFound) {
                toast.error('User does not exist.');
            } else {
                toast.error('Login failed.');
            }
        } catch (error) {
            toast.error('Login failed');
            console.log('error: ', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, []);

    return (
        <div className="grid justify-center items-center w-full max-w h-[750px]">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email" >
                        Email
                    </label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="your email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="******************" />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        {buttonDisabled ? "Signin" : "SignIn"}
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    );
}
export default dynamic(() => Promise.resolve(LoginForm), { ssr: false })
