'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"


const RegistrationForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = JSON.stringify({ email, password });

        try {
            await fetch('api/user', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: payload
            });

            setEmail('');
            setPassword('');
            router.push('http://localhost:3000/all_users')


            // Handle success or perform additional actions here
        } catch (error) {
            // Handle errors or display error messages
            console.error(error);
        }
    };

    return (
        <div className="m-2 p-6">
            <form action="#" method="POST" onSubmit={handleSubmit}>
                <label className="p-6" htmlFor="email">Email</label>
                <input
                    className="border rounded-md"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="p-6" htmlFor="password">Password</label>
                <input className="border rounded-md border-black p-2" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className="items-center flex justify-center"><button className="bg-blue-300 border rounded-md border-black p-2" type="submit">Submit</button></div>
            </form>
        </div>
    );
}

export default RegistrationForm;