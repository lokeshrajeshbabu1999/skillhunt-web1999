import { View, TouchableOpacity, Text } from 'react-native';
import { Card } from '@rneui/themed';
import {
  CourseAuthor,
  CourseImage,
  CourseTitle,
  FlexWrap,
  FlexView,
  FrequencyView,
  CourseView,
} from '../../../../style';
import { courseImage } from '../../../utils/ImageUtil';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';

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
              <Text>Home screen : {course.title}</Text>
            </CourseTitle>

            <FlexView direction="row">
              <FlexView direction="column">
                <CourseAuthor>
                  <Text>{course.author}</Text>
                </CourseAuthor>
                <Text>{course.price}</Text>
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
