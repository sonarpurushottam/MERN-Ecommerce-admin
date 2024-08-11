import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const loginUser = async ({ emailOrMobile, password }) => {
  const { data } = await axiosInstance.post(
    "/users/login",
    { emailOrMobile, password },
    { withCredentials: true }
  );
  return data;
};

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { token, role } = data;
      if (role === "admin" || role === "superadmin") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        navigate(role === "superadmin" ? "/super-admin" : "/admin-dashboard");
        toast.success("Login successful!");
      } else {
        toast.error("Unauthorized");
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    },
  });

  return { login: loginMutation.mutate, isLoading: loginMutation.isLoading };
};
