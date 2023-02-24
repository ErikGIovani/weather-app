import {
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
import Form from "./Form";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { language } = useLanguages();
  const { country, units, handleCountryClick, handleCountryKey } = useWeather();
  const { favorites, favoriteVerify, toogleFavorite } = useFavoritesCountries();
  const { date, hours } = useDate(new Date());

  return (
    <aside className={styles.sidebar}>
      <Form />

      <img
        className={styles.image}
        src={`icons/${icons(country?.weather?.[0].icon)}.png`}
        alt=""
      />

      <div className={styles.weather}>
        <p className={styles.temp}>
          {`${country?.main?.temp.toString().split(".")[0]}°${units}`}
        </p>
        <button
          className={styles.favorite_icon}
          onClick={() =>
            toogleFavorite(
              country?.name,
              country?.coord?.lat,
              country?.coord?.lon
            )
          }
        >
          {favoriteVerify(country?.name, country?.coord.lat) ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
        </button>
        <p
          className={styles.country}
        >{`${country?.name}, ${country?.sys.country}`}</p>

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
            <p className={styles.description}>{hours}</p>
          </div>

          <div className={styles.wrapper_description}>
            <FaCalendar className={styles.description} />
            <p className={styles.description}>{date}</p>
          </div>
        </div>

        <hr />

        <div className={styles.container_favorites}>
          {favorites?.length > 0 ? (
            favorites?.map((item) => (
              <p
                tabindex="0"
                onKeyDown={(e) => handleCountryKey(e, item.lat, item.lon)}
                onClick={() => handleCountryClick(item.lat, item.lon)}
                className={styles.favorite_item}
                key={item.name}
              >
                {item.name}
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
