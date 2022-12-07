import { useState, useEffect, useContext } from "react";
import { useDebounce } from "@reactuses/core";

import CountryContext from "@/context/CountryContext";

export default function useWeather() {
  const { countries, setCountries } = useContext(CountryContext);
  const [country, setCountry] = useState(null);
  const [nextCountry, setNextCountry] = useState(null);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_API_KEY}&q=${countries.country}&units=${countries.units}&lang=${countries.language}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        setLoading(false);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.NEXT_PUBLIC_API_KEY}&q=${countries.country}&units=${countries.units}&lang=${countries.language}`
    )
      .then((response) => response.json())
      .then((data) => setNextCountry(data));
  }, [countries]);

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

  const handleCountryClick = (name) => {
    setLoading(true);
    setCountries({ ...countries, country: name });
  };

  const handleCountryKey = (e, name) => {
    const enter = 13;
    const spacebar = 32;

    if (e.keyCode == enter || e.keyCode == spacebar) {
      setLoading(true);
      setCountries({ ...countries, country: name });
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    debouncedValue;
  };

  const handleChange = (e) => {
    console.log(e.target.value.toLowerCase());
  };

  return {
    handleChange,
    handleSubmit,
    toggleUnits,
    handleCountryClick,
    handleCountryKey,
    country,
    countryDays: nextCountry?.list.filter((item) => item.dt_txt.split(" ")[1].split(":")[0] == 12 ),
    loading,
    units,
    invertedUnits,
  };
}
