/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { CourseContainer } from '../../../../style';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import onRefresh from '../../../components/onRefresh';
import Course from '../components/Course';
import useCourse from '../hooks/useCourse';

const ListCourse = ({ route, navigation }) => {
  const [courses, errorMessage, isLoading, refreshing, onDataRefresh] = useCourse(route.params.code);
  const renderCourseCard = ({ item }) => (
    <Course course={item} navigation={navigation} />
  );

  const loadCourses = () => {
    navigation.setOptions({
      title: route.params.title,
    });
  };

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
    return errorMessage === '' ? renderCourseList() : skillMessage();
  };

  const renderCourseList = () => {
    return (
      <ScrollView
           refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onDataRefresh} />
           }>
        <FlatList
          data={courses}
          showsVerticalScrollIndicator={false}
          renderItem={renderCourseCard}
          keyExtractor={item => item.course_id}
        />
      </ScrollView>
    );
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <CourseContainer>
      {isLoading ? skillActivityIndicator() : displayResult()}
    </CourseContainer>
  );
};

export default ListCourse;
