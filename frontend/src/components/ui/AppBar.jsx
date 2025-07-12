import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function AppBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-lime-200 w-full px-4 py-3 rounded-2xl shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold">Wally</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button size="sm">Sign-up</Button>
          <Button size="sm">Sign-in</Button>
          <Button size="sm">Contact us</Button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="flex flex-col items-center gap-3 mt-4 md:hidden">
          <Button size="sm" className="w-11/12 max-w-xs">Sign-up</Button>
          <Button size="sm" className="w-11/12 max-w-xs">Sign-in</Button>
          <Button size="sm" className="w-11/12 max-w-xs">Contact us</Button>
        </div>
      )}
    </header>
  )
}
