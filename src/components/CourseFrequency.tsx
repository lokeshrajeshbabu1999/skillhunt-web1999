import { Badge } from '@rneui/themed';
import { Text } from 'react-native';
import { FlexView, PriceView } from '../../style';
import Global from '../utils/Global';

const CourseFrequency = ({ course }) => {
  let frequencyName = null;
  switch (course.frequency) {
    case Global.Constant.CourseFrequency.Recurring:
      frequencyName = 'recurring';
      break;
    case Global.Constant.CourseFrequency.Multi:
      frequencyName = course.frequency;
      break;
    default:
      frequencyName = '1 Session';
      break;
  }

  const getPrice = (courseInput: { price: string }) => {
    let price = '';
    if (courseInput.price) {
      if (courseInput.price === 'Free') {
        price = 'Free';
      } else {
        price = 'Rs ' + courseInput.price;
      }
    }
    return price;
  };

  const displayPriceBadge = (courseInput: { price: any }) => {
    return courseInput.price ? <Badge value={getPrice(courseInput)} /> : <></>;
  };

  return (
    <FlexView>
      <Text>{frequencyName}</Text>
      <PriceView>{displayPriceBadge(course)}</PriceView>
    </FlexView>
  );
};

// export const ErrorMessageView = styled.Badge`
//   align-items: center;
//   flex: 1;
// `;

export default CourseFrequency;
