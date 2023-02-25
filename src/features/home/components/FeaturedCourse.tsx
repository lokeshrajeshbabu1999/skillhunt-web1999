import { Card } from '@rneui/themed';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  CourseAuthor,
  CourseImage,
  CourseTitle,
  CourseView,
  FlexView,
  FlexWrap,
  FrequencyView
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import { courseImage } from '../../../utils/ImageUtil';

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
                {/* <Text>{course.price}</Text> */}
                <FrequencyView>
                  <CourseFrequency course={course} />
                </FrequencyView>
              </FlexView>
              <CourseView>
                <CourseMode course={course} />
              </CourseView>
            </FlexView>
          </View>
        </Card>
      </TouchableOpacity>
    </FlexWrap>
  </View>
);

export default FeaturedCourse;