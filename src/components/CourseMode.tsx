import { Icon } from '@rneui/themed';

const CourseMode = ({ course }) => {
  let iconName = null;
  let iconFamily = null;

  switch (course.mode) {
    case 'recorded':
      iconName = 'headphones';
      iconFamily = 'material-community';
      break;
    case 'inperson':
      iconName = 'people';
      iconFamily = 'material-community';
      break;
    default:
      iconName = 'google-classroom';
      iconFamily = 'material-community';
      break;
  }
  return <Icon name={iconName} type={iconFamily} />;
};

export default CourseMode;
