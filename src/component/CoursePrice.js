import React from 'react';
import { Chip } from '@mui/material';

const CoursePrice = ({ course }) => {
  let price = '';
  if (course.price === '0') {
    price = 'Free';
  } else {
    price = 'Rs ' + course.price;
  }
  return (
    <Chip label={price} color="primary" />
  );
};

export default CoursePrice;