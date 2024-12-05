import {
  Alert,
  AlertTitle,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [showConfirmLink, setShowConfirmLink] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validation = async () => {
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required";
    } else if (!validateEmail(email)) {
      emailError = "Invalid email format";
    }

    if (!password) {
      passwordError = "Password is required";
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    setEmailErr(emailError);
    setPasswordErr(passwordError);

    return { email: emailError, password: passwordError };
  };

  const handleClick = async () => {
    setEmailErr("");
    setPasswordErr("");
    setLoadingSignIn(true);
    try {
      const res = await validation();
      if (res.email === "" && res.password === "") {
        try {
          const user = await Auth.signIn(email, password);
          if (user.attributes.email_verified) {
            login(user);
            setLoginErr("");
            router.push("/");
          } else {
            setShowConfirmLink(true);
          }
        } catch (err) {
          if (err.code === "UserNotConfirmedException") {
            setShowConfirmLink(true);
          } else {
            console.error(err);
            setLoginErr(err.message);
          }
        }
      }
    } catch (err) {
      console.error(err);
      setLoginErr(err.message);
    } finally {
      setLoadingSignIn(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoadingGoogle(true);
    try {
      await Auth.federatedSignIn({ provider: "Google" });
    } catch (error) {
      console.error("Google Sign In Error:", error);
    } finally {
      setLoadingGoogle(false);
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
        Sign In
      </Typography>
      <TextField
        value={email}
        onChange={(e) => formInputChange("email", e.target.value)}
        label="E-Mail"
        helperText={emailErr}
        error={!!emailErr}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 4, width: "300px" }}
      />
      <TextField
        value={password}
        onChange={(e) => formInputChange("password", e.target.value)}
        type="password"
        label="Password"
        helperText={passwordErr}
        error={!!passwordErr}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 4, width: "300px" }}
      />
      {loginErr && (
        <Alert severity="error" sx={{ mb: 4, width: "250px" }}>
          <AlertTitle>Error</AlertTitle>
          {loginErr}
        </Alert>
      )}
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        onClick={handleClick}
        loading={loadingSignIn}
        sx={{ mb: 2, width: "300px" }}
      >
        SIGN IN
      </LoadingButton>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        onClick={handleGoogleSignUp}
        loading={loadingGoogle}
        sx={{ mb: 2, width: "300px" }}
      >
        SIGN IN WITH Google
      </LoadingButton>
      {showConfirmLink && (
        <Box>
          <Alert severity="error">
            <Typography>
              Your account is not yet verified &nbsp;
              <Link href={{ pathname: "/account/verify", query: { email } }}>
                Verify Account
              </Link>
            </Typography>
          </Alert>
        </Box>
      )}
      <Stack sx={{ mt: 2, textDecoration: "none" }}>
        <Typography sx={{ mt: 2 }}>
          Don't have an account? &nbsp;
          <Link href="/account/signup" color="primary" sx={{ ml: 1 }}>
            Sign Up
          </Link>
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Forgot your password? &nbsp;
          <Link href="/account/reset" sx={{ ml: 1 }}>
            Reset Password
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignIn;
