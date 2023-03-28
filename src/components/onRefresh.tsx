import { useEffect, useState } from "react";

const onRefresh = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [setDataSource] = useState([]);

    const Refresh = () => {
        console.log('seeing', Refresh)
        fetch('https://kcs3mbhdtf.execute-api.ap-south-1.amazonaws.com/Prod/course-api')
            .then((response) => response.json())
            .then((responseJson) => {
                setRefreshing(false);
                setDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
        // setRefreshing(true);
        // // console.log("refreshing")
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 100);
    };
    useEffect(() => {
        Refresh();
    }, []);
    const Refreshing = () => {
        //Clear old data of the list
        setDataSource([]);
        //Call the Service to get the latest data
        Refresh();
    };

    return [refreshing, Refreshing];
};
export default onRefresh;

