import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Button, Card } from '@rneui/themed';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import userClient from '../../../api/userClient';
import Divider from '../../../components/Divider';
import { toDisplayDate } from '../../../utils/DateUtil';
import Global from '../../../utils/Global';
import shLogger from '../../../utils/Loggers';
import useSchedule from '../../schedule/hooks/useSchedule';
import useCourseSchedule from '../hooks/useCourseSchedule';

const CourseAppSchedule = ({ course }) => {
  shLogger.debug('CourseAppSchedule :: Course in props ', course);
  const { user } = useAuthenticator();
  const [courseSchedule] = useCourseSchedule(course.course_id);
  const [userSchedule] = useSchedule(user.attributes?.email, course.course_id);

  const enrollSchedule = schedule => {
    shLogger.debug('enrollSchedule ', schedule);
    shLogger.debug(
      'CourseAppSchedule : enrollSchedule',
      JSON.stringify({
        user_id: user.attributes.email,
        course_id: course.course_id,
        schedule_id: schedule.schedule_id,
      }),
    );
    userClient
      .post(
        '/user-api/user-schedule',
        JSON.stringify({
          user_id: user.attributes.email,
          course_id: course.course_id,
          schedule_id: schedule.schedule_id,
        }),
      )
      .then(response => {
        shLogger.debug(response.data);
      })
      .catch(error => {
        shLogger.error('Error:', error);
      });
  };
  const displayNoSchedule = () => {
    return (
      <View>
        <Text>Allow user to show interest</Text>
      </View>
    );
  };

  const isButtonDisabled = schedule => {
    return schedule.status !== Global.Constant.Enroll.Status;
  };

  const isDisabled = () => {
    if (course.course_id === userSchedule.course_id) {
      shLogger.debug(course.course_id);
      return 'enrolled';
    }
  };

  const enrollButton = (schedule, item) => {
    shLogger.debug('enrollButton : ', schedule);
    return userSchedule ? isDisabled(item) : enrollSchedule(schedule);
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
                      onPress={() => (
                        shLogger.debug('Schedule Param :', schedule),
                        enrollSchedule(schedule)
                      )}
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
    <View>{courseSchedule ? displaySchedule() : displayNoSchedule()}</View>
  );
};

export default CourseAppSchedule;

export const ScheduleView = styled.View`
  flex-direction: ${props => props.direction || 'row'};
  justify-content: space-between;
  flex-grow: ${props => props.grow || 1};
`;

export const ButtonView = styled.View`
  margin-top: 20px;
`;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});
