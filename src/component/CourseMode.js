import { mdiGoogleClassroom, mdiHumanMaleBoard } from "@mdi/js";
import Icon from "@mdi/react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { Box } from "@mui/material";

const CourseMode = ({ course }) => {
  if (course.mode === "recorded") {
    return (
      <Box mx={1}>
        <HeadphonesIcon title="Recorded Session" />
        {/* <span className="hover-text">Recorded Session</span> */}
      </Box>
    );
  } else if (course.mode === "inperson") {
    return (
      <Box mx={1}>
        <Icon path={mdiHumanMaleBoard} size={1} title="In-Person Course" />
      </Box>
    );
  } else {
    return (
      <Box mx={1}>
        <Icon path={mdiGoogleClassroom} size={1} title="Online Course" />
      </Box>
    );
  }
};

export default CourseMode;
