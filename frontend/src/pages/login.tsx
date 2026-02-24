import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import AuthLeft from "@/components/ui/authLeft";
import { ButtonLoading } from "@/components/ui/loadingButton";
import { useLoginUserMutation } from "@/features/user/userSlice";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginUser] = useLoginUserMutation();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const loginResponse = await loginUser(formData).unwrap();
      setLoading(false);
      localStorage.setItem("UserId", loginResponse.data.user._id!);
      loginResponse.data.user.role === "admin"
        ? (window.location.href = "/dashboard")
        : (window.location.href = "/user-dashboard");
    } catch (err) {
      console.error("Failed to login:", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-800">
      {/* Left decorative/auth section */}
      <AuthLeft heading="Welcome back! Let's get you back on track with smarter task management." />

      {/* Right side - Login Form */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 bg-gray-900/60 backdrop-blur-xl">
        {/* Logo */}
        <div className="absolute top-0 left-2">
          <Link to="/">
            <img
              src="/hero_logo.png"
              alt="Logo"
              className="w-40 h-30   transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Animated Login Card */}
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="w-full max-w-sm"
        >
          <Card className="border-none bg-white backdrop-blur-lg shadow-xl shadow-black/30 rounded-xl overflow-hidden">
            <CardHeader className="space-y-3 pb-6 px-6 pt-8">
              <CardTitle className="text-2xl font-bold text-black tracking-tight">
                Welcome back
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                LogIn to continue to your workspace
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-4"
              >
                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </Label>
                  <Input
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    className="h-9 text-sm"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <Input
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    id="password"
                    type="password"
                    required
                    className="h-9 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  {loading ? (
                    <ButtonLoading />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full h-9 text-sm bg-[#8a34ec] text-white font-medium transition-all duration-300 rounded-lg shadow-lg shadow-[#8a34ec]-500/20 hover:shadow-[#8a34ec]-500/40"
                    >
                      Log In
                    </Button>
                  )}
                </div>
              </form>

              {/* Sign Up Link - Simple text statement */}
              <p className="mt-6 text-center text-gray-500 text-xs">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="text-[#8a34ec] hover:text-indigo-500 font-medium transition-colors underline underline-offset-2"
                >
                  Create one now
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
