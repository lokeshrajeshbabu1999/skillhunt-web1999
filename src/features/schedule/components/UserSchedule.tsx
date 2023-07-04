import { Card } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'styled-components';

const UserSchedule = ({ schedule, course }) => {
  const theme = useTheme();

  return (
    <View style={styles.card_template}>
      <Card>
        {/* <Text>{course.author}</Text> */}
        <Text>{schedule.course_id}</Text>
        <Text>{schedule.user_schedule_id}</Text>
        <Text>{schedule.user_id}</Text>
        <Text>{schedule.schedule_id}</Text>
        <Text>{schedule.created_ts}</Text>
      </Card>
    </View>
  );
};
export default UserSchedule;

const styles = StyleSheet.create({
  card_template: {
    aspectRatio: 2.2,
    width: 270,
    height: 180,
    justifyContent: "flex-start",
    padding: 16,
    borderRadius: 30,
    backgroundColor: "orange",
  },
})