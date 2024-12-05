import { Alert, AlertTitle } from "@mui/material";
import { IndividualSchedule } from "../../../styles/Course.module";

export default function EnrollSuccess() {
  return (
    <IndividualSchedule>
      <Alert
        severity="success"
        variant="outlined"
        sx={{ mb: 2, width: "500px" }}
      >
        <AlertTitle sx={{ fontSize: 26 }}>Thank You!</AlertTitle>
        <AlertTitle sx={{ fontSize: 22 }}>
          {" "}
          You have successfully enrolled for the course{" "}
        </AlertTitle>
      </Alert>
    </IndividualSchedule>
  );
}
