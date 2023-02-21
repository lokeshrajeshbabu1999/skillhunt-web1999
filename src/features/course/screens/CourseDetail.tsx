import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Card, Text } from '@rneui/themed';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailImage,
  CourseDetailModeView,
  CourseTitle,
  FlexView,
  FrequencyView
} from '../../../../style';
import userClient from '../../../api/userClient';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import Divider from '../../../components/Divider';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { toDisplayDate } from '../../../utils/DateUtil';
import { courseImage } from '../../../utils/ImageUtil';
import Course from '../components/Course';
import useCourseDetail from '../hooks/useCourseDetail';
import useCourseSchedule from '../hooks/useCourseSchedule';

const CourseDetail = ({ route }) => {
  const [courseDetail, errorMessage, isLoading] = useCourseDetail(
    route.params.id,
  );
  const [courseSchedule] = useCourseSchedule(route.params.id);
  const { user } = useAuthenticator();
  const enrollSchedule = schedule => {
    //FIXME - Write an utility method to get user email
    // console.log('Param schedule', schedule);
    userClient
      .post(
        '/user-schedule',
        JSON.stringify({
          user: user.username,
          course_id: courseDetail.course_id,
          schedule_id: schedule.schedule_id,
        }),
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };
  const getSchedule = (schedule) => {
    userClient
      .get('/user-schedule')
      .then(response => {
        (response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

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

  const displayResult = () => {
    return errorMessage === '' ? renderCourseCard() : skillMessage();
  };

  const displayNoSchedule = () => {
    return (
      <View>
        <Text>Allow user to show interest</Text>
      </View>
    );
  };
  // const enrollSchedule = () => {
  //   const userid = user.username as string;
  //   return (addSchedule[userid]);
  // }

  const isButtonDisabled = schedule => {
    return schedule.status !== 'upcoming';
  };

  const renderCourseCard = () => {
    return (
      <ScrollView>
        <View style={styles.view}>
          <CourseDetailImage
            source={{
              uri: courseImage(courseDetail.image),
            }}
          />
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
    );
  };

  const displaySchedule = () => {
    return (
      <ScrollView>
        <Card>
          {courseSchedule.map((schedule, i) => {
            return (
              <View key={i}>
                <ScheduleView>
                  <View>
                    <Text style={styles.text}>
                      {toDisplayDate(schedule.start_date)}-{' '}
                      {toDisplayDate(schedule.end_date)}
                    </Text>
                    <Text>
                      {schedule.day}-({schedule.reps} Sessions)
                    </Text>
                    <Text>
                      {schedule.start_time} to {schedule.end_time} IST
                    </Text>
                  </View>
                  <ButtonView>
                    <Button
                      disabled={isButtonDisabled(schedule)}
                      title="Enroll"
                      onPress={() => enrollSchedule(schedule)}
                    />
                  </ButtonView>
                </ScheduleView>
                <View>
                  <Divider />
                </View>
              </View>
            );
          })}
        </Card>
      </ScrollView>
    );
  };
  return (
    <View>
      {isLoading ? skillActivityIndicator() : displayResult()}
      {courseSchedule ? displaySchedule() : displayNoSchedule()}
      {getSchedule() ? skillActivityIndicator() : displayResult}
    </View>
  );
};


export default CourseDetail;

export const ScheduleView = styled.View`
  // display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: space-between;
  flex-grow: ${props => props.grow || 1};
`;

export const ButtonView = styled.View`
  margin-top: 20px;
`;

const styles = StyleSheet.create({
  view: {
    paddingLeft: 15,
    display: 'flex',
  },
  text: {
    fontSize: 18,
  },
});
