import {AppBar} from "../components/ui/AppBar"
import { SubHeading } from "../components/ui/SubHeading"
import {Heading} from "../components/ui/Heading"
import {PhoneCard} from "../components/ui/PhoneCard"
import {ActivityCard} from "../components/ui/ActivityCard"
import { RatingCard } from "../components/ui/RatingCard"
import { AboutUsCard } from "../components/ui/AboutUsCard"
import {Lock} from "lucide-react";
import {Globe} from "lucide-react";
import Smart from "../assets/Smart.png";

export default function Landing() {
    return(
        <>
            <AppBar/>
            <SubHeading text="E-WALLET & PAYMENT GATEWAY"/>
            <Heading text="Send Money Seamlessly!"/>
            <PhoneCard/>
            <div className="flex justify-around">
                <ActivityCard/>
                <RatingCard/>
            </div>
            <div className="bg-gray-100 mt-4 rounded-lg">
                <div className="flex flex-start mx-4">
                    <SubHeading text="ABOUT US"/>
                </div>
                <div className="mx-4">
                    <Heading text="Building the Future of Digital Payments"/>
                </div>
                <div className="flex justify-center">
                    <AboutUsCard text1="Secure & reliable" text2="Bank-grade protection." Icon={Lock}/>
                </div>
                <div className="flex justify-center">
                    <AboutUsCard text1="Global Support" text2="Supported across globe." Icon={Globe}/>
                </div>
                 <div class="relative flex justify-center items-center h-80 mt-20 bg-gray-100">

                    <div class="absolute w-[340px] h-[180px] bg-purple-500 rounded-[40px] blur-2xl z-0"></div>                    
                    <img src={Smart} alt="Phone" class="relative z-10 w-[300px] transition delay-50 duration-200 hover:scale-110 " />
                    </div>
                 </div>
                                                            
        </>
    )
} 