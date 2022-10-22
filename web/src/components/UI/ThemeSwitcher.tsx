import { FaMoon, FaRegMoon, FaRegSun, FaSun } from "react-icons/fa";
import { useTheme, Themes } from "src/context/theme.context";

export function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();

  function changeTheme() {
    setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK)
  }

  if(theme === Themes.DARK)
    return <button onClick={e => changeTheme()} className="w-full flex items-center gap-2 justify-start px-2 py-3 dark:hover:bg-gray-900">
      <FaRegSun />
      Light
    </button>

  else
    return <button onClick={e => changeTheme()} className="w-full flex items-center gap-2 justify-start px-2 py-3 dark:hover:bg-gray-900">
      <FaRegMoon />
      Dark
    </button>
}