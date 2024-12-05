import { marked } from "marked";
import { useEffect, useState } from "react";
import axiosUserGuide from "../../../api/axiosUserGuide";

const useArticle = (key) => {
  const [userArticle, setUserArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadGuide = (key) => {
    axiosUserGuide
      .get("/article", {
        params: {
          key,
        },
      })
      .then((response) => {
        setUserArticle(marked(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (key) {
      loadGuide(key);
    }
  }, [key]);
  return [userArticle, isLoading];
};
export default useArticle;
