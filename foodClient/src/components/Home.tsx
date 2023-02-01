import { useEffect, useState } from "react"
import axios from "axios"
const Home = () => {
    const [selectValue, setSelectValue] = useState({
        title: ""
    })
    const [getFoodData, setGetFoodData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/get")
            .then((res: any) => setGetFoodData(res.data))
            .catch((err) => console.log(err))
    }, [])
    console.log(getFoodData);

    const handleAddOnMongodb = (event: any) => {
        event.preventDefault();
        if (selectValue.title != "") {

            axios.post("http://localhost:8080/post", selectValue)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
        window.location.reload()
    }

    const handleChange = (event: any) => {


        const { name, value } = event.target;
        setSelectValue((prev) => {
            return {
                ...prev,
                [name]: value
            }
        }


        )
        console.log(selectValue);
    }

    return (
        <>
            <div>
                <select name="title" onChange={handleChange} value={selectValue.title}>
                    <option value="Sambhar">Sambhar</option>
                    <option value="Rasam">Rasam</option>
                    <option value="Special Curry">Special Curry</option>
                    <option value="Special Gravy">Special Gravy</option>
                    <option value="Fry/Poriyal - Raw Banana Fry">Fry/Poriyal - Raw Banana Fry</option>
                    <option value="Aviyal/Koottu">Aviyal/Koottu</option>
                    <option value="Snack">Snack</option>
                    <option value="Sweet">Sweet</option>
                    <option value="Flavoured Rice">Flavoured Rice</option>
                </select>
                <button onClick={handleAddOnMongodb}>Add food</button>
            </div>
            <div>
                {
                    getFoodData.map((elem: any) => {
                        return (
                            <div key={elem._id}>
                                <h3>{elem.title}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Home