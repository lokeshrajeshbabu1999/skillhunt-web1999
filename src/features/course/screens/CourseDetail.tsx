import { Text, Card } from '@rneui/themed';
import useCourseDetail from '../hooks/useCourseDetail';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import {
  CourseAuthor,
  CourseContainer,
  CourseDesc,
  CourseDetailImage,
  CourseDetailModeView,
  CourseTitle,
  FlexView,
  FrequencyView,
} from '../../../../style';
import styled from 'styled-components/native';
import CourseMode from '../../../components/CourseMode';
import { courseImage } from '../../../utils/ImageUtil';
import CourseFrequency from '../../../components/CourseFrequency';
import Course from '../components/Course';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import useCourseSchedule from '../hooks/useCourseSchedule';
import { toDisplayDate } from '../../../utils/DateUtil';
import Divider from '../../../components/Divider';
import useSchedule from '../../schedule/hooks/useSchedule';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import userClient from '../../../api/userClient';

const CourseDetail = ({ route }) => {
  const [courseDetail, errorMessage, isLoading] = useCourseDetail(
    route.params.id,
  );
  const [courseSchedule] = useCourseSchedule(route.params.id);
  const { user } = useAuthenticator();
  const enrollSchedule = () => {
    // const post = { userid: user }
    console.log("schedule")
    userClient
      .post('/user-schedule', JSON.stringify({
        userid: user.username
      }),
        {
          headers: {
            'Content-Type': "application/json",
            'Accept': "application/json",
          }
        })
      .then(response => {
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
                      onPress={enrollSchedule}
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
