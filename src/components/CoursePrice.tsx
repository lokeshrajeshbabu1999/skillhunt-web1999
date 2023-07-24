import React from 'react';
import { View } from 'react-native';
import { PriceBadge } from '../../style';

type CoursePriceType = {
  course: Course
};

const CoursePrice = ({ course }: CoursePriceType) => {
  const getPrice = (courseInput: { price: string }) => {
    let price = '';
    if (courseInput.price) {
      if (courseInput.price === '0') {
        price = 'Free';
      } else {
        price = 'Rs ' + courseInput.price;
      }
    }
    return price;
  };

  const displayPriceBadge = (courseInput: Course) => {
    return courseInput.price ? <PriceBadge status='primary' value={getPrice(courseInput)} /> : <></>;
  };
  return (
    <View>{displayPriceBadge(course)}</View>
  );
};

export default CoursePrice;
