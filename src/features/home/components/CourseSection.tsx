import { Text } from '@rneui/themed';
import { FlatList } from 'react-native';
// import { CourseSectionView } from '../../../../style';
import styled from 'styled-components/native';
import FeaturedCourse from './FeaturedCourse';

const CourseSection = ({ content, navigation }) => {
  const renderCourseCard = ({ item }) => (
    <FeaturedCourse course={item} navigation={navigation} />
  );
  return (
    <CourseSectionView>
      <Text h4>{content.desc}</Text>
      <FlatList
        horizontal={true}
        data={content.courses}
        renderItem={renderCourseCard}
        keyExtractor={item => content.key + '_' + item.course_id}
        showsHorizontalScrollIndicator={false}
      />
    </CourseSectionView>
  );
};

export const CourseSectionView = styled.View`
  margin-top: 20px;
`;

export default CourseSection;
