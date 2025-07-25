import { Heading } from "../components/ui/Heading";
import { useState } from "react";
import axios from "axios";
import Pin from "../assets/Pin.png"

export default function ChangePin() {

    const [oldpin,setOldpin] = useState("");
    const [newpin,setNewpin] = useState("");
    const [errors,setErrors] = useState("");
    const [pinErrors,setPinErrors] = useState("")

    const handleSubmit = async function(e) {
        e.preventDefault();
        setErrors("");
        setPinErrors("");

        let isValid = true;

        if (!oldpin.trim()) {
            setErrors(function(prev){
                return{...prev, oldpin: "Old PIN is required."}
            })
            isValid = false;
        }
        if(!/[0-9]{4,6}/.test(oldpin)) {
            setErrors(function(prev){
                return{...prev, oldpin: "Invalid format."}
            })
            isValid = false;
        }
         if(!newpin.trim()) {
            setErrors(function(prev){
                return{...prev, newpin: "New PIN is required."}
            })
            isValid = false;
        }

        if(!/[0-9]{4,6}/.test(newpin)) {
            setErrors(function(prev){
                return{...prev,newpin: "Invalid format."}
            })
            isValid = false;
        }

        if (isValid) {
                try { 
                    const response = await axios.put(
                        "http://localhost:3000/user/change-pin", {
                            oldPin: oldpin,
                            newPin: newpin
                        },{
                            withCredentials: true
                        }
                    )
                        console.log("API RESPONSE:", response)

                        if(response.status === 200) {
                            alert("PIN successfully changed.")
                        }
                } catch (error) {
                    console.log("Error response", error)
                    
                    if(error.response) {
                        console.log("Error response:", error.response);
                        setPinErrors(error.response.data.error || "Process failed.") 
                    } else {
                        setPinErrors("Netowrk error or server is done.")
                    }
                }
        }
    }



    return(
       <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block lg:col-span-1 lg:bg-purple-600">
                <img src={Pin} alt="illustration"></img>
            </div>

            <div className="bg-gradient-to-br from-rose-300 to-pink-500 lg:col-span-1">
                <div className="mt-16 mr-6">
                    <Heading text="PIN Change"/>
            </div>
                <hr className="w-2/3 border-white border-t-1 mt-2 mx-[53px] md:mx-[110px]"></hr>
            
                <div className="flex flex-col mt-20 px-4 md:pt-20 md:items-center">
                    <label htmlFor="old_pin" className="text-sm md:text-2xl font-semibold md:font-normal md:felx-start">Old Pin</label>
                    <input id="old_pin" className="rounded-lg py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[340px] md:w-[340px]" type="text" placeholder="******" onChange={function(e){setOldpin(e.target.value)}}></input>
                    {errors.oldpin ? <div className="mx-1 font-normal text-sm text-gray-800 md:text-lg md:font-semibold">
                            {errors.oldpin}
                    </div> : null }
                </div>

                <div className="flex flex-col mt-10 px-4 md:pt-20 md:items-center">
                    <label htmlFor="new_pin" className="text-sm md:text-2xl font-semibold md:font-normal md:felx-start">New Pin</label>
                    <input id="new_pin" className="rounded-lg py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[340px] md:w-[340px]" type="text" placeholder="******" onChange={function(e) {setNewpin(e.target.value)}}></input>
                    {errors.newpin ? <div className="mx-1 font-normal text-sm text-gray-800 md:text-lg md:font-semibold">
                            {errors.newpin}
                    </div> : null }
                    
                </div>

                <div className="flex justify-center mt-6 md:mt-10">
                    <button className="rounded-3xl w-full h-[45px] mx-6 my-6  bg-black text-white md:w-1/3 md:h-[60px] font-bold hover:shadow-md hover:shadow-white hover:transition delay-50 duration-200 hover:scale-110" onClick={handleSubmit}>Change PIN</button>
                </div>

                <div className="text-center mt-2">
                                {pinErrors ? (
                                <span className="text-gray-800 font-bold">{pinErrors}</span>
                                ) : null}
                        </div> 
            </div>


       </div>
    )
}