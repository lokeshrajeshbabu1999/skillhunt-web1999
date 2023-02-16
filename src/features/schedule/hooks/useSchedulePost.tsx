import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { useEffect, useState } from 'react';
import userClient from '../../../api/userClient';

const useSchedulePost = (userid: number) => {
    const [addSchedule, setAddSchedule] = useState([]);
    const { user } = useAuthenticator();

    const loadUserSchedule = () => {
        userClient
            .post('/user-schedule',
            JSON.stringify({
              userid: user.username
            }),
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                }  
            }  
            )
            .then(response => {
                setAddSchedule(response.data);
                console.log(response.data);
                console.log("posted")
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };
    useEffect(() => {
        loadUserSchedule();
    }, []);
    return [addSchedule];
};
export default useSchedulePost;
