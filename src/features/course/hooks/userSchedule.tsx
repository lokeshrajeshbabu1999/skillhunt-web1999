import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import userApi from '../../../api/userApi';

const userSchedule = () => {
    const [UserSchedule, setUserSchedule] = useState([]);

    const loadSchedule = () => {
        userApi
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
