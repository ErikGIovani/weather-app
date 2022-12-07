import {
  FaSearch,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaCloud,
  FaClock,
  FaCalendar,
} from "react-icons/fa";

import useWeather from "@/hooks/useWeather";
import useLanguages from "@/hooks/useLanguages";
import useFavoritesCountries from "@/hooks/useFavoritesCountries";
import useDate from "@/hooks/useDate";
import icons from "@/utils/icons";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { language } = useLanguages();
  const { country, units, handleCountryClick, handleCountryKey } = useWeather();
  const { favorites, favoriteVerify, toogleFavorite } = useFavoritesCountries();
  const { date, hours } = useDate(new Date())

  return (
    <aside className={styles.sidebar}>
      <form className={styles.form}>
        <div className={styles.icon}>
          <FaSearch />
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder={language.search_message}
        />
        <button className={styles.button} type="submit">
          <FaMapMarkerAlt />
        </button>
      </form>

      <img
        className={styles.image}
        src={`icons/${icons(country?.weather[0].icon)}.png`}
        alt=""
      />

      <div className={styles.weather}>
        <p className={styles.temp}>
          {`${country?.main.temp.toString().split(".")[0]}°${units}`}
        </p>
        <button
          className={styles.favorite_icon}
          onClick={() => toogleFavorite(country?.name)}
        >
          {favoriteVerify(country?.name) ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className={styles.country}>{`${country?.name}, ${country?.sys.country}`}</p>

        <hr />

        <div className={styles.conteainer_description}>
          <div className={styles.wrapper_description}>
            <FaCloud className={styles.description} />
            <p className={styles.description}>
              {country?.weather[0].description}
            </p>
          </div>

          <div className={styles.wrapper_description}>
            <FaClock className={styles.description} />
            <p className={styles.description}>
              {hours}
            </p>
          </div>

          <div className={styles.wrapper_description}>
            <FaCalendar className={styles.description} />
            <p className={styles.description}>
              {date}
            </p>
          </div>
        </div>

        <hr />

        <div className={styles.container_favorites}>
          {favorites?.length > 0 ? (
            favorites.map((item) => (
              <p
                tabindex="0"
                onKeyDown={(e) => handleCountryKey(e, item)}
                onClick={() => handleCountryClick(item)}
                className={styles.favorite_item}
                key={item}
              >
                {item}
              </p>
            ))
          ) : (
            <p className={styles.favorite_message}>
              {language.favorites_message}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
