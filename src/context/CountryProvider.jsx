import useLocalStorage from "@/hooks/useLocalStorage";
import CountryContext from "./CountryContext";

export default function CountryProvider({ children }) {
  const [countries, setCountries] = useLocalStorage("weather", {
    units: "metric",
    language: "en",
    lat: process.env.NEXT_PUBLIC_LAT,
    lon: process.env.NEXT_PUBLIC_LON,
  });

  return (
    <CountryContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountryContext.Provider>
  );
}
