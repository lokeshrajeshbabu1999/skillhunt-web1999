import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, Card, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import userClient from '../../../api/userClient';
import Divider from "../../../components/Divider";
import { toDisplayDate } from "../../../utils/DateUtil";
import useCourseDetail from '../hooks/useCourseDetail';
import useCourseSchedule from '../hooks/useCourseSchedule';

const CourseAppSchedule = ({ course, schedule }) => {
    console.log("courseview", course)
    const [courseDetail] = useCourseDetail(course);
    const [courseSchedule] = useCourseSchedule(schedule);
    const { user } = useAuthenticator();
    const [userSchedule] = useSchedule(user.attributes?.email, schedule);

    const enrollSchedule = (schedule: { schedule_id: any; }) => {
        console.log(enrollSchedule);
        userClient
            .post(
                '/user-schedule',
                JSON.stringify({
                    user: user.attributes.email,
                    course_id: courseDetail.course_id,
                    schedule_id: schedule.schedule_id
                }),
            )
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }
    const displayNoSchedule = () => {
        return (
            <View>
                <Text>Allow user to show interest</Text>
            </View>
        );
    };

    const isButtonDisabled = schedule => {
        return schedule.status !== 'upcoming';
    };

    const isDisabled = () => {
        if (courseDetail.course_id === userSchedule.course_id) {
            console.log(courseDetail.course_id);
            return ("enrolled")
        }
    };
    const enrollButton = (schedule, item) => {
        return userSchedule ? isDisabled(item) : enrollSchedule(schedule);
    };


    const displaySchedule = (schedule) => {
        console.log(schedule)
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
                                            onPress={enrollButton}
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
            {courseSchedule ? displaySchedule() : displayNoSchedule()}
        </View>
    );
};

export default CourseAppSchedule;

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