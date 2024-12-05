import { Button, Container } from "@mui/material";
import { styled } from "@mui/system";

export const IndividualStack = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  flexDirection: "row",
  "& > :not(:last-child)": {
    marginBottom: "8px",
  },
});

export const IndividualSchedule = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
  marginTop: "40px",
});

export const CancelButton = styled(Button)({
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#757ce8",
  color: "	#FFFFFF",
});

export const SubmitButton = styled(Button)({
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
});

export const Spinner = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const CourseContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  // marginTop: "60px"
});

export const CourseCard = styled("div")({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "60%",
  "@media (maxWidth: 600px)": {
    width: "100%",
  },
});

export const PrimaryContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.primary,
}));


