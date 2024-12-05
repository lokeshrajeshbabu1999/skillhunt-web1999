import { Alert } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import axiosCourse from "../../../api/axiosCourse";

const useShowInterest = (courseId) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const router = useRouter();

  const getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return {
        email: user.attributes.email,
        name: user.attributes.name,
      };
    } catch (error) {
      console.log("Error retrieving user data:", error);
      return null;
    }
  };

  const handleShowInterest = async () => {
    const userData = await getUserData();
    if (!userData) {
      setAlertType("error");
      setStatusMessage("User not authenticated. Redirecting to sign in...");
      setTimeout(() => router.push("/signin"), 3000);
      return;
    }

    const token = localStorage.getItem("token");
    setStatusMessage("");
    try {
      const response = await axiosCourse.post(
        "/showInterest",
        {
          email: userData.email,
          name: userData.name,
          course_id: courseId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.data.status_code === 200) {
        setAlertType("success");
        setStatusMessage(
          response.data.message || "Interest shown successfully!"
        );
      } else if (response.data.status_code === 409) {
        setAlertType("warning");
        setStatusMessage(response.data.message);
      } else {
        setAlertType("error");
        setStatusMessage(
          "You've already shown interest in this course. We will contact you with more details soon."
        );
      }
    } catch (error) {
      setAlertType("error");
      setStatusMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return {
    statusMessage: statusMessage && (
      <Alert
        severity={alertType}
        onClose={() => setStatusMessage("")}
        sx={{ marginTop: "10px" }}
      >
        {statusMessage}
      </Alert>
    ),
    handleShowInterest,
  };
};

export default useShowInterest;
