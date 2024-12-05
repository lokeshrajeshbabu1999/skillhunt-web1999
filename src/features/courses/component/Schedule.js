import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { format } from "date-fns";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import axiosUser from "../../../api/axiosUser";
import { Spinner } from "../../../styles/Course.module";
import { ScheduleStatusDesc } from "../../../util/Constant";

const Schedule = ({ schedules, isLoading }) => {
  const router = useRouter();
  const { course_id } = router.query;
  const [enrollment, setEnrollment] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const displayNoSchedule = () => (
    <Typography component="span">
      <p>Allow user to show interest</p>
    </Typography>
  );

  const enrollSchedule = (selectedSchedule) => {
    router.push(`/enrollment/${selectedSchedule.schedule_id}`);
  };

  const displaySchedule = () => (
    <Box
      component="section"
      sx={{
        height: "100%",
        borderColor: "primary.main",
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "text.tertiary",
          p: 1,
        }}
      >
        <Typography variant="h6">Course Schedule</Typography>
      </Box>
      <Grid container spacing={1} sx={{ m: 1 }}>
        {schedules.map((schedule, index) => {
          const isEnrolled = enrollment.some(
            (enroll) => enroll.schedule_id === schedule.schedule_id
          );

          return (
            <React.Fragment key={schedule.schedule_id}>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item sm={4}>
                    <Typography component="span">
                      {format(new Date(schedule.start_date), "dd MMM yyyy")} -{" "}
                      {format(new Date(schedule.end_date), "dd MMM yyyy (eee)")}
                    </Typography>
                  </Grid>
                  {!isMobile && (
                    <Grid item sm={3}>
                      <Typography component="span">
                        {ScheduleStatusDesc[schedule.status]}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item sm={isMobile ? 6 : 3}>
                    <Typography component="span">
                      {format(
                        new Date(`1970-01-01T${schedule.start_time}`),
                        "hh:mm a"
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(`1970-01-01T${schedule.end_time}`),
                        "hh:mm a"
                      )}
                    </Typography>
                  </Grid>
                  <Grid item sm={2}>
                    <LoadingButton
                      onClick={() => enrollSchedule(schedule)}
                      variant="contained"
                      color="primary"
                      disabled={isEnrolled}
                    >
                      {isEnrolled ? "ENROLLED" : "ENROLL"}
                    </LoadingButton>
                  </Grid>
                </Grid>
                {index < schedules.length - 1 && <Divider />}
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );

  const displayResult = () => (
    <>
      {schedules && schedules.length > 0
        ? displaySchedule()
        : displayNoSchedule()}
    </>
  );

  const loadSpinner = () => (
    <Spinner>
      <TailSpin />
    </Spinner>
  );

  useEffect(() => {
    const getEnrollment = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const response = await axiosUser.get("/enroll", {
          params: {
            email_id: user.attributes.email,
            course_id,
          },
        });
        setEnrollment(response.data);
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    };

    getEnrollment();
  }, [course_id]);

  return (
    <Typography component="span">
      {isLoading ? loadSpinner() : displayResult()}
    </Typography>
  );
};

export default Schedule;
