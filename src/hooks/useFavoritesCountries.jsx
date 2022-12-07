import useLocalStorage from "./useLocalStorage";

export default function useFavoritesCountries() {
  const [favorites, setFavorites] = useLocalStorage("weather-favorites", []);

  const toogleFavorite = (name) => {
    if (favorites.includes(name?.toLowerCase())) {
      setFavorites(favorites.filter((item) => item !== name.toLowerCase()));
    } else {
      setFavorites([...favorites, name?.toLowerCase()]);
    }
  };

  const favoriteVerify = (name) => {
    return favorites.includes(name?.toLowerCase());
  };

  return { favoriteVerify, toogleFavorite, favorites };
}
