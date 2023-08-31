"use client"

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import jwt from "jsonwebtoken";
// import StarsCanvas from "@/components/canvas/Stars";



const LoginForm = () => {

    const params = useParams()

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false)


    const handleSubmit = async () => {
        const payload = JSON.stringify({ email, password });
        if (!email || !password) {
            toast.error('Please enter required credentials')
            return
        }
        try {
            setLoading(true);
            const response = await axios.post('/api/auth/login', payload)
            const getId = await axios.get(`/api/auth/${params.id}`)
            console.log("Login success", response);
            const token = response.data.token
            const ID = getId.data.user

            if (token) {
                const message = jwt.decode(token)
            }
            toast.success('Login Successfull', {
                position: 'top-right',
            })

            if (response.data && response.data.success) {
                router.push(`/${ID?.id}/suggestions`);
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
        <div className="flex min-h-screen justify-center items-center w-full max-w h-fit bg-gradient-to-t from-green-50 via-red-50">
            <div className="bg-white p-20 bg-green-400/20 bg-origin-border rounded-xl shadow-slate-300 border-red-200">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-blue-300/50">
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
                <h3 className="text-center text-base text-teal-950">Dont have an account? <span><a className="hover:text-blue-700" href="/register">Register Now!</a></span></h3>
            </div>
        </div>
    );
}
export default dynamic(() => Promise.resolve(LoginForm), { ssr: false })
