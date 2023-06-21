import { Card } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
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
import Global from '../../../utils/Global';
import { courseVideo } from '../../../utils/Video';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';
const CourseDetail = ({ route, course }) => {
  const [courseDetail, errorMessage, isLoading, refreshing, onDataRefresh] = useCourseDetail(
    route.params.id,
  );
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

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
  const onSeek = (seek) => {
    videoPlayer.current.seek(seek);
  };
  const onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    if (!isVideoLoading && playerState !== PLAYER_STATES.PLAYING) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  const displayResult = () => {
    return errorMessage === '' ? renderCourseCard() : skillMessage();
  };
  const isVideoDisabled = (courseDetail) => {
    return courseDetail.Recorded !== Global.Constant.CourseMode.Recorded;
  };

  const renderCourseCard = () => {
    return (
      <ScrollView>
        <Card>
          <View>
            <Video
              source={{
                uri: courseVideo(courseDetail.video)
              }}
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              onProgress={onProgress}
              paused={paused}
              ref={videoPlayer}
              volume={10}
              rotateToFullScreen={true}
              tapAnywhereToPause
              style={styles.mediaplayer} />

            <MediaControls
              duration={duration}
              isLoading={isVideoLoading}
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              progress={currentTime}
              // toolbar={renderToolbar()}
              mainColor="#333"
            />
          </View>
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
  mediaplayer: {
    width: 350,
    height: 150,
    backgroundColor: 'white',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
