import { FlatList, Text, View } from 'react-native';
import useSchedule from '../hooks/useSchedule';
import Schedule from './Schedule';

const UserSchedule = () => {
  const [userSchedule] = useSchedule([]);
  const renderCourseCard = ({ item, navigation }) => (
    <Schedule schedule={item} navigation={navigation} />
  );

  return (
    <View>
      <FlatList
        horizontal={true}
        data={userSchedule}
        renderItem={renderCourseCard}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserSchedule;
