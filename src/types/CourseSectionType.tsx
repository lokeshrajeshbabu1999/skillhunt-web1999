import { CourseType } from './CourseType';

export type CourseSectionType = {
  key: string;
  desc: string;
  courses: CourseType[];
};
