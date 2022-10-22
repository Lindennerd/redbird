import { Link, routes } from "@redwoodjs/router"
import { VscMenu } from "react-icons/vsc"
import { NavbarUser } from "./NavbarUser"

export default function Navbar() {
  return (
    <div className={`fixed top-0 z-10 h-16 w-full bg-white bg-opacity-80 p-4 dark:bg-gray-700 dark:bg-opacity-80 dark:text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <VscMenu />
        </div>
        <div>
          <Link to={routes.home()}>Redbird</Link>
        </div>
        <NavbarUser />
      </div>
    </div>
  )
}
