import { Card } from "@rneui/themed";
import { Text } from 'react-native';

const ScheduleScreen = ({ schedule }) => {
    return (
        <Card>
            <Text>user</Text>
            <Text>{schedule.course_id}</Text>
            <Text>{schedule.user_schedule_id}</Text>
            <Text>{schedule.user_id}</Text>
            <Text>{schedule.schedule_id}</Text>
            <Text>{schedule.created_ts}</Text>
        </Card>
    );
};
export default ScheduleScreen;