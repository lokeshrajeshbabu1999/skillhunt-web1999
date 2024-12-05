import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { TailSpin } from "react-loader-spinner";
import {
  CourseCard,
  CourseContainer,
  Spinner,
} from "../../../styles/Course.module";
import { courseImage } from "../../../util/Media";
import useCourse from "../hooks/useCourse";

export default function CourseList() {
  const [course, isLoading] = useCourse();
  const onEventSelect = (params) => {
    let path = "/course/" + params.course_id;
  };

  const displayResult = () => {
    return (
      <CourseContainer>
        {course.map((course) => (
          <CourseCard
            key={course.course_id}
            onClick={() => onEventSelect(course)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image={courseImage(course.image)}
                sx={{ width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {course.title}
                </Typography>
                <Typography component="span">{course.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </CourseCard>
        ))}
      </CourseContainer>
    );
  };

  const loadSpinner = () => {
    return (
      <Spinner>
        <TailSpin />
      </Spinner>
    );
  };

  return <Typography>{isLoading ? loadSpinner() : displayResult()}</Typography>;
}
