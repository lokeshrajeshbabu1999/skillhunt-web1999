import { Card } from '@rneui/themed';
import { Text } from 'react-native';

const UserSchedule = ({ schedule }) => {
  return (
    <Card>
      {/* <View>{course.author}</View> */}
      <Text>{schedule.course_id}</Text>
      <Text>{schedule.user_schedule_id}</Text>
      <Text>{schedule.user_id}</Text>
      <Text>{schedule.schedule_id}</Text>
      <Text>{schedule.created_ts}</Text>
    </Card>
  );
};
export default UserSchedule;
