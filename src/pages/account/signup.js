import {
  Alert,
  AlertTitle,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [signupErr, setSignupErr] = useState("");
  const [loading, setLoading] = useState(false);

  const formInputChange = (formField, value) => {
    if (formField === "name") {
      setName(value);
    }
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
    if (formField === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z ]+$/;
    return re.test(name);
  };

  const validation = () => {
    return new Promise((resolve) => {
      let nameError = "";
      let emailError = "";
      let passwordError = "";
      let confirmPasswordError = "";

      if (!name) {
        nameError = "Name is required";
      } else if (!validateName(name)) {
        nameError = "Invalid name format";
      }

      if (!email) {
        emailError = "Email is required";
      } else if (!validateEmail(email)) {
        emailError = "Invalid email format";
      }

      if (!password) {
        passwordError = "Password is required";
      } else if (password.length < 8) {
        passwordError = "Password must be at least 8 characters";
      }

      if (!confirmPassword) {
        confirmPasswordError = "Confirm Password is required";
      } else if (password !== confirmPassword) {
        confirmPasswordError = "Passwords do not match";
      }

      setNameErr(nameError);
      setEmailErr(emailError);
      setPasswordErr(passwordError);
      setConfirmPasswordErr(confirmPasswordError);

      if (nameError || emailError || passwordError || confirmPasswordError) {
        resolve({
          name: nameError,
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError,
        });
      } else {
        resolve({ name: "", email: "", password: "", confirmPassword: "" });
      }
    });
  };

  const handleClick = () => {
    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");
    setLoading(true);
    validation()
      .then((res) => {
        if (
          res.name === "" &&
          res.email === "" &&
          res.password === "" &&
          res.confirmPassword === ""
        ) {
          Auth.signUp({
            username: email,
            password: password,
            attributes: {
              email: email,
              name: name,
            },
          })
            .then(() => {
              setSignupErr("");
              router.push({
                pathname: "/account/verify",
                query: { email },
              });
            })
            .catch((err) => {
              console.log(err);
              setSignupErr(err.message);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: "80px",
      }}
    >
      <Typography variant="h5" mb={4}>
        Sign Up
      </Typography>
      <TextField
        value={name}
        onChange={(e) => formInputChange("name", e.target.value)}
        label="Name"
        helperText={nameErr}
        error={!!nameErr}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 4, width: "300px" }}
      />
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
      <TextField
        value={confirmPassword}
        onChange={(e) => formInputChange("confirmPassword", e.target.value)}
        type="password"
        label="Confirm Password"
        helperText={confirmPasswordErr}
        error={!!confirmPasswordErr}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 4, width: "300px" }}
      />
      {signupErr && (
        <Alert severity="error" sx={{ mb: 4, width: "250px" }}>
          <AlertTitle>Error</AlertTitle>
          {signupErr}
        </Alert>
      )}
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        onClick={handleClick}
        loading={loading}
        sx={{ mb: 2, width: "300px" }}
      >
        Sign Up
      </LoadingButton>
      <Typography>
        Already have an account? &nbsp;
        <Link href="/account/signin" sx={{ ml: 1 }}>
          Sign In
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
