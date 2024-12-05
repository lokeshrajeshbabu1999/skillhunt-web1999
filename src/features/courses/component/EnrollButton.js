import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EnrollButton({ course_id }) {
  const router = useRouter();
  const { schedule_id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loading, setLoading] = useState("");

  const onCancel = () => {
    setLoading(true); 
    router.push(`/course/${course_id}`);
    setLoading(false); 
  };

  const handleGoogleSignUp = async () => {
    setLoadingGoogle(true); 
    try {
      await Auth.federatedSignIn({ provider: "Google" });
    } catch (error) {
    } finally {
      setLoadingGoogle(false);
    }
  };

  const confirmSchedule = async () => {
    setLoadingEmail(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const user = await Auth.currentAuthenticatedUser();
      router.push(`/enrollment/confirm/${schedule_id}`);
    } catch (error) {
      toast.error("You need to sign in to enroll.");
      router.push("/account/signin");
    } finally {
      setLoadingEmail(false);
    }
  };
  

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={1}
        sx={{
          width: isMobile ? "100%" : "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={onCancel}
          loading={loading} 
          sx={{ mt: 1 }}
        >
          <Typography>Cancel</Typography>
        </LoadingButton>

        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleGoogleSignUp}
          loading={loadingGoogle}
          sx={{ mt: 1 }}
        >
          <GoogleIcon sx={{ mr: 1 }} />
          ENROLL with Google
        </LoadingButton>

        <LoadingButton
          variant="contained"
          color="primary"
          onClick={confirmSchedule}
          loading={loadingEmail} 
          sx={{ mt: 1 }}
        >
          <EmailIcon sx={{ mr: 1 }} />
          ENROLL with E-Mail
        </LoadingButton>
      </Stack>
    </Box>
  );
}
