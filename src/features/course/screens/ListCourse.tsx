import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { CourseContainer, SpacedFlatList } from '../../../../style';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import Course from '../components/Course';
import { CourseStackParamList } from '../components/CourseStack';
import useCourse from '../hooks/useCourse';

type ListCourseProps = StackScreenProps<CourseStackParamList, 'ListCourse'>;

const ListCourse = ({ route, navigation }: ListCourseProps) => {
  const [courses, errorMessage, isLoading, refreshing, onDataRefresh] =
    useCourse(route.params.code);
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
        <SpacedFlatList
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
