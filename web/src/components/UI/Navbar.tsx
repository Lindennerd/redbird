import { Link, routes } from "@redwoodjs/router"
import { useState } from "react"
import { useTheme } from "src/context/theme.context"
import { NavbarUser } from "./NavbarUser"
import { ThemeSwitcher } from "./ThemeSwitcher"

function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)
  const onScroll = (event) => setScrollTop(event.target.scrollTop)
  return [scrollTop, { onScroll }]
}

export default function Navbar() {

  const [scrollTop, scrollProps] = useScrollTop();
  const { setTheme, theme } = useTheme();

  //TODO add scrolltop action

  return (
    <div className={`fixed top-0 z-10 h-16 w-full bg-white bg-opacity-80 p-4 dark:bg-gray-700 dark:bg-opacity-80 dark:text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <Link to={routes.home()}>Redbird</Link>
        </div>
        <ThemeSwitcher />
        <NavbarUser />
      </div>
    </div>
  )
}
