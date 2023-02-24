import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

import useWeather from "@/hooks/useWeather";
import useLanguages from "@/hooks/useLanguages";
import styles from "./Form.module.css";

function Form() {
  const { language } = useLanguages();
  const {
    handleChange,
    location,
    clickSearchCountry,
    active,
    handleCountryKey,
  } = useWeather();

  return (
    <form className={styles.form}>
      <div className={styles.icon}>
        <FaSearch />
      </div>
      <input
        onChange={handleChange}
        className={styles.input}
        type="text"
        placeholder={language?.search_message}
      />
      <p className={styles.button}>
        <FaMapMarkerAlt />
      </p>
      {active && location?.length > 0 ? (
        <div className={styles.search_suggestions}>
          {location?.map((item, index) => (
            <p
              className={styles.item}
              tabindex="0"
              onClick={() => {
                clickSearchCountry(item.lat, item.lon);
                document.querySelector("form").reset();
              }}
              onKeyDown={(e) => {
                handleCountryKey(e, item.lat, item.lon);
                document.querySelector("form").reset();
              }}
              key={index}
            >{`${item.name}, ${item.country}`}</p>
          ))}
        </div>
      ) : null}
    </form>
  );
}

export default Form;
