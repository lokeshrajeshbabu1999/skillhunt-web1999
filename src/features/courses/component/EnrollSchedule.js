import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import CourseFrequency from "../../../component/CourseFrequency";
import CourseMode from "../../../component/CourseMode";
import CoursePrice from "../../../component/CoursePrice";
import { courseImage } from "../../../util/Media";
import useCourseDetail from "../hooks/useCourseDetail";
import useEnrollSchedule from "../hooks/useEnrollSchedule";
import EnrollButton from "./EnrollButton";

export default function EnrollSchedule() {
  const router = useRouter();
  const { schedule_id } = router.query;

  const [enrollSchedule] = useEnrollSchedule(schedule_id);
  const [course, isLoading] = useCourseDetail(enrollSchedule?.course_id);

  const displayResult = () => {

    return (
      <Container maxWidth="md">
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ width: "100%", maxHeight: 300 }}
              image={courseImage(course.image)}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {course.title}
              </Typography>
              <Typography component="span" sx={{ display: "flex", alignItems: "center" }}>
                <CourseMode course={course} />
                <Typography component="div" className="card-margin">
                  <Typography>{course.author}</Typography>
                  <CourseFrequency course={course} />
                </Typography>
                <Typography component="span" style={{ marginLeft: "auto" }}>
                  <CoursePrice course={course} />
                </Typography>
              </Typography>
              <Typography component="span" variant="body1" color="text.primary">
                {course.desc}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Divider />
          <Stack
            sx={{
              padding: "8px",
              flexDirection: "row",
            }}
          >
            <Typography component="span">
              {format(new Date(enrollSchedule.start_date), "dd MMM yyyy")} -{" "}
              {format(new Date(enrollSchedule.end_date), "dd MMM yyyy (eee)")}
            </Typography>
            <Typography sx={{ marginLeft: 2 }} component="span">
              (
              {format(
                new Date(`1970-01-01T${enrollSchedule.start_time}`),
                "hh:mm a"
              )}{" "}
              -{" "}
              {format(
                new Date(`1970-01-01T${enrollSchedule.end_time}`),
                "hh:mm a"
              )}
              )
            </Typography>
          </Stack>
        </Card>
        <Divider />
        <EnrollButton course_id={enrollSchedule?.course_id} />
      </Container>
    );
  };

  const loadSpinner = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  return <>{isLoading ? loadSpinner() : displayResult()}</>;
}
