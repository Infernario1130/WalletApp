import phone from "../../assets/phone.png";
import car from "../../assets/car.png";

export function ActivityCard() {
    
    return(
    <div className="w-1/2 md:w-1/4 rounded-xl shadow-md shadow-gray-800  transition delay-50 duration-300 hover:scale-110 hover:bg-white-800 hover:shadow-violet-800">
        <div className="flex justify-between pl-2">
            <div className="font-semibold text-md">
                Activities
            </div>

            <div className="font-light text-sm ml-6 pt-1 pr-2">
                See all
            </div>
        </div>
        <div className="flex flex-col pt-3 pl-1">
            <div className="flex justify-around">
                <div className="rounded-full bg-white">
                    <img src={phone} className="w-6"></img>
                </div>

                <div className="font-serif">
                    Mobile Bills
                </div>

                <div className="font-serif">
                    $50
                </div>
            </div>


            <div className=" flex justify-around pt-2 pr-1">
                <div className="rounded full w-10">
                    <img src={car}></img>
                </div>

                <div className="font-serif">
                    Motor Serv.
                </div>

                <div className="font-serif">
                    $30
                </div>
            </div>
        </div>
    </div>
    )
}