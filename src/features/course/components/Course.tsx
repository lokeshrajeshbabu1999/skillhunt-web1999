import { Card } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import {
  CourseImage,
  CoursePriceView,
  FlexView,
  FlexWrap,
  FrequencyView,
  HomeAuthor,
  HomeTitle,
  ListCourseModeView,
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import { CourseType } from '../../../types/CourseType';
import { courseImage } from '../../../utils/MediaUtil';

type CourseProps = {
  course: CourseType;
  navigation: any;
};

const Course = ({ course, navigation }: CourseProps) => (
  <FlexWrap>
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
        <FlexView flexDirection="column">
          <HomeTitle>{course.title}</HomeTitle>
          <FlexView>
            <ListCourseModeView>
              <CourseMode course={course} />
            </ListCourseModeView>
            <FlexView flexDirection="row" flexGrow="1">
              <FlexView flexDirection="column">
                <HomeAuthor>{course.author}</HomeAuthor>
                <FrequencyView>
                  <CourseFrequency course={course} />
                </FrequencyView>
              </FlexView>
            </FlexView>
            <CoursePriceView>
              <CoursePrice course={course} />
            </CoursePriceView>
          </FlexView>
        </FlexView>
      </Card>
    </TouchableOpacity>
  </FlexWrap>
);

export default Course;
