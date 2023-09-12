import { useEffect, useState } from "react";
import { getCatalogAllGames } from "../../services/catalog";

const useGetCatalogAllGame = () => {
  const [allGames, setAllGames] = useState({
    isLoaded: false,
    items: null,
  });

  useEffect(() => {
    getCatalogAllGames()
      .then((res) => {
        setAllGames({ isLoaded: true, items: res });
      })
      .catch();
  }, []);

  return { allGames };
};

export default useGetCatalogAllGame;
