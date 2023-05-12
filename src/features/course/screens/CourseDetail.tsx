import { Card } from '@rneui/themed';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailImage,
  CourseDetailModeView, CoursePriceView, CourseTitle, FlexView, FrequencyView
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { courseImage } from '../../../utils/ImageUtil';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';

const CourseDetail = ({ route, course }) => {
  const [courseDetail, errorMessage, isLoading, refreshing, onDataRefresh] = useCourseDetail(
    route.params.id,
  );


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
        <><Card>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onDataRefresh} />
            }>
            <View style={styles.view}>
              <CourseDetailImage
                source={{
                  uri: courseImage(courseDetail.image),
                }} />
              {/* <Text>
                {courseDetail.header} {courseDetail.Category}
              </Text> */}
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


            </View>
          </ScrollView>
        </Card>
          <Card>
            <CourseAppSchedule course={courseDetail} />
          </Card></>
      </ScrollView>
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
