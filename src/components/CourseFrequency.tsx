import { Text } from 'react-native';
import { FlexView } from '../../style';
import Global from '../utils/Global';

const CourseFrequency = ({ course }) => {
  let frequencyName = 'null';
  switch (course.frequency) {
    case Global.Constant.CourseFrequency.Recurring:
      // FIXME - Understand how to display this
      frequencyName = `${course.duration} Minutes \\ ${course.sessions} Sessions`;
      break;
    case Global.Constant.CourseFrequency.Multi:
      frequencyName = `${course.duration} Minutes \\ ${course.sessions} Sessions`;
      break;
    default:
      frequencyName = `${course.duration} Minutes`;
      break;
  }
  return (
    <>
      {course.duration !== undefined && (
        <FlexView>
          <Text>{frequencyName}</Text>
        </FlexView>
      )}
    </>
  );
};
export default CourseFrequency;
