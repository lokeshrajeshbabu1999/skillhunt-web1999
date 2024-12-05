import { useEffect, useState } from "react";
import axiosUserGuide from "../../../api/axiosUserGuide";

// Setting staleness for 60 minutes in microseconds
const STALE_TIME = 60 * 60 * 1000;

const USER_GUIDES = "userGuides";
const USER_GUIDES_TS = "userGuidesTimestamp";
const useUserGuides = () => {
  const [userGuide, setUserGuide] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserGuides = () => {
    setIsLoading(true);

    const storedUserGuides = localStorage.getItem(USER_GUIDES);
    const storedTimestamp = localStorage.getItem(USER_GUIDES_TS);

    const isStale =
      !storedTimestamp || Date.now() - storedTimestamp > STALE_TIME;

    if (storedUserGuides && !isStale) {
      setUserGuide(JSON.parse(storedUserGuides));
      setIsLoading(false);
    } else {
      axiosUserGuide
        .get("/guide/list", {})
        .then((response) => {
          setUserGuide(response.data);
          localStorage.setItem(USER_GUIDES, JSON.stringify(response.data));
          localStorage.setItem(USER_GUIDES_TS, Date.now().toString());
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    loadUserGuides();
  }, []);

  return [userGuide, isLoading];
};

export default useUserGuides;
