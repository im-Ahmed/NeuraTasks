// import { useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link } from "react-router-dom";
// import AuthLeft from "@/components/ui/authLeft";
// import axios from "axios";
// import { ButtonLoading } from "@/components/ui/loadingButton";
// const Login = () => {
//   const email = useRef<HTMLInputElement>(null);
//   const password = useRef<HTMLInputElement>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/v1/users/login", {
//         email: email.current?.value || "",
//         password: password.current?.value || "",
//       });
//       setLoading(false);
//       alert(response.data.message);
//     } catch (err: any) {
//       setLoading(false);
//       if (axios.isAxiosError(err)) {
//         alert(
//           err.response?.data.message || err.message || "something went wrong"
//         );
//       }
//     }
//   };

//   return (
//     <div className=" flex h-screen">
//       {/* Left Side Background */}
//       <AuthLeft
//         heading="
//         Welcome back! Let’s get you back on track with smarter task management."
//       />

//       {/* Right Side Form */}
//       <div className="w-full lg:w-1/2 bg-neutral-800 text-white flex-col items-center justify-center">
//         <nav className=" flex w-full">
//           <Link to={"/"}>
//             <img src="/hero_logo.png" alt="logo" className="w-40 h-30" />
//           </Link>
//         </nav>
//         <div className="flex items-center justify-center w-full">
//           <Card className="w-full max-w-sm">
//             <CardHeader>
//               <CardTitle>Login to your account</CardTitle>
//               <CardDescription>
//                 Enter your email below to login to your account
//               </CardDescription>
//               <CardAction>
//                 <Link to="/signUp">
//                   <Button className="bg-[#5f1bad] ">Sign Up</Button>
//                 </Link>
//               </CardAction>
//             </CardHeader>
//             <CardContent>
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSubmit();
//                 }}
//               >
//                 <div className="flex flex-col gap-6">
//                   <div className="grid gap-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       ref={email}
//                       id="email"
//                       type="email"
//                       placeholder="m@example.com"
//                       required
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <div className="flex items-center bg-[#5f1bad]">
//                       <Label htmlFor="password">Password</Label>
//                     </div>
//                     <Input
//                       ref={password}
//                       id="password"
//                       type="password"
//                       required
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     {loading ? (
//                       <ButtonLoading />
//                     ) : (
//                       <Button type="submit" className="w-full bg-[#5f1bad]">
//                         Login
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useRef, useState } from "react";
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
import axios from "axios";
import { ButtonLoading } from "@/components/ui/loadingButton";

const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/v1/users/login", {
        email: email.current?.value || "",
        password: password.current?.value || "",
      });
      setLoading(false);
      localStorage.setItem("accessToken", response.data.data.accessToken);
    } catch (err: any) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        alert(
          err.response?.data.message || err.message || "something went wrong",
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-800">
      {/* Left decorative/auth section */}
      <AuthLeft
        heading="Welcome back! Let's get you back on track with smarter task management."
      />

      {/* Right side - Login Form */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 bg-gray-900/60 backdrop-blur-xl">
        {/* Logo */}
        <div className="absolute top-2 left-2">
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
          className="w-full max-w-md"
        >
          <Card className="border-none bg-white backdrop-blur-lg shadow-xl shadow-black/30 rounded-2xl overflow-hidden">
            <CardHeader className="space-y-4 pb-8 px-8 pt-10">
              <CardTitle className="text-3xl font-bold text-black tracking-tight">
                Welcome back
              </CardTitle>
              <CardDescription className=" text-[#161516]">
                Sign in to continue to your workspace
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-6"
              >
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className=" font-medium text-black">
                    Email address
                  </Label>
                  <Input
                    ref={email}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="h-11 mt-1"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className=" font-medium  text-black"
                  >
                    Password
                  </Label>
                  <Input
                    ref={email}
                    id="password"
                    type="password"
                    required
                    className="h-11 mt-1"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {loading ? (
                    <ButtonLoading />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full h-11 bg-[#8a34ec] text-white font-medium transition-all duration-300 rounded-lg shadow-lg shadow-[#8a34ec]-500/20 hover:shadow-[#8a34ec]-500/40"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </form>

              {/* Sign Up Link - Simple text statement */}
              <p className="mt-8 text-center text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="text-[#8a34ec] hover:text-indigo-300 font-medium transition-colors underline underline-offset-4"
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