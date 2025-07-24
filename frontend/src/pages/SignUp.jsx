import Form from "../assets/Form.png";
import axios from "axios";
import { Heading } from "../components/ui/Heading";
import { useState } from "react";

export default function SignUp() {
    
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [pin,setPin] = useState("");
    const [upi,setUpi] = useState("");
    const [errors,setErrors] = useState("")
    const [signupError, setSignupError] = useState("")

    const handleSubmit = async function(e) {
        e.preventDefault();

        let isValid = true;
        setErrors("")
        setSignupError("")

        if(!name.trim()) {
            setErrors(function(prev){
                return{...prev,name: "Name is required."}
            })
            isValid = false;
        }

         if(name.length < 3) {
            setErrors(function(prev){
                return{...prev, name: "Name should have 3 characters."}
            })
            isValid = false;
        }

         if(!email.trim()) {
            setErrors(function(prev){
                return{...prev, email: "Email is required."}
            })
            isValid = false;
        }

        else if (!/^[a-zA-Z0-9_.%+-]{2,256}@[a-zA-Z0-9._]{2,10}\.[a-zA-Z]{2,10}$/.test(email)) {
                setErrors(function(prev) {
                    return{...prev, email: "Invalid email format."}
                })
                isValid = false;
        }

         if (!password.trim()) {
            setErrors(function(prev){
                return{...prev, password: "Password is required."}
            })
            isValid = false;
        }

         if (password.length < 8) {
            setErrors(function(prev) {
                return{...prev, password: "Password must be 8 characters long."}
            })
            isValid = false
        }

         if (!/[a-z]/.test(password)) {
            setErrors(function(prev) {
                return{...prev, password: "Password should have 1 small alphabet."}
            })
            isValid = false
        }

         if (!/[A-Z]/.test(password)) {
            setErrors(function(prev) {
                return{...prev, password: "Password should have 1 capital letter."}
            })
            isValid = false
        }

         if (!/[0-9]/.test(password)) {
            setErrors(function(prev) {
                return{...prev, password: "Password should have 1 numeric."}
            })
            isValid = false
        }

         if (!/[^a-zA-Z0-9]/.test(password)) {
            setErrors(function(prev) {
                return{...prev, password: "Password should have 1 small alphabet."}
            })
            isValid = false
        }

        if (!pin.trim()) {
            setErrors(function(prev) {
                return{...prev,pin: "PIN is required."}
            })
            isValid = false;
        }

         if(!/^[0-9]{4,6}$/.test(pin)) {
            setErrors(function(prev){
                return { ...prev,pin: "PIN is invalid."}
            })
            isValid = false
        }

         if(!upi.trim()) {
            setErrors(function(prev) {
                return{...prev,upi: "UPI is required"}
            })
            isValid = false;
        }

         if(!/^[a-zA-Z0-9._-]{2,256}@[a-zA-Z0-9]{2,64}$/.test(upi)) {
            setErrors(function(prev) {
                return {...prev,upi: "UPI ID is invalid."}
            })
            isValid = false;
        }

        if (isValid) {
            try {
                    const response = await axios.post("http://localhost:3000/user/signup",{
                        name,
                        email,
                        password,
                        PIN: pin,
                        upiId: upi
                    },{
                        withCredentials:true
                    })

                    console.log("API RESPONSE:", response)

                    if(response.status === 200) {
                        alert("Sign up successful.")
                    }

            } catch(error) {
                console.log(error)

                if (error.response) {
                    console.log("Error response:", error.response);
                    setSignupError(error.response.data.error || "Sign-up failed")
                } else {
                    setSignupError("Network error or server is down.")
                }
            }
            }
        }
    

    return (
       <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block md:bg-purple-600 lg:col-span-1">
                <img src={Form} alt="Form" className="lg:py-[260px]"></img>
            </div>

            <div className="bg-gradient-to-br from-rose-300 to-pink-500 lg:col-span-1">
                    <div className="mt-16 mr-6">
                        <Heading text="Sign up to Wally!"/>
                    </div>
                    <hr className="w-2/3 border-white border-t-1 mt-2 mx-[53px] md:mx-[110px]"></hr>

                    <div className="grid grid-cols-2 mt-16 ml-2">

                        <div className="col-span-1">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="font-normal">Name</label>
                                    <input id="name" className="rounded-lg py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[180px] md:w-[340px]" placeholder="Raman Singh" type="text" onChange={function(e){setName(e.target.value)}}></input>
                                </div>

                                {errors.name ? <div className="mx-1 font-normal text-sm text-gray-800 md:text-lg md:font-semibold"> 
                                    {errors.name}
                                </div> : null} 

                                <div className="flex flex-col my-5">
                                    <label htmlFor="e_mail" className="font-normal">E-mail</label>
                                    <input id="e_mail" className="rounded-lg py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[180px]  md:w-[340px]" placeholder="raman92@gmail.com" type="text" onChange={function(e) {setEmail(e.target.value)}}></input>
                                </div> 
                                {errors.email ? <div className="mx-4 font-normal text-sm text-gray-800 md:ml-1 md:-mt-[15px] md:text-lg md:font-semibold"> 
                                    {errors.email}
                                </div> : null}
                        </div>

                        <div className="col-span-1">
                                <div className="flex flex-col">
                                            <label htmlFor="password" className="font-normal">Password</label>
                                            <input id="password" className="rounded-lg py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[180px]  md:w-[340px]" placeholder="********" type="text" onChange={function(e){setPassword(e.target.value)}}></input>
                                        </div> 
                                        {errors.password ? <div className="mx-4 font-normal text-sm text-gray-800 md:ml-1 md:text-lg md:font-semibold "> 
                                             {errors.password}
                                        </div> : null}

                                        <div className="flex flex-col my-5">
                                            <label htmlFor="PIN" className="font-normal">PIN</label>
                                            <input id="PIN" className="rounded-lg py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[180px]  md:w-[340px]" placeholder="********" type="text" onChange={function(e){setPin(e.target.value)}}></input>
                                        </div> 
                                        {errors.pin ? <div className="mx-4 font-normal text-sm text-gray-800 md:pl-[160px] md:text-xl md:font-semibold lg:-ml-[160px]"> 
                                            {errors.pin}
                                        </div> : null}
                                </div>
                        </div>
                        <div className="flex flex-col mx-2">
                        <label htmlFor="upi_Id" className="font-normal"> UPI ID</label>
                        <input id="upi_Id" placeholder="raman01@oksbi" type="text" className="rounded-lg mr-4 py-1 px-1 transition delay-50 duration-200 hover:shadow-md hover:shadow-white" onChange={function(e){setUpi(e.target.value)}}></input>
                        </div> 
                        {errors.upi ? <div className="mx-4 font-normal text-sm text-gray-800 md:text-lg md:font-semibold lg:ml-[65px] lg:ml-[10px]"> 
                             {errors.upi}
                         </div> : null}


                        <div className="flex justify-center my-20 mr-4">
                        <button className="bg-black text-white w-full rounded-3xl h-[45px] mx-6 transition delay-50 duration-200 hover:scale-110 hover:shadow-md hover:shadow-white" onClick={handleSubmit}> Sign Up</button>
                        </div>
                        
                        <div className="text-center mt-2">
                                {signupError ? (
                                <span className="text-gray-800 font-bold">{signupError}</span>
                                ) : null}
                        </div>               
            </div>
       </div>
    )
}