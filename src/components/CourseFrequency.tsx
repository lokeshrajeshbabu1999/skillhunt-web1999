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

  const getPrice = (courseInput: { price: string }) => {
    let price = '';
    if (courseInput.price) {
      if (courseInput.price === 'Free') {
        price = 'Free';
      } else {
        price = courseInput.price;
      }
    }
    if (courseInput.price) {
      if (courseInput.price === '200') {
        price = 'Rs 200';
      } else {
        price = courseInput.price;
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

export default CourseFrequency;
