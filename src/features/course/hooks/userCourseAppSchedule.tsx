import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';

const userCourseAppSchedule = (userEmail: string) => {
    const [listSchedule, setUserSchedule] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const readuserchedule = () => {
        console.log('Load schedule for user ', userEmail);
        const params = { user: userEmail };
        userClient
            .get('/user-schedule', { params })
            .then(response => {
                console.log(
                    'Course User %s schedule for %s',
                    userEmail,
                    response.data,
                );
                setUserSchedule(response.data);
                setRefreshing(false);
            })
            .catch(error => {
                console.log('Error:', error);
                setRefreshing(false);
            });
    };
    // const onDataRefresh = () => {
    //     setRefreshing(true);
    //     readuserschedule();
    // };

    useEffect(() => {
        readuserchedule();
    }, []);

    return [listSchedule, refreshing];
};
export default userCourseAppSchedule;
