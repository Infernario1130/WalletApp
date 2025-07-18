import Rating from "../../assets/Rating.png"
import Ava from "../../assets/Ava.jpg";
import Avat from "../../assets/Avat.jpg";
import Avatar from "../../assets/Avatar.jpg";
import {Plus} from "lucide-react"



export function RatingCard() {
    console.log("rating")
    return(
        <div className="w-1/2 md:1/4 -mt-8 ml-6 md:px-24">
            <div>
                 <img src={Rating} className="w-24 transition delay-50 duration-300 hover:scale-110 hover:bg-white-500"></img>
            </div>

            <div className="font-bold text-3xl -mt-8">
                8.5
            </div>
            
            <div className=" font-serif font-light text-sm">
                Users love this E-wallet.
            </div>

            <div className="flex flex-row mt-2">
                <div>
                        <img src={Ava} alt="Avatar" className="w-6 mx-1 rounded-full"></img>           
                </div>

                <div>
                         <img src={Avat} alt="Avatar" className="w-6 rounded-full"></img>
                </div>

                <div>
                         <img src={Avatar} alt="Avatar" className="w-6 mx-1 rounded-full"></img>
                </div>

                <div>
                        <Plus className="w-6 bg-lime-300 rounded-full transition delay-50 duration-300 hover:scale-110 hover:bg-lime-500"></Plus>
                </div>
            </div>
        </div>
    )
}