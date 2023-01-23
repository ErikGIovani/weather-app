import useLocalStorage from "./useLocalStorage";

export default function useFavoritesCountries() {
  const [favorites, setFavorites] = useLocalStorage("weather-favorites", []);

  const toogleFavorite = (name, lat, lon) => {
    if (favorites?.filter((item) => item?.name == name.toLowerCase() && item?.lat == lat).length) {
      setFavorites(favorites.filter((item) => item.name !== name.toLowerCase() && item.lat !== lat));
    } else {
      setFavorites([...favorites, {name: name?.toLowerCase(), lat, lon}]);
    }
  };

  const favoriteVerify = (name, lat) => {
    return favorites?.filter((item) => item?.name == name?.toLowerCase() && item?.lat == lat).length;
  };

  return { favoriteVerify, toogleFavorite, favorites };
}
