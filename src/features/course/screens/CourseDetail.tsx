import { Card, Text } from '@rneui/themed';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
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
import onRefresh from '../../../components/Refresher';
import { courseImage } from '../../../utils/ImageUtil';
import Course from '../components/Course';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';

const CourseDetail = ({ route }) => {
  const [courseDetail, errorMessage, isLoading] = useCourseDetail(
    route.params.id,
  );
  const [refreshing] = onRefresh([]);


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
      <><Card>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} />
          }>
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
      </Card>
        <Card>
          <CourseAppSchedule course={courseDetail} />
        </Card></>
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
