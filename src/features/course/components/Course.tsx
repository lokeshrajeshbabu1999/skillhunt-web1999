import { Card } from '@rneui/themed';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  CardView,
  CourseAuthor,
  CourseFlex,
  CoursePriceView,
  CourseTitle,
  FlexView,
  FrequencyView,
  ListCourseImage,
  ListCourseModeView
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
            <View>
              <CourseTitle>{course.title}</CourseTitle>
              <FlexView direction="row">
                <FlexView direction="column">
                  <CourseAuthor>{course.author}</CourseAuthor>
                  <FrequencyView>
                    <CourseFrequency course={course} />
                  </FrequencyView>
                </FlexView>
                <CoursePriceView>
                  <CoursePrice course={course} />
                </CoursePriceView>
                {/* <Text>{course.price}</Text> */}
                <ListCourseModeView>
                  <CourseMode course={course} />
                </ListCourseModeView>
              </FlexView>
            </View>
          </Card>
        </ScrollView>
      </CardView>
    </TouchableOpacity>
  </CourseFlex>
);

export default Course;
