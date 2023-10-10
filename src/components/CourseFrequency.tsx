import { FrequencyText } from '../../style';
import { CourseType } from '../types/CourseType';
import Global from '../utils/Global';

type CourseFrequencyProps = {
  course: CourseType;
};

const CourseFrequency = ({ course }: CourseFrequencyProps) => {
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
        <>
          <FrequencyText>{frequencyName}</FrequencyText>
        </>
      )}
    </>
  );
};
export default CourseFrequency;
