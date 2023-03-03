import { Card, Text } from '@rneui/themed';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { courseImage } from '../../../utils/ImageUtil';
import Course from '../components/Course';
import CourseAppSchedule from '../components/CourseAppSchedule';
import useCourseDetail from '../hooks/useCourseDetail';

const CourseDetail = ({ route }) => {
  const [courseDetail, errorMessage, isLoading] = useCourseDetail(
    route.params.id,
  );
  //const [courseSchedule] = useCourseSchedule(route.params.id);
  // const { user } = useAuthenticator();
  // const [userSchedule] = useSchedule(user.attributes.email, route.params.id);
  // const enrollSchedule = schedule => {
  //   //FIXME - Write an utility method to get user email
  //   // console.log('Param schedule', schedule);
  //   userClient
  //     .post(
  //       '/user-schedule',
  //       JSON.stringify({
  //         user: user.attributes.email,
  //         course_id: courseDetail.course_id,
  //         schedule_id: schedule.schedule_id,
  //       }),
  //     )
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log('Error:', error);
  //     });
  // };

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

  // const displayNoSchedule = () => {
  //   return (
  //     <View>
  //       <Text>Allow user to show interest</Text>
  //     </View>
  //   );
  // };

  // const isButtonDisabled = schedule => {
  //   return schedule.status !== 'upcoming';
  // };

  // const isDisabled = () => {
  //   if (courseDetail.course_id === userSchedule.course_id) {
  //     console.log(courseDetail.course_id);
  //     return ("enrolled")
  //   }

  // };
  // const enrollButton = (schedule, item) => {
  //   return userSchedule ? isDisabled(item) : enrollSchedule(schedule);
  // };

  const renderCourseCard = () => {
    return (
      <>
        <Card>
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
        </Card>
        <CourseAppSchedule course={courseDetail} />
      </>
    );
  };

  // const displaySchedule = () => {
  //   return (
  //     <ScrollView>
  //       <Card>
  //         {courseSchedule.map((schedule, i) => {
  //           return (
  //             <View key={i}>
  //               <ScheduleView>
  //                 <View>
  //                   <Text style={styles.text}>
  //                     {toDisplayDate(schedule.start_date)}-{' '}
  //                     {toDisplayDate(schedule.end_date)}
  //                   </Text>
  //                   <Text>
  //                     {schedule.day}-({schedule.reps} Sessions)
  //                   </Text>
  //                   <Text>
  //                     {schedule.start_time} to {schedule.end_time} IST
  //                   </Text>
  //                 </View>
  //                 <ButtonView>
  //                   <Button
  //                     disabled={isButtonDisabled(schedule)}
  //                     title="Enroll"
  //                     onPress={enrollButton}
  //                   />
  //                 </ButtonView>
  //               </ScheduleView>
  //               <View>
  //                 <Divider />
  //               </View>
  //             </View>
  //           );
  //         })}
  //       </Card>
  //     </ScrollView>
  //   );
  // };
  return (
    <View>
      {isLoading ? skillActivityIndicator() : displayResult()}
      {/* {courseSchedule ? displaySchedule() : displayNoSchedule()} */}
    </View>
  );
};

export default CourseDetail;

// export const ScheduleView = styled.View`
//   // display: flex;
//   flex-direction: ${props => props.direction || 'row'};
//   justify-content: space-between;
//   flex-grow: ${props => props.grow || 1};
// `;

// export const ButtonView = styled.View`
//   margin-top: 20px;
// `;

const styles = StyleSheet.create({
  view: {
    paddingLeft: 15,
    display: 'flex',
  },
  text: {
    fontSize: 18,
  },
});
