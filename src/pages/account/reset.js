import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [emailErr, setEmailErr] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [resetErr, setResetErr] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setEmailErr("");
    setResetErr("");
    setResetSuccess("");
    setLoading(true); // start loading

    if (!email) {
      setEmailErr("E-Mail is required");
      setLoading(false); // stop loading
      return;
    }

    try {
      await Auth.forgotPassword(email);
      setStep(2); // proceed to step 2
    } catch (error) {
      setResetErr(error.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleResetPassword = async () => {
    setCodeErr("");
    setPasswordErr("");
    setResetErr("");
    setResetSuccess("");
    setLoading(true); // start loading

    if (!code) {
      setCodeErr("Code is required");
      setLoading(false); // stop loading
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordErr("Password must be at least 6 characters");
      setLoading(false); // stop loading
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      setResetSuccess("Password has been reset successfully!");
      setTimeout(() => router.push("/account/signin"), 2000);
    } catch (error) {
      setResetErr(error.message);
    } finally {
      setLoading(false); // stop loading
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
        {step === 1 ? "Forgot Password" : "Reset Password"}
      </Typography>
      {step === 1 ? (
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-Mail"
          helperText={emailErr}
          error={!!emailErr}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 4, width: "300px" }}
        />
      ) : (
        <>
          <TextField
            value={code}
            onChange={(e) => setCode(e.target.value)}
            label="Code"
            helperText={codeErr}
            error={!!codeErr}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 4, width: "300px" }}
          />
          <TextField
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            label="New Password"
            helperText={passwordErr}
            error={!!passwordErr}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 4, width: "300px" }}
          />
        </>
      )}
      {resetErr && (
        <Alert severity="error" sx={{ mb: 4, width: "250px" }}>
          <AlertTitle>Error</AlertTitle>
          {resetErr}
        </Alert>
      )}
      {resetSuccess && (
        <Alert severity="success" sx={{ mb: 4, width: "250px" }}>
          <AlertTitle>Success</AlertTitle>
          {resetSuccess}
        </Alert>
      )}
      {!resetSuccess && (
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          onClick={step === 1 ? handleSendCode : handleResetPassword}
          sx={{ mb: 2, width: "300px" }}
          loading={loading}
        >
          {step === 1 ? "SEND CODE" : "RESET PASSWORD"}
        </LoadingButton>
      )}
    </Box>
  );
};

export default ForgotPassword;
