import { Heading } from "../components/ui/Heading";
import { useState } from "react";
import axios from "axios";
import Topup from "../assets/Topup.png"

export default function ChangePin() {

    const [amount,setAmount] = useState("");
    const [errors,setErrors] = useState("");
    const [topupErrors,setTopupErrors] = useState("")

    const handleSubmit = async function(e) {
        e.preventDefault();
        setErrors("");
        setTopupErrors("");

        let isValid = true;

        if (!amount.trim()) {
            setErrors(function(prev){
                return{...prev, amount: "Amount is required."}
            })
            isValid = false;
        }

        if (amount < 1) {
            setErrors(function(prev){
                return{...prev, amount: "Minimum amount must be 1."}
            })
            isValid = false
        }
        
        if (isValid) {
                try { 
                    const response = await axios.put(
                        "http://localhost:3000/user/change-pin", {
                            amount,
                        },{
                            withCredentials: true
                        }
                    )
                        console.log("API RESPONSE:", response)

                        if(response.status === 200) {
                            alert("Top-up successfully done.")
                        }
                } catch (error) {
                    console.log("Error response", error)
                    
                    if(error.response) {
                        console.log("Error response:", error.response);
                        setTopupErrors(error.response.data.error || "Process failed.") 
                    } else {
                        setTopupErrors("Netowrk error or server is done.")
                    }
                }
        }
    }



    return(
       <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block lg:col-span-1 lg:bg-purple-600">
                <img src={Topup} alt="illustration"></img>
            </div>

            <div className="bg-gradient-to-br from-rose-300 to-pink-500 lg:col-span-1">
                <div className="mt-16 mr-6">
                    <Heading text="Top-Up"/>
            </div>
                <hr className="w-2/3 border-white border-t-1 mt-2 mx-[53px] md:mx-[110px]"></hr>
            
                <div className="flex flex-col mt-20 px-4 md:pt-20 md:items-center">
                    <label htmlFor="amount" className="text-sm md:text-2xl font-semibold md:font-normal md:felx-start">Amount</label>
                    <input id="amount" className="rounded-lg w-full py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[340px] md:w-[340px]" type="text" placeholder="100" onChange={function(e){setAmount(e.target.value)}}></input>
                    {errors.amount ? <div className="mx-1 font-normal text-sm text-gray-800 md:text-lg md:font-semibold">
                            {errors.amount}
                    </div> : null }
                </div>

                <div className="flex justify-center mt-6 md:mt-10">
                    <button className="rounded-3xl w-2/3 h-[45px] mr-[60px] my-12  bg-black text-white md:w-1/3 md:h-[60px] font-bold hover:shadow-md hover:shadow-white hover:transition delay-50 duration-200 hover:scale-110" onClick={handleSubmit}>Top-Up</button>
                </div>

                <div className="text-center mt-2">
                                {topupErrors ? (
                                <span className="text-gray-800 font-bold">{topupErrors}</span>
                                ) : null}
                        </div> 
            </div>


       </div>
    )
}