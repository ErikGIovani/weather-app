import {
  FaSun,
  FaMoon,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaTint,
} from "react-icons/fa";

import useDarkMode from "@/hooks/useDarkMode";
import useWeather from "@/hooks/useWeather";
import useLanguages from "@/hooks/useLanguages";
import icons from "@/utils/icons";
import styles from "./Content.module.css";
import useDate from "@/hooks/useDate";

export default function Content() {
  const { mode, toggleMode } = useDarkMode();
  const { invertedUnits, toggleUnits, countryDays, country, units } =
    useWeather();
  const { invertLanguage, languageToggle, language } = useLanguages();
  const { dayFunc } = useDate();

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1>Weather App</h1>
        <nav className={styles.nav}>
          <button onClick={toggleUnits}>{`°${invertedUnits}`}</button>
          <button onClick={languageToggle}>{invertLanguage}</button>
          <button onClick={toggleMode}>{mode ? <FaSun /> : <FaMoon />}</button>
        </nav>
      </header>

      <div className={styles.wrapper_country_description}>
        <div className={styles.container_country_description}>
          <p className={styles.container_country_title}>{language.min_temp}</p>
          <p className={styles.container_country_temp}>{`${
            country?.main?.temp_min?.toString().split(".")[0]
          }°${units}`}</p>
          <FaTemperatureLow className={styles.container_country_icon} />
        </div>

        <div className={styles.container_country_description}>
          <p className={styles.container_country_title}>{language.humidity}</p>
          <p
            className={styles.container_country_temp}
          >{`${country?.main?.humidity}%`}</p>
          <FaTint className={styles.container_country_icon} />
        </div>

        <div className={styles.container_country_description}>
          <p className={styles.container_country_title}>{language.max_temp}</p>
          <p className={styles.container_country_temp}>{`${
            country?.main?.temp_max.toString().split(".")[0]
          }°${units}`}</p>
          <FaTemperatureHigh className={styles.container_country_icon} />
        </div>
      </div>

      <div className={styles.wrapper_country_days}>
        {countryDays?.map((item, index) => (
          <div className={styles.container_country_days} key={index}>
            <p className={styles.container_country_days_title}>
              {dayFunc(item.dt_txt)}
            </p>
            <img
              className={styles.container_country_days_image}
              src={`icons/${icons(country?.weather?.[0].icon)}.png`}
              alt=""
            />
            <p className={styles.container_country_days_temp}>{`${
              item.main.temp.toString().split(".")[0]
            }°${units}`}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
