import { Card } from '@rneui/themed';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
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
import { courseVideo } from '../../../utils/Video';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';

const CourseDetail = ({ route, course }) => {
  const [courseDetail, errorMessage, isLoading, refreshing, onDataRefresh] = useCourseDetail(
    route.params.id,
  );
  // const [isPlaying, setIsPlaying] = React.useState(false);
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

  const renderCourseCard = () => {
    return (
      <ScrollView>
        <Card>
          <Video source={{ uri: courseVideo(courseDetail.video) }}
            controls
            repeat={true}
            rotateToFullScreen={true}
            playInBackground={true}
            playWhenInactive={true}
            // muted={isMuted}
            // paused={!isPlaying}
            style={styles.backgroundVideo}
          />

          {/* <Button
            onPress={() => setIsPlaying(p => !p)}
            title={isPlaying ? 'Stop' : 'Play'}
          />
          <Button
            onPress={() => setIsMuted(m => !m)}
            title={isMuted ? 'Unmute' : 'Mute'}
          /> */}
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
