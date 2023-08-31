import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DataCard = () => {

    const params = useParams()

    const [cardData, setCardData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/${params.userid}/suggestions`);
                console.log("data",response.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData(); // Call the async function inside useEffect
    }, [params.userid]); // Add params.userid to the dependency array

    return (
        <div>
            {cardData.map((data) => (
                <div>
                    {data}
                </div>
            ))}
        </div>
    );
}

export default DataCard;