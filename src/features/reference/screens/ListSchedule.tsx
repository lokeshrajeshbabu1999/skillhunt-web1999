import { useAuthenticator } from '@aws-amplify/ui-react-native';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { CourseContainer } from '../../../../style';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import userCourseAppSchedule from '../../course/hooks/userCourseAppSchedule';
import ScheduleScreen from '../../schedule/screens/ScheduleScreen';

const ListSchedule = (navigation, route) => {
  const { user } = useAuthenticator();
  const [listSchedule, errorMessage, isLoading, refreshing, onDataRefresh] = userCourseAppSchedule(user.attributes?.email);
  const renderCourseCard = ({ item }) => (
    <ScheduleScreen schedule={item} navigation={navigation} />
  );
  const skillActivityIndicator = () => {
    return <Loader />;
  };

  const skillMessage = () => {
    return (
      <CourseContainer>
        <Message type="error" text={errorMessage} />
      </CourseContainer>
    );
  };

  const displayResult = () => {
    return errorMessage === '' ? renderScheduleList() : skillMessage();
  };

  const renderScheduleList = () => {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onDataRefresh} />
        }>
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
  return (
    <CourseContainer>
      {isLoading ? skillActivityIndicator() : displayResult()}
    </CourseContainer>
  );
};
export default ListSchedule;
