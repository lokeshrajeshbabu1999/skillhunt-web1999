import { FlatList, Text, View } from 'react-native';
import useSchedule from '../hooks/useSchedule';

const UserSchedule = () => {
  const [userSchedule] = useSchedule([]);
  const renderCourseCard = ({ item }) => <Text>Text here</Text>;
  //   const Schedule = ({ schedule }) => (
  //     <View>
  //       <Text>Dummy {schedule.id}</Text>
  //     </View>
  //   );

  return (
    <View>
      <FlatList
        horizontal={true}
        data={userSchedule}
        renderItem={renderCourseCard}
        keyExtractor={item => item.userid}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserSchedule;
