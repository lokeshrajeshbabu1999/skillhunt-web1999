import { Card } from '@rneui/themed';
import { Text } from 'react-native';
import { CourseAuthor, CourseTitle } from '../../../../style';
import shLogger from '../../../utils/Loggers';

const UserSchedule = ({ schedule }) => {
  shLogger.debug('Schedule when in UserSchedule component ', schedule);

  const { course } = schedule
  return (
    <Card>
      <CourseTitle>{course.title}</CourseTitle>
      <CourseAuthor>{course.author}</CourseAuthor>
      <Text>{schedule.course_id}</Text>
      <Text>{schedule.user_schedule_id}</Text>
      <Text>{schedule.user_id}</Text>
      <Text>{schedule.schedule_id}</Text>
      <Text>{schedule.created_ts}</Text>
    </Card>
  );
};
export default UserSchedule;

