import { Card } from '@rneui/themed';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  CourseAuthor,
  CourseImage,
  CoursePriceView,
  CourseTitle,
  FlexView,
  FlexWrap,
  FrequencyView,
  ListCourseModeView
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import { courseImage } from '../../../utils/MediaUtil';

const FeaturedCourse = ({ course, navigation }) => (
  <View>
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
          <View>
            <CourseTitle>
              <Text>{course.title}</Text>
            </CourseTitle>
            <FlexView direction="row">
              <FlexView direction="column">
                <CourseAuthor>{course.author}</CourseAuthor>
                <FrequencyView>
                  <CourseFrequency course={course} />
                </FrequencyView>
                <CoursePriceView>
                  <CoursePrice course={course} />
                </CoursePriceView>
              </FlexView>
              <ListCourseModeView>
                <CourseMode course={course} />
              </ListCourseModeView>
            </FlexView>
          </View>
        </Card>
      </TouchableOpacity>
    </FlexWrap>
  </View>
);

export default FeaturedCourse;
