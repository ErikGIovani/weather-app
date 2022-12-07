import { useContext } from "react";

import CountryContext from "@/context/CountryContext";
import languages from "@/utils/languages";

export default function useLanguages() {
  const { countries, setCountries } = useContext(CountryContext);

  const languageToggle = () => {
    if (countries.language === "en") {
      setCountries({ ...countries, language: "es" });
    } else {
      setCountries({ ...countries, language: "en" });
    }
  };

  const invertLanguage = countries.language === "en" ? "ES" : "EN";

  return {
    language: languages[countries.language],
    invertLanguage,
    languageToggle,
  };
}
