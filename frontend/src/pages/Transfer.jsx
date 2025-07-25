import {Heading} from "../components/ui/Heading";
import {useState} from "react";
import axios from "axios";
import illustraion from "../assets/illustration.png";

export default function Transfer() {
    
    const [amount,setAmount] = useState("");
    const [pin,setPin] = useState("");
    const [account,setAccount] = useState("");
    const [errors,setErrors] = useState("")
    const [transferError, setTransferError] = useState("")

    const handleSubmit = async function(e) {
        e.preventDefault();

        let isValid = true;
        setErrors("")
        setTransferError("")

        if(!amount.trim()) {
            setErrors(function(prev){
                return{...prev,amount: "Amount is required."}
            })
            isValid = false;
        }

         if(amount < 1) {
            setErrors(function(prev){
                return{...prev, amount: "Minimum amount must be 1."}
            })
            isValid = false;
        }

         if(!account.trim()) {
            setErrors(function(prev){
                return{...prev, account: "Account is required."}
            })
            isValid = false;
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


        if (isValid) {
            try {
                    const response = await axios.post("http://localhost:3000/transit/transfer",{
                        amount,
                        receiverAccountId: account,
                        PIN: pin
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
                    setTransferError(error.response.data.error || "Sign-up failed")
                } else {
                    setTransferError("Network error or server is down.")
                }
            }
            }
        }
    

    return (
       <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block md:bg-purple-600 lg:col-span-1">
                <img src={illustraion} alt="Illustration" className="lg:py-[260px]"></img>
            </div>

            <div className="bg-gradient-to-br from-rose-300 to-pink-500 lg:col-span-1">
                    <div className="mt-16 mr-6">
                        <Heading text="Transfer Money 💰"/>
                    </div>
                    <hr className="w-2/3 border-white border-t-1 mt-2 mx-[53px] md:mx-[110px]"></hr>

                        <div className="mt-12 ml-4 md:mt-20"> 
                                <div className="flex flex-col">
                                    <label htmlFor="amount" className="font-semibold md:flex justify-center">Amount</label>
                                    <input id="amount" className="rounded-lg py-1 px-1 w-[350px] transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[180px] md:w-[340px] md:mx-[200px] md:my-2 " placeholder="100" type="number" onChange={function(e){setAmount(e.target.value)}}></input>
                                </div>

                                {errors.amount ? <div className="mx-1 font-normal text-sm text-gray-800 md:text-lg md:font-normal md:px-[194px]"> 
                                    {errors.amount}
                                </div> : null} 

                                <div className="flex flex-col my-5 md:my-8">
                                    <label htmlFor="receiverAccountId" className="font-semibold md:flex justify-center">Account ID</label>
                                    <input id="receiverAccountId" className="rounded-lg py-1 px-1 w-[350px] transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[180px]  md:w-[340px] md:mx-[200px] md:my-2" placeholder="123456778" type="text" onChange={function(e) {setAccount(e.target.value)}}></input>
                                </div> 
                                {errors.account ? <div className="mx-4 font-normal text-sm text-gray-800 md:ml-1 md:-mt-[15px] md:text-lg md:font-normal md:px-[192px] md:-mt-[35px]"> 
                                    {errors.account}
                                </div> : null}
                        </div>

                               

                                        <div className="flex flex-col my-5 ml-4">
                                            <label htmlFor="PIN" className="font-semibold md:flex justify-center">PIN</label>
                                            <input id="PIN" className="rounded-lg py-1 px-1 w-[350px] transition delay-50 duration-200 hover:shadow-md hover:shadow-white w-[180px]  md:w-[340px] md:mx-[200px] md:my-2  " placeholder="********" type="text" onChange={function(e){setPin(e.target.value)}}></input>
                                        </div> 
                                        {errors.pin ? <div className="mx-4 font-normal text-sm text-gray-800 md:pl-[200px] md:text-xl md:-mt-[20px] md:font-normal lg:ml-[15px]"> 
                                            {errors.pin}
                                        </div> : null}


                                        <div className="flex justify-center my-20 mr-4">
                        <button className="bg-black text-white w-full rounded-3xl h-[45px] mx-6 transition delay-50 duration-200 hover:scale-110 hover:shadow-md hover:shadow-white md:w-[180px] md:ml-[45px]" onClick={handleSubmit}> Transfer Money</button>
                        </div>
                        
                        <div className="text-center mt-2">
                                {transferError ? (
                                <span className="text-gray-800 font-bold">{transferError}</span>
                                ) : null}
                        </div>       
                                </div>            
            
       </div>
    )
}