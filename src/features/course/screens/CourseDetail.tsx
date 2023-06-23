import { Card } from '@rneui/themed';
import { RefreshControl, ScrollView, View } from 'react-native';
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailImage,
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
import { courseImage } from '../../../utils/MediaUtil';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';

const CourseDetail = ({ route }) => {
  const [
    activeCourseDetail,
    errorMessage,
    isLoading,
    refreshing,
    onDataRefresh,
  ] = useCourseDetail(route.params.id);

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

  const displayVideo = course => {
    return (
      <View>
        <CourseVideo courseVideo={course.video} />
      </View>
    );
  };

  const displayImage = course => {
    shLogger.debug('Course : ', course);
    return (
      <CourseDetailImage
        source={{
          uri: courseImage(course.image),
        }}
      />
    );
  };
  const displayResult = () => {
    console.log('Display Result : ', activeCourseDetail);
    return errorMessage === '' && activeCourseDetail != null
      ? renderCourseCard()
      : skillMessage();
  };

  const isRecordedCourse = (courseMode: string) => {
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
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={Boolean(refreshing)}
                  onRefresh={onDataRefresh}
                />
              }>
              {isRecordedCourse(activeCourseDetail.mode)
                ? displayVideo(activeCourseDetail)
                : displayImage(activeCourseDetail)}
              {/* <CourseMedia course={activeCourseDetail} /> */}
              {/* <ImageCourse /> */}
              {/* <CourseDetailImage
                source={{
                  uri: courseImage(courseDetail.image)
                }}
              /> */}
              <CourseTitle>{activeCourseDetail.title}</CourseTitle>
              <FlexView direction="row">
                <FlexView direction="column">
                  <CourseDesc>{activeCourseDetail.desc}</CourseDesc>
                  <CourseAuthor>{activeCourseDetail.author}</CourseAuthor>
                  <FrequencyView>
                    <CourseFrequency course={activeCourseDetail} />
                  </FrequencyView>
                  <CoursePriceView>
                    <CoursePrice course={activeCourseDetail} />
                  </CoursePriceView>
                </FlexView>
                {/* <Text>{courseDetail.price}</Text> */}
                <CourseDetailModeView>
                  <CourseMode course={activeCourseDetail} />
                </CourseDetailModeView>
              </FlexView>
            </ScrollView>
          </View>
        </Card>

        <Card>
          <CourseAppSchedule course={activeCourseDetail} />
        </Card>
      </ScrollView>
    );
  };

  return <View>{isLoading ? skillActivityIndicator() : displayResult()}</View>;
};

export default CourseDetail;
