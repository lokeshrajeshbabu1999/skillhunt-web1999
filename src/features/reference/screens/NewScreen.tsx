import { FlatList, Text, View } from 'react-native';
// import { CourseContainer } from '../../../../style';
// import Loader from '../../../components/Loader';
// import Message from '../../../components/Message';
import userScheduler from '../../course/hooks/useSchedule';

const NewScreen = () => {
  const [userSchedule] = userScheduler([]);
  const renderCourseCard = ({ item }) => (
    <Schedule schedule={item} />
  );
  const Schedule = ({ schedule }) => (
    <View >
      <Text >{schedule.id}</Text>
    </View>
  );

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

export default NewScreen;
