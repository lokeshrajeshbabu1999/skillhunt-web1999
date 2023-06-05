import { Card } from "@rneui/themed";
import { Text, View } from 'react-native';

const ScheduleScreen = ({ schedule, course }) => {
    return (
        <Card>
            <View>{course.author}</View>
            <Text>{schedule.course_id}</Text>
            <Text>{schedule.user_schedule_id}</Text>
            <Text>{schedule.user_id}</Text>
            <Text>{schedule.schedule_id}</Text>
            <Text>{schedule.created_ts}</Text>
        </Card>
    );
};
export default ScheduleScreen;