import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';
const userSchedule = () => {
    const [UserSchedule, setUserSchedule] = useState([]);

    const loadSchedule = () => {
        userClient
            .get('/user-schedule')
            .then(response => {
                setUserSchedule(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log('Error :', error);
            });
    };

    useEffect(() => {
        loadSchedule();
    }, []);
    return [UserSchedule];
};

export default userSchedule;
