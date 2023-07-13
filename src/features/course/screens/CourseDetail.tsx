import { Card } from '@rneui/themed';
import React from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View, } from 'react-native';
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
const CourseDetail = ({ route, navigation }) => {
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
              {/* <View style={{
                  flexDirection: "row",
                  margin: 5,
                }}>
                  <View style={{
                    alignItems: 'flex-start',
                  }}>
                    <CourseMode course={activeCourseDetail} />
                  </View>
                  <View style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                  }}>
                    <View>
                      <CourseTitle>{activeCourseDetail.title}</CourseTitle>
                      <CourseAuthor>{activeCourseDetail.author}</CourseAuthor>
                      <CourseFrequency course={activeCourseDetail} />
                      <CourseDesc>{activeCourseDetail.desc}</CourseDesc>
                    </View>
                  </View>
                </View>
                <View style={{
                  flexWrap: 'wrap-reverse',
                }}>
                  <CoursePrice course={activeCourseDetail} />
                </View> */}
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
    navigation.setOptions({
      headerRight: () => (
        <ShareView>
          <TouchableOpacity>
            <Icon
              name="share-variant"
              size={35}
              color='white'
              onPress={() => renderCourseCard()}
            />
          </TouchableOpacity>
        </ShareView>
      ),
    });
  }, [navigation]);
  return <View>
    {isLoading ? skillActivityIndicator() : displayResult()}
  </View>;
};

export default CourseDetail;

