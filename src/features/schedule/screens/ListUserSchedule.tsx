import { FlatList, RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { CourseContainer } from '../../../../style';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import UserSchedule from '../components/UserSchedule';
import useUserSchedule from '../hooks/useUserSchedule';

const ListUserSchedule = (navigation, route) => {
  // const { user } = useAuthenticator();
  const [listSchedule, errorMessage, isLoading, refreshing, onDataRefresh] =
    useUserSchedule(user.attributes!!.email);
  const renderUserSchedule = ({ item }) => <UserSchedule schedule={item} />;
  const skillActivityIndicator = () => {
    return <Loader />;
  };

  const skillMessage = () => {
    return (
      //FIXME - Create a message container
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
          renderItem={renderUserSchedule}
          // keyExtractor={item => item.code}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    );
  };
  return <View>{isLoading ? skillActivityIndicator() : displayResult()}</View>;
};
export default ListUserSchedule;
