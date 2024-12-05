import { useCallback } from "react";
import axiosUser from "../../../api/axiosUser";
const useEnrollPost = () => {
  const handlePost = useCallback(async (data) => {
    try {
      const response = await axiosUser.post("/enroll", data);

      if (response.status === 200) {
        return { success: true, message: "Enrollment successful" };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false, message: "An error occurred. You might already be enrolled in this course"
      };
    }
  }, []);
  return [handlePost];
};
export default useEnrollPost;
