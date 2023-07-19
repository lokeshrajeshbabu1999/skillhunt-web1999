import { Card } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import {
  CourseImage,
  FlexView,
  FlexWrap,
  FrequencyView,
  HomeAuthor,
  HomePriceBadge,
  HomeTitle,
  ListCourseModeView
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import { courseImage } from '../../../utils/MediaUtil';

const FeaturedCourse = ({ course, navigation }) => (
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

        <FlexView >
          <ListCourseModeView>
            <CourseMode course={course} />
          </ListCourseModeView>
          <FlexView direction="row" >
            <FlexView direction="column">
              <HomeTitle>{course.title}</HomeTitle>
              <HomeAuthor>{course.author}</HomeAuthor>
              <FrequencyView>
                <CourseFrequency course={course} />
              </FrequencyView>
            </FlexView>
          </FlexView>
          <HomePriceBadge>
            <CoursePrice course={course} />
          </HomePriceBadge>
        </FlexView>
      </Card>
    </TouchableOpacity>
  </FlexWrap>

);

export default FeaturedCourse;
