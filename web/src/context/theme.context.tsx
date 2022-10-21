import { createContext, useContext, useEffect, useState } from "react";

export enum Themes {
  DARK = 'dark',
  LIGHT = 'light'
}

const ThemeContext = createContext({
  theme: '',
  setTheme: (theme: Themes) => {}
});

export const useTheme = () =>{
  return useContext(ThemeContext);
}

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (typeof storedPrefs === 'string') {
          return storedPrefs;
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
          return Themes.DARK;
      }
  }

 return Themes.LIGHT;
};

export function ThemeProvider({children} : {children: React.ReactNode}) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove(Themes.DARK);
    document.documentElement.classList.remove(Themes.LIGHT);

    document.documentElement.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}