import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Linking,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CourseContainer, FlexView, ShareView } from '../../../../style';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { CourseType } from '../../../types/CourseType';
import shLogger from '../../../utils/Loggers';
import { HomeStackParamList } from '../../home/components/HomeStack';
import CourseAppSchedule from '../components/CourseAppSchedule';
import CourseDetailItem from '../components/CourseDetailItem';
import useCourseDetail from '../hooks/useCourseDetail';

type CourseDetailProps = StackScreenProps<HomeStackParamList, 'CourseDetail'>;

const CourseDetail = ({ route }: CourseDetailProps) => {
  const navigation = useNavigation();
  const [activeCourseDetail, errorMessage, isLoading] = useCourseDetail(
    route.params.id,
  );

  const skillActivityIndicator = () => {
    return <Loader />;
  };

  //FIXME - Work this out with Lokesh
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

  const generateCourseUrl = (courseId: string) => {
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

  // FIXME - Analyze and introduce
  // const displayVideo = course => {
  //   return (
  //     <View>
  //       <CourseVideo courseVideo={course.video} />
  //     </View>
  //   );
  // };

  // FIXME - Analyze impact and remove it
  // const displayImage = course => {
  //   shLogger.debug('Course : ', course);
  //   return (
  //     <CourseDetailImage
  //       source={{
  //         uri: courseImage(course.image),
  //       }}
  //     />
  //   );
  // };

  const displayCourseDetail = () => {
    shLogger.debug('Displaying course details for : ', activeCourseDetail);
    return errorMessage === '' && activeCourseDetail != null
      ? renderCourseCard(activeCourseDetail as unknown as CourseType)
      : skillMessage();
  };

  //FIXME- Analyze impact and remove it
  // const isRecordedCourse = (courseMode: string) => {
  //   shLogger.debug(
  //     'isRecordedCourse : ',
  //     courseMode,
  //     Global.Constant.CourseMode.Recorded,
  //   );
  //   return courseMode === Global.Constant.CourseMode.Recorded;
  // };

  const renderCourseCard = (course: CourseType) => {
    return (
      <ScrollView>
        <FlexView flexDirection="column" flexGrow="1">
          <CourseDetailItem
            course={course}
            navigation={navigation}></CourseDetailItem>
        </FlexView>
        <FlexView flexDirection="column" flexGrow="1">
          <CourseAppSchedule course={course} />
        </FlexView>
      </ScrollView>
    );
  };

  //FIXME - Will have to revisit this. Discuss with Lokesh
  React.useEffect(() => {
    shLogger.info(
      'CourseId received by the CourseDetail component:',
      route.params.id,
    );
    navigation.setOptions({
      headerRight: () => (
        <ShareView>
          <TouchableOpacity onPress={shareCourseDetails}>
            <Icon name="share-variant" size={24} color="white" />
          </TouchableOpacity>
        </ShareView>
      ),
    });
  }, [navigation, route.params.id]);
  return (
    <View>{isLoading ? skillActivityIndicator() : displayCourseDetail()}</View>
  );
};

export default CourseDetail;
