import useLocalStorage from "@/hooks/useLocalStorage";
import CountryContext from "./CountryContext";

export default function CountryProvider({ children }) {
  const [countries, setCountries] = useLocalStorage("weather", {
    units: "metric",
    language: "en",
    country: process.env.NEXT_PUBLIC_COUNTRY,
  });

  return (
    <CountryContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountryContext.Provider>
  );
}
