const CourseFrequency = ({ course }) => {
  let courseFrequency = '';
  if (course.frequency === 'recurring') {
    // eslint-disable-next-line
    courseFrequency = course.duration + ' Minutes / ' + course.sessions + ' Sessions';

  } else if (course.frequency === 'multi') {
    // eslint-disable-next-line
    courseFrequency = course.duration + ' Minutes / ' + course.sessions + ' Sessions';

  } else {
    courseFrequency= course.duration + ' Minutes ' ;

  }
  return courseFrequency;
};

export default CourseFrequency;