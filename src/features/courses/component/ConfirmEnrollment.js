import EmailIcon from "@mui/icons-material/Email";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CourseFrequency from "../../../component/CourseFrequency";
import CourseMode from "../../../component/CourseMode";
import CoursePrice from "../../../component/CoursePrice";
import { courseImage } from "../../../util/Media";
import useCourseDetail from "../hooks/useCourseDetail";
import useEnrollPost from "../hooks/useEnrollPost";
import useEnrollSchedule from "../hooks/useEnrollSchedule";

const ConfirmEnrollment = () => {
  const [handlePost] = useEnrollPost();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState("");
  const [enrollFailure, setEnrollFailure] = useState("");
  const router = useRouter();
  const { schedule_id } = router.query;
  const [enrollSchedule] = useEnrollSchedule(schedule_id);
  const [course, isLoading] = useCourseDetail(enrollSchedule.course_id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        router.push("/account/signin");
      });
  }, []);

  const onCancel = (params) => {
    let path = "/enrollment/" + params.schedule_id;
    router.push(path);
  };
  const onConfirm = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("User data:", user);

      const enrollmentData = {
        schedule_id: enrollSchedule.schedule_id,
        email_id: user.attributes.email,
        course_id: enrollSchedule.course_id,
      };

      const result = await handlePost(enrollmentData);

      if (result.success) {
        setEnrollSuccess(result.message);
        setEnrollFailure("");
      } else {
        setEnrollSuccess("");
        setEnrollFailure(result.message);
      }
    } catch (error) {
      setEnrollSuccess("");
      setEnrollFailure(
        "An error occurred during enrollment. You might already be enrolled in this course."
      );
      toast.error("An error occurred during enrollment.");
    }
  };

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
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <CourseMode course={course} />
                <Typography component="span" className="card-margin">
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
          <Box>
            <Divider />
          </Box>
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

  return (
    <Box>
      {isLoading ? loadSpinner() : displayResult()}
      {isAuthenticated && (
        <>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={1}
            sx={{
              ml: isMobile ? 0 : 85,
              mt: 2,
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => onCancel(enrollSchedule)}
              sx={{ mt: 1 }}
              disabled={Boolean(enrollSuccess)}
            >
              <Typography>cancel</Typography>
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              sx={{ mt: 1 }}
              disabled={Boolean(enrollSuccess)}
            >
              <EmailIcon sx={{ mr: 1 }} />
              <Typography>Confirm Enrollment</Typography>
            </Button>
          </Stack>
          {enrollFailure && (
            <Alert
              severity="error"
              sx={{ mt: 2, width: "300px", ml: 60 }}
              variant="outlined"
            >
              <AlertTitle> {enrollFailure}</AlertTitle>
            </Alert>
          )}
          {enrollSuccess && (
            <Alert
              severity="success"
              sx={{ mt: 2, width: "300px", ml: 60 }}
              variant="outlined"
            >
              <AlertTitle>
                You have successfully enrolled for this course
              </AlertTitle>
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};

export default ConfirmEnrollment;
