import { Badge } from '@rneui/themed';
import { Text } from 'react-native';
import { FlexView, PriceView } from '../../style';

const CourseFrequency = ({ course }) => {
  let frequencyName = null;
  switch (course.frequency) {
    case 'single':
      frequencyName = '1 Session';
      break;
    case 'multi':
      frequencyName = '4 Sessions';
      break;
    default:
      frequencyName = 'recurring';
      break;
  }

  const getPrice = course => {
    let price = '';
    if (course.price) {
      if (course.price === 'Free') {
        price = 'Free';
      } else {
        price = course.price;
      }
    }
    if (course.price) {
      if (course.price === '200') {
        price = 'Rs 200';
      } else {
        price = course.price;
      }
    }
    return price;
  };

  const displayPriceBadge = course => {
    return course.price ? <Badge value={getPrice(course)} /> : <></>;
  };

  return (
    <FlexView>
      <Text>{frequencyName}</Text>
      <PriceView>{displayPriceBadge(course)}</PriceView>
    </FlexView>
  );
};

export default CourseFrequency;
