import { useState, useContext } from "react";
import useSWR from "swr";

import CountryContext from "@/context/CountryContext";

export default function useWeather() {
  const { countries, setCountries } = useContext(CountryContext);
  const [location, setLocation] = useState(null);
  const [active, setActive] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_API_KEY}&lat=${countries.lat}&lon=${countries.lon}&units=${countries.units}&lang=${countries.language}`,
    fetcher
  );
  const nextCountry = useSWR(
    `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.NEXT_PUBLIC_API_KEY}&lat=${countries.lat}&lon=${countries.lon}&units=${countries.units}&lang=${countries.language}`,
    fetcher
  ).data;

  const clickSearchCountry = (lat, lon) => {
    setCountries({ ...countries, lat, lon });
    setActive(false);
  };

  const units = countries.units === "metric" ? "C" : "F";
  const invertedUnits = countries.units === "metric" ? "F" : "C";

  const toggleUnits = () => {
    if (countries.units === "metric") {
      setCountries({ ...countries, units: "imperial" });
    } else {
      setCountries({ ...countries, units: "metric" });
    }
  };

  const handleCountryClick = (lat, lon) => {
    setCountries({ ...countries, lat, lon });
  };

  const handleCountryKey = (e, lat, lon) => {
    const enter = 13;
    const spacebar = 32;

    if (e.keyCode == enter || e.keyCode == spacebar) {
      setCountries({ ...countries, lat, lon });
      setActive(false);
    }
  };

  const handleChange = (e) => {
  if(e.target.value.lenght === 0){
    setActive(false);
    return
  }
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
    toggleUnits,
    handleCountryClick,
    handleCountryKey,
    clickSearchCountry,
    active,
    location,
    country: data,
    countryDays: nextCountry?.list?.filter(
      (item) => item.dt_txt.split(" ")[1].split(":")[0] == 12
    ),
    loading: isLoading,
    units,
    invertedUnits,
  };
}
