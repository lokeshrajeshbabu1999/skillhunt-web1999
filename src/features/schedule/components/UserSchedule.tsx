import { Card } from '@rneui/themed';
import { Text } from 'react-native';

const UserSchedule = ({ schedule, course }) => {
  return (
    <Card>
      {/* <Text>{course.author}</Text> */}
      <Text>{schedule.course_id}</Text>
      <Text>{schedule.user_schedule_id}</Text>
      <Text>{schedule.user_id}</Text>
      <Text>{schedule.schedule_id}</Text>
      <Text>{schedule.created_ts}</Text>
    </Card>
  );
};
export default UserSchedule;
