import { useAuthenticator } from '@aws-amplify/ui-react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import userCourseAppSchedule from '../../course/hooks/userCourseAppSchedule';
import ScheduleScreen from '../../schedule/screens/ScheduleScreen';

const ListSchedule = (navigation) => {
  const { user } = useAuthenticator();
  const [listSchedule] = userCourseAppSchedule(user.attributes?.email);
  const renderCourseCard = ({ item }) => (
    <ScheduleScreen schedule={item} navigation={navigation} />
  );

  return (
    <ScrollView>
      <FlatList
        horizontal={false}
        data={listSchedule}
        renderItem={renderCourseCard}
        // keyExtractor={item => item.code}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default ListSchedule;
