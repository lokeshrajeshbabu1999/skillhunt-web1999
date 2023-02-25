import { Text, View } from 'react-native';

const Schedule = ({ schedule }) => {
  return (
    <View>
      <Text>{schedule.id}</Text>
      <Text>{schedule.courseid}</Text>
      <Text>{schedule.userid}</Text>
      <Text>{schedule.userscheduleid}</Text>
      <Text>{schedule.scheduleid}</Text>
    </View>
  );
};

export default Schedule;
