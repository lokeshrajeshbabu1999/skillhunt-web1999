import { Card } from '@rneui/themed';
import React, { useState } from 'react';
import { Button, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import Video from "react-native-video";
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailModeView, CoursePriceView, CourseTitle, FlexView, FrequencyView
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import shLogger from '../../../utils/Loggers';
import { courseVideo } from '../../../utils/Video';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';

const CourseDetail = ({ route, course }) => {
  const [courseDetail, errorMessage, isLoading, refreshing, onDataRefresh] = useCourseDetail(
    route.params.id,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = React.useState(false);
  const skillActivityIndicator = () => {
    return <Loader />;
  };
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

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
  // const isVideoDisabled = courseDetail => {
  //   return courseDetail.Recorded !== Global.Constant.CourseMode.Recorded;
  // };
  const onLoadStart = () => {
    shLogger.debug('onLoadStart:', onLoadStart)
  }
  const onProgress = () => {
    shLogger.debug('onProgress:', onProgress)
  }
  const onError = () => {
    shLogger.debug('onError:', onError)
  }
  const onBuffer = () => {
    shLogger.debug('onBuffer:', onBuffer)
  }
  const onLoadEnd = () => {
    shLogger.debug('onLoadEnd:', onLoadEnd)
  }

  const renderCourseCard = () => {
    return (
      <ScrollView>
        <Card>
          <Button
            onPress={() => setIsPlaying(p => !p)}
            title={isPlaying ? 'Stop' : 'Play'}
          />
          {/* <Button
            onPress={() => setIsMuted(m => !m)}
            name={isMuted ? 'Unmute' : 'Mute'}
          /> */}
          <Video autoplay="true" source={{ uri: courseVideo(courseDetail.video) }}
            controls
            // display={isVideoDisabled(courseDetail)}
            rotateToFullScreen={true}
            // muted={!ismuted}
            resizeMode="cover"
            repeat={true}
            onLoad={onLoadEnd}
            onLoadStart={onLoadStart}
            onBuffer={onBuffer}
            onError={onError}
            onProgress={onProgress}
            tapAnywhereToPause
            paused={!isPlaying}
            style={styles.backgroundVideo}
          />
          <View>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onDataRefresh} />
              }>
              {/* <CourseDetailImage
                source={{
                  uri: courseImage(courseDetail.image), 
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
      </ScrollView >
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
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: 340,
    height: 150,
  },
});
