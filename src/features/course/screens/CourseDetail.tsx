import { Card } from '@rneui/themed';
import { RefreshControl, ScrollView, View } from 'react-native';
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailModeView,
  CoursePriceView,
  CourseTitle,
  FlexView,
  FrequencyView,
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import CourseVideo from '../../../components/CourseVideo';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import Global from '../../../utils/Global';
import shLogger from '../../../utils/Loggers';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';
const CourseDetail = ({ route, course }) => {
  const [courseDetail, errorMessage, isLoading, refreshing, onDataRefresh] =
    useCourseDetail(route.params.id);
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
  const isRecordedCourse = courseMode => {
    shLogger.debug(
      'isRecordedCourse : ',
      courseMode,
      Global.Constant.CourseMode.Recorded,
    );
    return courseMode === Global.Constant.CourseMode.Recorded;
  };

  const renderCourseCard = () => {
    return (
      <ScrollView>
        <Card>
          <View>
            {isRecordedCourse(courseDetail.mode) && (
              <CourseVideo courseVideo={courseDetail.video} />
            )}
          </View>
          <View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onDataRefresh}
                />
              }>
              {/* <CourseDetailImage
                source={{
                  uri: courseImage(courseDetail.image)
                }}
              /> */}
              <CourseTitle>{courseDetail.title}</CourseTitle>
              <FlexView direction="row">
                <FlexView direction="column">
                  <CourseDesc>{courseDetail.desc}</CourseDesc>
                  <CourseAuthor>{courseDetail.author}</CourseAuthor>
                  <FrequencyView>
                    <CourseFrequency course={courseDetail} />
                  </FrequencyView>
                  <CoursePriceView>
                    <CoursePrice course={courseDetail} />
                  </CoursePriceView>
                </FlexView>
                {/* <Text>{courseDetail.price}</Text> */}
                <CourseDetailModeView>
                  <CourseMode course={courseDetail} />
                </CourseDetailModeView>
              </FlexView>
            </ScrollView>
          </View>
        </Card>

        <Card>
          <CourseAppSchedule course={courseDetail} />
        </Card>
      </ScrollView>
    );
  };

  return <View>{isLoading ? skillActivityIndicator() : displayResult()}</View>;
};

export default CourseDetail;
