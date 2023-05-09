import { Text } from 'react-native';
import { FlexView } from '../../style';
import Global from '../utils/Global';

const CourseFrequency = ({ course }) => {
  let frequencyName = null;
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

  // const getPrice = (courseInput: { price: string }) => {
  //   let price = '';
  //   if (courseInput.price) {
  //     if (courseInput.price === 'Free') {
  //       price = 'Free';
  //     } else {
  //       price = 'Rs ' + courseInput.price;
  //     }
  //   }
  //   return price;
  // };

  // const displayPriceBadge = (courseInput: { price: any }) => {
  //   return courseInput.price ? <Badge value={getPrice(courseInput)} /> : <></>;
  // };

  return (
    <FlexView>
      <Text>{frequencyName}</Text>
      {/* <PriceView>{displayPriceBadge(course)}</PriceView> */}
    </FlexView>
  );
};

// export const ErrorMessageView = styled.Badge`
//   align-items: center;
//   flex: 1;
// `;

export default CourseFrequency;
