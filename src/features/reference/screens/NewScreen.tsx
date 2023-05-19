import { useAuthenticator } from '@aws-amplify/ui-react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import MainSchedule from '../../course/hooks/MainSchedule';
import GetSchedule from '../../schedule/screens/GetSchedule';

const NewScreen = (navigation) => {
  const { user } = useAuthenticator();
  const [listSchedule] = MainSchedule(user.attributes?.email);
  const renderCourseCard = ({ item }) => (
    <GetSchedule schedule={item} navigation={navigation} />
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

export default NewScreen;
