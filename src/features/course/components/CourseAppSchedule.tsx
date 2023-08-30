import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Card, Icon, ListItem } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { FlexView, ScheduleTitle } from '../../../../style';
import { CourseType } from '../../../types/CourseType';
import { ScheduleType } from '../../../types/ScheduleType';
import { dbToUIDate, toDay } from '../../../utils/DateUtil';
import useCourseSchedule from '../hooks/useCourseSchedule';

type CourseAppScheduleProps = {
  course: CourseType;
};

const CourseAppSchedule = ({ course }: CourseAppScheduleProps) => {
  const { user } = useAuthenticator();
  const [courseSchedule] = useCourseSchedule(course.course_id);
  // const [userSchedule] = useSchedule(course.course_id, user.attributes?.email);

  // FIXME - Move this to an UserHook (Work with Karthick)
  // const enrollSchedule = schedule => {
  //   shLogger.debug('enrollSchedule ', schedule);
  //   shLogger.debug(
  //     'CourseAppSchedule : enrollSchedule',
  //     JSON.stringify({
  //       user_id: user.attributes?.email,
  //       course_id: course.course_id,
  //       schedule_id: schedule.schedule_id,
  //     }),
  //   );
  //   userClient
  //     .post(
  //       '/user-api/user-schedule',
  //       JSON.stringify({
  //         user_id: user.attributes?.email,
  //         course_id: course.course_id,
  //         schedule_id: schedule.schedule_id,
  //       }),
  //     )
  //     .then(response => {
  //       shLogger.debug(response.data);
  //     })
  //     .catch(error => {
  //       shLogger.error('Error:', error);
  //     });
  // };

  const displayNoSchedule = () => {
    return (
      <FlexView flexDirection="row">
        <Text>
          Sorry we don&apos;t have any open schedule for this course. Let us
          know if you would be interested in taking this course.
        </Text>
      </FlexView>
    );
  };

  // const isButtonDisabled = schedule => {
  //   return schedule.status !== Global.Constant.Enroll.Status;
  // };

  // const isDisabled = () => {
  //   if (course.course_id === userSchedule.course_id) {
  //     shLogger.debug(course.course_id);
  //     return 'enrolled';
  //   }
  // };

  // const enrollButton = (schedule, item) => {
  //   shLogger.debug('enrollButton : ', schedule);
  //   return userSchedule ? isDisabled(item) : enrollSchedule(schedule);
  // };

  const displaySchedule = () => {
    return (
      <ListView>
        <Card containerStyle={styles.schedule}>
          {courseSchedule &&
            courseSchedule.map((schedule: ScheduleType, index: number) => (
              <ListItem
                key={index}
                bottomDivider
                containerStyle={styles.listitem}>
                <ListItem.Content>
                  <ListItem.Title>
                    <ScheduleTitle>
                      {dbToUIDate(schedule.start_date)}
                      {dbToUIDate(schedule.end_date)}
                    </ScheduleTitle>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text>
                      {toDay(schedule.day)} ({schedule.start_time} -{' '}
                      {schedule.end_time})
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                  name="form-select"
                  type="material-community"
                  color="grey"
                />
              </ListItem>
            ))}
        </Card>
      </ListView>
      // <ScrollView>
      //   <Card>
      //     {courseSchedule.map((schedule, i) => {
      //       return (
      //         <View key={i}>
      //           <ScheduleView>
      //             <ButtonView>
      //               <Button
      //                 disabled={isButtonDisabled(schedule)}
      //                 title="Enroll"
      //                 onPress={() => (
      //                   shLogger.debug('Schedule Param :', schedule),
      //                   enrollSchedule(schedule)
      //                 )}
      //               />
      //             </ButtonView>
      //           </ScheduleView>
      //         </View>
      //       );
      //     })}
      //   </Card>
      // </ScrollView>
    );
  };

  return (
    <View>{courseSchedule ? displaySchedule() : displayNoSchedule()}</View>
  );
};

export default CourseAppSchedule;

export const ListView = styled(View)`
  margin: 4px;
  // border: 2px solid #a99;
`;

const styles = StyleSheet.create({
  listitem: {
    padding: 8,
  },
  schedule: {
    padding: 0,
  },
});
