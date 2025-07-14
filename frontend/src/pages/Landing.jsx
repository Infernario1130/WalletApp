import {AppBar} from "../components/ui/AppBar"
import { SubHeading } from "../components/ui/SubHeading"
import {Heading} from "../components/ui/Heading"
import {PhoneCard} from "../components/ui/PhoneCard"

export default function Landing() {
    console.log("Landing rendering.")
    return(
        <>
            <AppBar/>
            <SubHeading text="E-WALLET & PAYMENT GATEWAY"/>
            <Heading text="Send Money Seamlessly!"/>
            <PhoneCard/>
        </>
    )
} 