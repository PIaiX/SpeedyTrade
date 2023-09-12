import { useEffect, useState } from "react";
import { getAllNews } from "../../services/news";

const useGetAllNews = () => {
  const [news, setNews] = useState({
    isLoaded: false,
    items: null,
    meta: null,
  });

  useEffect(() => {
    getAllNews({ page: 1, limit: 4, orderBy: "desc" })
      .then((res) => {
        setNews({ isLoaded: true, items: res?.data, meta: res?.meta });
      })
      .catch((error) => {
        setNews({ isLoaded: true, items: null, meta: null });
      });
  }, []);

  return { news };
};

export default useGetAllNews;
