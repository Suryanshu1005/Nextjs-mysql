import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Logout = () => {

    const router = useRouter()
    const handleSubmit = async () => {
        try {
            const response = await axios.get('/api/auth/logout')
            if (response) {
                toast.success('logged out successfully')
            }
            router.push('/')
        } catch (error) {
            console.log('error: ', error)
        }
    }

    return (
        <div className="bg-white p-2 mt-2 mb-2">
                <Button color="error" flat onClick={handleSubmit} className="mb-2">
                    Logout
                </Button>
                <Button color="default" flat>
                    Settings
                </Button>
        </div>
    );
}
export default Logout;