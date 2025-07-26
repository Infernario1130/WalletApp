import Confused from "../assets/Confused.png";


export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-300 to-pink-500 flex justify-center items-center flex-col ">
                
                <div className="font-bold text-5xl animate-bounce"> 
                    404-Not Found 
                </div>


                <div>
                    <img src={Confused} alt="illustraion"></img>
                </div>                
        </div>
    )
}