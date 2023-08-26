import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { Card } from '@rneui/themed';
import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  CourseDesc,
  CoursePriceView,
  FlexView,
  FrequencyView,
  HomeAuthor,
  HomeTitle,
  ListCourseModeView,
} from '../../../../style';
import CourseFrequency from '../../../components/CourseFrequency';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import { CourseType } from '../../../types/CourseType';
import { courseImage } from '../../../utils/MediaUtil';

type CourseDetailItemProps = {
  course: CourseType;
  navigation: any;
};

const CourseDetailItem = ({ course, navigation }: CourseDetailItemProps) => (
  <CourseItemView>
    <CourseCard>
      <CardImage
        source={{
          uri: courseImage(course.image),
        }}
      />
      <FlexView flexDirection="column" flexGrow="1">
        <HomeTitle>{course.title}</HomeTitle>
        <FlexView>
          <ListCourseModeView>
            <CourseMode course={course} />
          </ListCourseModeView>
          <FlexView flexDirection="row" flexGrow="1">
            <FlexView flexDirection="column">
              <HomeAuthor>{course.author}</HomeAuthor>
              <FrequencyView>
                <CourseFrequency course={course} />
              </FrequencyView>
            </FlexView>
          </FlexView>
          <CoursePriceView>
            <CoursePrice course={course} />
          </CoursePriceView>
        </FlexView>
        <Card.Divider />
        <FlexView flexDirection="column">
          <CourseDesc>{course.desc}</CourseDesc>
        </FlexView>
      </FlexView>
    </CourseCard>
    {/* <Card>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={Boolean(refreshing)}
              onRefresh={onDataRefresh}
            />
          }>
          {isRecordedCourse(activeCourseDetail.mode)
            ? displayVideo(activeCourseDetail)
            : displayImage(activeCourseDetail)}
          <FlexView >
            <CourseDetailModeView>
              <CourseMode course={activeCourseDetail} />
            </CourseDetailModeView>
            <FlexView direction="row" >
              <FlexView direction="column">
                <CourseTitle>{activeCourseDetail.title}</CourseTitle>
                <CourseAuthor>{activeCourseDetail.author}</CourseAuthor>
                <FrequencyView>
                  <CourseFrequency course={activeCourseDetail} />
                </FrequencyView>
              </FlexView>
            </FlexView>
            <PriceBadge>
              <CoursePrice course={activeCourseDetail} />
            </PriceBadge>
          </FlexView>
        </ScrollView>
      </View>
    </Card> */}
  </CourseItemView>
);

const CourseItemView = styled(View)`
  margin: 0px;
  // background-color: #ccc;
  // border: 2px solid #a99;
`;

const CourseCard = styled(Card)`
  margin 0px;
`;

export default CourseDetailItem;
