import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginService } from "../services/LoginService";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/details");
    }
  }, [navigate]);

  const onSubmit = async (token) => {
    console.log("Submitted Data:", token);
    try {
      const response = await LoginService(token);
      // console.log('response in the login component',response)
      if (response.status === 200) {
        Cookies.set("authToken", response.data.token, { expires: 0.5 });
        toast.success("Login Successful!");
        navigate("/details");
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("error in the component", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[500px] bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="id"
            >
              Enter Your Token Id
            </label>
            <input
              id="token"
              type="text"
              {...register("token", {
                required: "ID is required",
                minLength: {
                  value: 5,
                  message: "ID must be at least 5 characters long",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.token
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
              placeholder="Enter your ID"
            />
            {errors.token && (
              <p className="text-red-500 text-sm mt-1">
                {errors.token.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
