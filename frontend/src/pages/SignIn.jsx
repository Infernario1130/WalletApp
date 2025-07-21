import {Heading} from "../components/ui/Heading";
import {SubHeading} from "../components/ui/SubHeading";
import { useState } from "react";
import Wallet from "../assets/Wallet.png";
import axios from "axios";


export default function SignIn() {
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const [loginError,setLoginError] = useState("")
    const [errors,setErrors] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async function(e) {
        e.preventDefault();
        console.log("Done")
        let isValid = true;
        
        setLoginError("");

        if (!email.trim()) {
            setErrors(function(prev) {
                return{...prev, email: "Email is required."}
            })
            isValid = false
        }
        else if (!/^[a-zA-Z0-9_.%+-]{2,256}@[a-zA-Z0-9.-]{2,10}\.[a-zA-Z]{2,10}$/.test(email)) {
            setErrors(function(prev){
                return{...prev,email: "Invalid email format"}
            })
            isValid = false
        }
        else {
            setErrors({ email: "" })
          } 

          if (!password.trim()) {
            setErrors(function(prev){
                return{...prev, password: "Password is required."}
            })
            isValid = false
        }
            else if (password.length < 8) {
                setErrors(function(prev) {
                    return{...prev, password: "Password must be atleast 8 chaaracters"}
                })
                isValid = false
              }
            
            else if (!/[a-z]/.test(password)) {
                setErrors(function(prev) {
                    return {...prev, password: "Password must have atleast 1 lowercase character."}
                })
                isValid = false
            }

            else if (!/[A-Z]/.test(password)) {
                setErrors(function(prev){
                    return {...prev , password: "Password must have 1 uppercase letter."}
                })
                isValid = false
            }

            else if (!/[0-9]/.test(password)) {
                setErrors(function(prev){
                    return {...prev, password: "Password must have atleast 1 digit."}
                })
                isValid = false
                } 

            else if (!/[^a-zA-Z0-9]/.test(password)) {
                setErrors(function(prev){
                    return {...prev, password: "Password must have atleast 1 special character."}
                })
                isValid = false
              }
              
              else {
                setErrors(function(prev) {
                    return {...prev, password: ""}
                })
              }
              if (isValid) {
                try {
                    const response = await axios.post("http://localhost:3000/user/signin",{
                        email,
                        password
                    }, {
                        withCredentials: true
                    })

                    console.log("API Response:", response)

                    if(response.status === 200) {
                        alert("Login successfully.")
                    }
                    
                } catch(error) {
                    console.log(error)

                    if (error.response) {
                        console.log("Error response:", error.response);
                        setLoginError(error.response.data.error || "Login failed")
                    } else {
                        setLoginError("Network error or server is down.")
                    }
                }
                
              }
            }

    return(
        <>
        <div className="min-h-screen pt-4 bg-gradient-to-br from-rose-300 to-pink-500">
            <div className="">
                <div className="flex justify-center mx-2 md:mt-[30px]">
                        <img src={Wallet} alt="Logo" className="w-1/3 md:w-1//3 transition delay-50 duration-200 hover:scale-110"></img>
                </div>

                <div className="flex justify-center -mt-8 md:-mt-[50px]">
                        <Heading text="Log in to your account"/>
                </div>
                
                <div className="-mt-[90px] md:-mt-[80px]">
                        <SubHeading text="Welcome back to Wally!!!"/>
                </div>
            </div>
                <div className="flex flex-col mt-20 px-4 md:pt-20 md:items-center">
                    <label htmlFor="e_mail" className="text-sm md:text-2xl font-semibold md:font-normal md:felx-start">Email Address</label>
                    <input id="e_mail" type="text" onChange={function(e){
                        setEmail(e.target.value)
                    }} placeholder="raman92@gmail.com" className="rounded-lg bg-white w-full h-[35px] pl-2 md:w-3/4 md:h-[60px] md:text-xl hover:shadow-md hover:shadow-white hover:transition delay-50 duration-300"/>
                </div>

                {errors.email ? <div className="mx-4 font-normal text-sm text-gray-800 md:pl-[160px] md:text-xl md:font-semibold"> 
                    {errors.email}
                </div> : null}

                <div className="flex flex-col mt-4 px-4 md:items-center">
                    <label htmlFor="pass_word" className="text-sm md:text-2xl font-semibold md:font-normal"> Password </label>
                    <input id="pass_word" type="password" onChange={function(e) {setPassword(e.target.value)}} placeholder="******" className="rounded-lg bg-white w-full h-[35px] pl-2 md:w-3/4 md:h-[60px] md:text-xl hover:shadow-md hover:shadow-white hover: transition delay-50 duration-200"/>
                </div>

                {errors.password ? <div className="mx-4 mt-[2px] font-normal text-sm text-gray-800 md:pl-[160px] md:text-xl md:font-semibold"> 
                     {errors.password}
                     </div> : null}

                   <div className="flex justify-center mt-6 md:mt-10">
                    <button className="rounded-3xl w-full h-[45px] mx-6 my-6  bg-black text-white md:w-1/3 md:h-[60px] font-bold hover:shadow-md hover:shadow-white hover:transition delay-50 duration-200 hover:scale-110" onClick={handleSubmit}>Log In</button>
                </div>
                <div className="text-center mt-2">
                        {loginError ? (
                         <span className="text-gray-800 font-bold">{loginError}</span>
                        ) : null}
                 </div>
        </div>
      </>
    )
}