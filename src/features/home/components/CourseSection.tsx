import { Text } from '@rneui/themed';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import { CourseSectionType } from '../../../types/CourseSectionType';
import FeaturedCourse from './FeaturedCourse';

type CourseSectionProps = {
  content: CourseSectionType;
  navigation: any;
};

const CourseSection = ({ content, navigation }: CourseSectionProps) => {
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

const CourseSectionView = styled(View)`
  margin-top: 16px;
  margin-bottom: 12px;
  // background-color: #cec;
  // border: 2px solid red;
`;

export default CourseSection;
