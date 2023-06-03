import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';
const userSchedule = () => {
    const [UserSchedule, setUserSchedule] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadSchedule = () => {
        userClient
            .get('/user-schedule')
            .then(response => {
                setUserSchedule(response.data);
                console.log(response.data);
                setRefreshing(false);
            })
            .catch(error => {
                console.log('Error :', error);
                setRefreshing(false);
            });
    };
    const onDataRefresh = () => {
        setRefreshing(true);
        loadSchedule();
    };

    useEffect(() => {
        loadSchedule();
    }, []);
    return [UserSchedule, refreshing, onDataRefresh];
};

export default userSchedule;