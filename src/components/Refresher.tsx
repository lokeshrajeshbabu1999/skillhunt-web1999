import { useEffect, useState } from "react";

const onRefresh = () => {
    const [refreshing, setRefreshing] = useState(false);
    const Refresh = () => {
        setRefreshing(true);
        // console.log("refreshing")
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    };
    useEffect(() => {
        Refresh();
    }, []);
    return [refreshing];
};
export default onRefresh;

