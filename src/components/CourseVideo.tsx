import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import { videoUrl } from '../utils/MediaUtil';

const CourseVideo = ({ courseVideo }: { courseVideo: string }) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const onSeek = seek => {
    videoPlayer.current.seek(seek);
  };
  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    if (!isVideoLoading && playerState !== PLAYER_STATES.PLAYING) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = currentTime => setCurrentTime(currentTime);

  return (
    <View>
      <Video
        source={{
          uri: videoUrl(courseVideo),
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
        style={styles.mediaplayer}
      />

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
  );
};
export default CourseVideo;

const styles = StyleSheet.create({
  mediaplayer: {
    width: 350,
    height: 150,
    backgroundColor: 'white',
  },
});
