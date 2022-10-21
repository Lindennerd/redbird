import { FaMoon, FaRegMoon, FaRegSun, FaSun } from "react-icons/fa";
import { useTheme, Themes } from "src/context/theme.context";

export function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();

  return <button onClick={e => setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK)}>
    {theme === Themes.DARK && <FaRegSun />}
    {theme === Themes.LIGHT && <FaRegMoon />}
  </button>
}