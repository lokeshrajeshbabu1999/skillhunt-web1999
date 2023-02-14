import userApi from "../../../api/userApi";
import { useEffect, useState } from 'react';


const userScheduler = (userid:number) => {
    const [userSchedule, setUserSchedule] = useState([]);

    const loaduserSchedule = () => {
        userApi
            .get('/user-schedule')
            .then(response => {
                setUserSchedule(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };
    useEffect(() => {
        loaduserSchedule();
    }, []);
    return [userSchedule]
};
export default userScheduler;
