

export function AppBar() {
    return(
        <div className="bg-blue-500 w-5/6 h-14 mt-4 mx-24 rounded-2xl flex justify-between">
            <div className=" font-bold mx-8 my-4">
                    Wally
             </div>
         <div className="my-4 mr-6 flex justify-around">
            <div className="mr-8">Sign-up</div>
             <div className="mr-8">Sign-in</div>
             <div>Contact us</div>
         </div>
         </div>
        )
    }