import { Card } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import {
  CourseImage,
  CoursePriceView,
  FlexView,
  HomeAuthor,
  HomeTitle,
  ListCourseModeView,
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import { CourseType } from '../../../types/CourseType';
import { courseImage } from '../../../utils/MediaUtil';

type FeaturedCourseProps = {
  course: CourseType;
  navigation: any;
};

const FeaturedCourse = ({ course, navigation }: FeaturedCourseProps) => (
  <FeaturedCourseView>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CourseDetail', { id: course.course_id })
      }>
      <Card>
        <CourseImage
          source={{
            uri: courseImage(course.image),
          }}
        />

        <FlexView flexDirection="column" flexGrow="1">
          <HomeTitle>{course.title}</HomeTitle>
          <FlexView>
            <ListCourseModeView>
              <CourseMode course={course} />
            </ListCourseModeView>
            <FlexView flexDirection="row" flexGrow="1">
              <FlexView flexDirection="column">
                <HomeAuthor>{course.author}</HomeAuthor>
                <FlexView>
                  <CourseFrequency course={course} />
                </FlexView>
              </FlexView>
            </FlexView>
            <CoursePriceView>
              <CoursePrice course={course} />
            </CoursePriceView>
          </FlexView>
        </FlexView>
      </Card>
    </TouchableOpacity>
  </FeaturedCourseView>
);

const FeaturedCourseView = styled(View)`
  margin: 0px;
  // background-color: #cce;
  // border: 2px solid brown;
`;

export default FeaturedCourse;
