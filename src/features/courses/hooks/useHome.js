import React, { useEffect, useState } from "react";
import axiosCourse from "../../../api/axiosCourse";

const useHome = () => {
    const [home, setHome] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const loadHome = () => {
        setPending(true);
        axiosCourse
            .get("/home", {

            })
            .then((response) => {
                setHome(response.data);
                setPending(false);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setPending(false);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        loadHome();
    }, []);
    return [home, pending, isLoading];
};
export default useHome;
