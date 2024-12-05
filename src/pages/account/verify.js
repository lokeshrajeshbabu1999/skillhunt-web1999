import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab"; // Import LoadingButton from MUI Lab
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ConfirmSignUp = () => {
  const router = useRouter();
  const { email } = router.query;
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [resendErr, setResendErr] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleConfirm = async () => {
    setCodeErr("");
    setConfirmErr("");
    setConfirmLoading(true);
    try {
      if (!code) {
        setCodeErr("Code is required");
        setConfirmLoading(false);
        return;
      }
      await Auth.confirmSignUp(email, code);
      router.push("/account/signin");
    } catch (err) {
      console.error(err);
      setConfirmErr(err.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendErr("");
    setResendSuccess("");
    setResendLoading(true);
    try {
      await Auth.resendSignUp(email);
      setResendSuccess("A new confirmation code has been sent to your email.");
    } catch (err) {
      console.error(err);
      setResendErr(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: "20px",
      }}
    >
      <Typography variant="h5" mt={6} mb={4}>
        Confirm your account
      </Typography>
      <TextField
        value={code}
        onChange={(e) => setCode(e.target.value)}
        label="Confirmation Code"
        helperText={codeErr}
        error={!!codeErr}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 4, width: "300px" }}
      />
      {confirmErr && (
        <Alert severity="error" sx={{ mb: 4, width: "250px" }}>
          <AlertTitle>Error</AlertTitle>
          {confirmErr}
        </Alert>
      )}
      {resendSuccess && (
        <Alert severity="success" sx={{ mb: 4, width: "250px" }}>
          <AlertTitle>Success</AlertTitle>
          {resendSuccess}
        </Alert>
      )}
      {resendErr && (
        <Alert severity="error" sx={{ mb: 4, width: "250px" }}>
          <AlertTitle>Error</AlertTitle>
          {resendErr}
        </Alert>
      )}
      <LoadingButton
        variant="contained"
        size="large"
        onClick={handleConfirm}
        sx={{ mb: 2, width: "300px" }}
        loading={confirmLoading} 
      >
        Confirm
      </LoadingButton>
      <LoadingButton
        variant="text"
        onClick={handleResendCode}
        sx={{ mb: 2, width: "300px" }}
        loading={resendLoading}
      >
        Resend Confirmation Code
      </LoadingButton>
    </Box>
  );
};

export default ConfirmSignUp;
