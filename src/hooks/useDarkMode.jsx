import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useDarkMode() {
  const [theme, setTheme] = useLocalStorage("weather-mode", "light");

  useEffect(() => {
    const body = document.querySelector("body");
    body.dataset.theme = theme;
  }, [theme]);

  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const mode = theme === "light" ? false : true;

  return { mode, toggleMode };
}
