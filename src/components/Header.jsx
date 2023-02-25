import { FaSun, FaMoon } from "react-icons/fa";

import useDarkMode from "@/hooks/useDarkMode";
import useLanguages from "@/hooks/useLanguages";
import useWeather from "@/hooks/useWeather";
import styles from "./Header.module.css"

function Header() {
  const { mode, toggleMode } = useDarkMode();
  const { invertedUnits, toggleUnits } = useWeather();
  const { invertLanguage, languageToggle } = useLanguages();
  return (
    <header className={styles.header}>
      <h1>Weather App</h1>
      <nav className={styles.nav}>
        <button onClick={toggleUnits}>{`°${invertedUnits}`}</button>
        <button onClick={languageToggle}>{invertLanguage}</button>
        <button onClick={toggleMode}>{mode ? <FaSun /> : <FaMoon />}</button>
      </nav>
    </header>
  );
}

export default Header;