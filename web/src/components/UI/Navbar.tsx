import { Link, routes } from "@redwoodjs/router"
import { NavbarUser } from "./NavbarUser"

export default function Navbar() {

  return (
    <div className="fixed top-0 h-16 w-full border border-primary bg-primary p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <Link to={routes.home()}>Redbird</Link>
        </div>
        <NavbarUser />
      </div>
    </div>
  )
}
