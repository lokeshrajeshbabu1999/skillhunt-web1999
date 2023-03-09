import { Text } from '@rneui/themed';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailImage,
  CourseDetailModeView,
  CourseTitle,
  FlexView, FrequencyView
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { courseImage } from '../../../utils/ImageUtil';
import Course from '../components/Course';
import useCourseDetail from '../hooks/useCourseDetail';

const CourseDetail = ({ route }) => {
  const [courseDetail, errorMessage, isLoading] = useCourseDetail(
    route.params.id,
  );

  const skillActivityIndicator = () => {
    return <Loader />;
  };

  const skillMessage = () => {
    return (
      <CourseContainer>
        <Message type="error" text={errorMessage} />
      </CourseContainer>
    );
  };

  const displayResult = () => {
    return errorMessage === '' ? renderCourseCard() : skillMessage();
  };

  const renderCourseCard = () => {
    return (
      <ScrollView>
        <View style={styles.view}>
          <CourseDetailImage
            source={{
              uri: courseImage(courseDetail.image),
            }} />
          <Text>
            {courseDetail.header} {courseDetail.Category}
          </Text>
          <CourseTitle>{courseDetail.title}</CourseTitle>
          <FlexView direction="row">
            <FlexView direction="column">
              <CourseDesc>{courseDetail.desc}</CourseDesc>
              <CourseAuthor>{courseDetail.author}</CourseAuthor>
              <FrequencyView>
                <CourseFrequency course={Course} />
              </FrequencyView>
            </FlexView>
          </FlexView>
          <CourseDetailModeView>
            <CourseMode course={courseDetail} />
          </CourseDetailModeView>
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      {isLoading ? skillActivityIndicator() : displayResult()}
    </View>
  );
};

export default CourseDetail;


const styles = StyleSheet.create({
  view: {
    paddingLeft: 15,
    display: 'flex',
  },
});
