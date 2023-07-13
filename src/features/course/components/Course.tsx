import { Card } from '@rneui/themed';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  CardView,
  CourseAuthor,
  CourseFlex,
  CourseTitle,
  FlexView,
  FrequencyView,
  ListCourseImage,
  ListCourseModeView,
  PriceBadge
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import { courseImage } from '../../../utils/MediaUtil';

const Course = ({ course, navigation }) => (
  <CourseFlex>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CourseDetail', { id: course.course_id })
      }>
      <CardView>
        <ScrollView>
          <Card>
            <ListCourseImage
              source={{
                uri: courseImage(course.image),
              }}
            />
            <FlexView >
              <ListCourseModeView>
                <CourseMode course={course} />
              </ListCourseModeView>
              <FlexView direction="row" >
                <FlexView direction="column">
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseAuthor>{course.author}</CourseAuthor>
                  <FrequencyView>
                    <CourseFrequency course={course} />
                  </FrequencyView>
                </FlexView>
              </FlexView>
              <PriceBadge>
                <CoursePrice course={course} />
              </PriceBadge>
            </FlexView>
          </Card>
        </ScrollView>
      </CardView>
    </TouchableOpacity>
  </CourseFlex>
);

export default Course;
