import {useState} from "react"
import { Button } from "./button"
import { Menu,X } from "lucide-react"
import { useNavigate } from "react-router-dom";

export function AppBar() {

  const navigate = useNavigate

  const [open,setOpen] = useState(false);

  function ClickHandler() {
      setOpen(!open)
  }

  return (
    <header className="bg-lime-200 w-5/6 px-4 py-2 rounded-2xl h-auto mt-1 mx-auto">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="font-bold text-xl transition delay-50 duration-300 ease-in-out hover:scale-110">
            Wally
        </div>
        
        <nav className="hidden md:flex flex-row items-center space-x-4">
          <Button onClick={function(){navigate("/signup")}}size="sm" className="transition delay-50 duration-300 ease-in-out hover:scale-110">Sign Up</Button>
          <Button onClick={function(){navigate("/signin")}} size="sm" className="transition delay-50 duration-300 ease-in-out hover:scale-110">Sign In</Button>
          <Button onClick={function(){navigate("?contact")}}size="sm" className="transition delay-50 duration-300 ease-in-out hover:scale-110">Contact Us</Button>
        </nav>

        <button onClick={function() {}}></button>

        <div className="md:hidden hover:scale-110">
          <button onClick={ClickHandler}>
            {open ? <X className="w-6 h-6 transition delay-50 duration-300 ease-in-out hover:scale-110"></X> : <Menu className="w-6 h-6 transition delay-50 duration-300 ease-in-out hover:scale-110"></Menu>}
          </button>
        </div>
      </div>
     {open ? 
      <div className="flex flex-col items-center gap-3 mt-4 md:hidden">
        <Button size="sm" className="w-11/12 max-w-xs
        transition delay-50 duration-300 ease-in-out  
        hover:scale-110">Sign-up</Button>
        <Button size="sm" className="w-11/12 max-w-xs 
        transition delay-50 duration-300 ease-in-out hover:scale-110">Sign-in</Button>
      < Button size="sm" className="w-11/12 max-w-xs
       transition delay-50 duration-300 ease-in-out hover:scale-110">Contact us
      </Button>
    </div> : null}
    </header>
  )
}
