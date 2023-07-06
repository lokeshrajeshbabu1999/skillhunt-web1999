import { Card } from '@rneui/themed';
import { Text } from 'react-native';
import { CourseAuthor, CourseTitle } from '../../../../style';
import shLogger from '../../../utils/Loggers';

const UserSchedule = ({ schedule }) => {
  shLogger.debug('Schedule when in UserSchedule component ', schedule);

  const { course } = schedule
  return (
    // <View style={styles.card_template}>
    <Card>
      <CourseTitle>{course.title}</CourseTitle>
      <CourseAuthor>{course.author}</CourseAuthor>
      <Text>{schedule.course_id}</Text>
      <Text>{schedule.user_schedule_id}</Text>
      <Text>{schedule.user_id}</Text>
      <Text>{schedule.schedule_id}</Text>
      <Text>{schedule.created_ts}</Text>
    </Card>
    // </View>
  );
};
export default UserSchedule;

// const styles = StyleSheet.create({
//   card_template: {
//     aspectRatio: 2.2,
//     width: 270,
//     height: 180,
//     justifyContent: 'flex-start',
//     padding: 16,
//     borderRadius: 30,
//     backgroundColor: 'orange',
//   },
// });
