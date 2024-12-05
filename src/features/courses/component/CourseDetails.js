import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton } from "react-share";
import CourseFrequency from "../../../component/CourseFrequency";
import CourseMode from "../../../component/CourseMode";
import CoursePrice from "../../../component/CoursePrice";
import ShareCourse from "../../../component/ShareCourse";
import { ScheduleStatusId } from "../../../util/Constant";
import { courseImage } from "../../../util/Media";
import useCourseDetail from "../hooks/useCourseDetail";
import useCourseSchedule from "../hooks/useCourseSchedule";
import useShowInterest from "../hooks/useShowInterest";
import Schedule from "./Schedule";
import ShowInterest from "./ShowInterest";
import Head from "next/head";

export default function CourseDetails() {
  const router = useRouter();

  const { course_id } = router.query;
  const [course, isLoading] = useCourseDetail(course_id);
  const [courseSchedule] = useCourseSchedule(course_id);
  const { statusMessage, handleShowInterest } = useShowInterest(course_id);
  const [loading, setLoading] = useState(false);

  const handleClickShowInterest = async () => {
    setLoading(true);
    await handleShowInterest();
    setLoading(false);
  };

  const scheduleDisplay = () => {
    if (!course || !courseSchedule || courseSchedule.length === 0) {
      return (
        <ShowInterest
          handleClickShowInterest={handleClickShowInterest}
          loading={loading}
        />
      );
    }

    const activeSchedules = courseSchedule.filter((schedule) => {
      return (
        schedule.status === ScheduleStatusId.upcoming ||
        schedule.status === ScheduleStatusId.ongoing
      );
    });

    if (activeSchedules.length > 0) {
      return (
        <Box component="span">
          <Schedule course={course} schedules={activeSchedules} />
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <ShowInterest
          handleClickShowInterest={handleClickShowInterest}
          loading={loading}
        />
      </Box>
    );
  };

  const detailScreen = () => {
    const shareUrl = `${window.location.origin}/course/${course_id}`;
    const imageUrl = courseImage(course.image);

    return (
      <Container maxWidth="md">
        <Head>
          <title>{course?.title || "Course Title"}</title>
          <meta property="og:title" content={course?.title || "Course Title"} />
          <meta property="og:description" content={course?.desc || "Course Description"} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={course?.title || "Course Title"} />
          <meta name="twitter:description" content={course?.desc || "Course Description"} />
          <meta name="twitter:image" content={imageUrl} />
        </Head>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ width: "100%", maxHeight: 300 }}
              image={courseImage(course.image)}
            />
          </CardActionArea>

          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" component="div">
                  {course.title}
                </Typography>
              </Grid>
              <Grid item>
                <Box display="flex" gap={2}>
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <ShareCourse shareUrl={shareUrl} />
                </Box>
              </Grid>
            </Grid>
            <Typography component="span" sx={{ display: "flex", alignItems: "center" }}>
              <CourseMode course={course} />
              <Box className="card-margin" component="div">
                <Typography component="div">{course.author}</Typography>
                <CourseFrequency course={course} />
              </Box>
              <Box style={{ marginLeft: "auto" }} component="div">
                <CoursePrice course={course} />
              </Box>
            </Typography>
            <Typography variant="body1" color="text.primary" component="div">
              {course.desc}
            </Typography>
          </CardContent>
        </Card>
        <Box style={{ marginTop: "20px" }} component="div" variant="h6">
          {scheduleDisplay()}
          {statusMessage && (
            <Typography variant="body2" color="text.secondary" component="div">
              {statusMessage}
            </Typography>
          )}
        </Box>
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

  return <>{isLoading ? loadSpinner() : detailScreen()}</>;
}
