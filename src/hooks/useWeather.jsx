import { useState, useEffect, useContext } from "react";
import { useDebounce } from "@reactuses/core";

import CountryContext from "@/context/CountryContext";

export default function useWeather() {
  const { countries, setCountries } = useContext(CountryContext);
  const [country, setCountry] = useState(null);
  const [nextCountry, setNextCountry] = useState(null);
  const [location, setLocation] = useState(null);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const debouncedValue = useDebounce(value, 1000);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_API_KEY}&lat=${countries.lat}&lon=${countries.lon}&units=${countries.units}&lang=${countries.language}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        setLoading(false);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.NEXT_PUBLIC_API_KEY}&lat=${countries.lat}&lon=${countries.lon}&units=${countries.units}&lang=${countries.language}`
    )
      .then((response) => response.json())
      .then((data) => setNextCountry(data));
  }, [countries]);

  const clickSearchCountry = (lat, lon) => {
    setCountries({ ...countries, lat, lon });
    setActive(false);
  };

  const units = countries.units === "metric" ? "C" : "F";
  const invertedUnits = countries.units === "metric" ? "F" : "C";

  const toggleUnits = () => {
    setLoading(true);
    if (countries.units === "metric") {
      setCountries({ ...countries, units: "imperial" });
    } else {
      setCountries({ ...countries, units: "metric" });
    }
  };

  const handleCountryClick = (lat, lon) => {
    setLoading(true);
    setCountries({ ...countries, lat, lon });
  };

  const handleCountryKey = (e, lat, lon) => {
    const enter = 13;
    const spacebar = 32;

    if (e.keyCode == enter || e.keyCode == spacebar) {
      setLoading(true);
      setCountries({ ...countries, lat, lon });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    debouncedValue;
  };

  const handleChange = (e) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?appid=${
        process.env.NEXT_PUBLIC_API_KEY
      }&q=${e.target.value.toLowerCase()}&limit=10`
    )
      .then((response) => response.json())
      .then((countryLocation) => setLocation(countryLocation));
      setActive(true);
  };

  return {
    handleChange,
    handleSubmit,
    toggleUnits,
    handleCountryClick,
    handleCountryKey,
    clickSearchCountry,
    active,
    location,
    country,
    countryDays: nextCountry?.list.filter(
      (item) => item.dt_txt.split(" ")[1].split(":")[0] == 12
    ),
    loading,
    units,
    invertedUnits,
  };
}
