import { useNavigation } from '@react-navigation/native';
import { Card } from '@rneui/themed';
import React from 'react';
import { Linking, RefreshControl, ScrollView, Share, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailImage,
  CourseDetailModeView,
  CourseTitle,
  FlexView,
  FrequencyView,
  PriceBadge,
  ShareView
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
  const navigation = useNavigation();
  const [
    activeCourseDetail,
    errorMessage,
    isLoading,
    refreshing,
    onDataRefresh,
  ] = useCourseDetail(route.params.id);
  const theme = useTheme;
  const skillActivityIndicator = () => {
    return <Loader />;
  };
  const shareCourseDetails = () => {
    const courseUrl = generateCourseUrl(activeCourseDetail.course_id);
    console.log('Generated deep link URL:', courseUrl);
    const message = `Check out this course: ${courseUrl}`;

    Linking.openURL(courseUrl).catch(error => {
      console.error('Error opening deep link:', error);
    });
    Share.share({
      message,
    });
  };
  const generateCourseUrl = courseId => {
    // Replace 'yourapp' with the deep link scheme or hostname of your app
    const deepLink = `skillhunt://course/${encodeURIComponent(courseId)}`;
    return deepLink;
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
              <FlexView >
                <CourseDetailModeView>
                  <CourseMode course={activeCourseDetail} />
                </CourseDetailModeView>
                <FlexView direction="row" >
                  <FlexView direction="column">
                    <CourseTitle>{activeCourseDetail.title}</CourseTitle>
                    <CourseAuthor>{activeCourseDetail.author}</CourseAuthor>
                    <FrequencyView>
                      <CourseFrequency course={activeCourseDetail} />
                    </FrequencyView>
                  </FlexView>
                </FlexView>
                <PriceBadge>
                  <CoursePrice course={activeCourseDetail} />
                </PriceBadge>
              </FlexView>
              <FlexView direction="column">
                <CourseDesc>{activeCourseDetail.desc}</CourseDesc>
              </FlexView>
            </ScrollView>
          </View>
        </Card>
        <Card>
          <CourseAppSchedule course={activeCourseDetail} />
        </Card>
      </ScrollView >
    );
  };

  React.useEffect(() => {
    console.log('CourseId received by the CourseDetail component:', route.params.id);
    navigation.setOptions({
      headerRight: () => (
        <ShareView>
          <TouchableOpacity onPress={shareCourseDetails}>
            <Icon
              name="share-variant"
              size={35}
              color='white'
            />
          </TouchableOpacity>
        </ShareView>
      ),
    });
  }, [navigation, route.params.id]);
  return <View>
    {isLoading ? skillActivityIndicator() : displayResult()}
  </View>;
};

export default CourseDetail;

