import { useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { PiCameraPlus } from "react-icons/pi";
import AuthLeft from "@/components/ui/authLeft";
import { ButtonLoading } from "@/components/ui/loadingButton";

const SignUp: React.FC = () => {
  const name = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (role === "") {
      alert("Please select a role");
      return;
    }
    if (avatar === null) {
      alert("Please select an avatar");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.current?.value || "");
    formData.append("username", username.current?.value || "");
    formData.append("email", email.current?.value || "");
    formData.append("password", password.current?.value || "");
    formData.append("role", role);
    formData.append("avatar", avatar);

    try {
      setLoading(true);
      const response = await axios.post("/api/v1/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      console.log(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        const backendMessage = err.response?.data?.message;
        if (backendMessage) {
          alert(backendMessage);
        } else {
          alert("Unexpected error occurred.");
        }
      } else {
        alert("Something went wrong: " + err.message);
      }
    }
  };

  return (
    <div className="flex h-screen bg-neutral-800 overflow-hidden">
      {/* Left decorative section */}
      <AuthLeft heading="Join NeuraTasks and experience productivity powered by intelligence." />

      {/* Right side - Compact Signup Form */}
      <div className="relative w-full lg:w-1/2 bg-gray-900/70 backdrop-blur-xl flex flex-col items-center justify-center p-4 pt-20 lg:pt-4">
        {/* Logo */}
        <div className="absolute top-2 left-2 lg:top-2">
          <Link to="/">
            <img
              src="/hero_logo.png"
              alt="Logo"
              className="h-20 w-32 lg:h-30 lg:w-40 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Compact Signup Card */}
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <Card className="border-none bg-white backdrop-blur-lg shadow-xl shadow-black/30 rounded-lg overflow-hidden">
            <CardHeader className="px-5 pt-3 flex flex-col space-y-2">
              <CardTitle className="text-xl font-bold text-black tracking-tight">
                Sign Up
              </CardTitle>

              {/* Avatar */}
              <div className="flex w-full justify-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    hidden
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Avatar Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#8a34ec] shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#8a34ec] transition-colors">
                      <PiCameraPlus size={24} className="text-gray-400" />
                    </div>
                  )}
                </label>
              </div>
            </CardHeader>

            <CardContent className="px-5">
              <form onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className="space-y-1.5">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="name"
                      className="text-xs font-medium text-gray-700"
                    >
                      Name
                    </Label>
                    <Input
                      ref={name}
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label
                      htmlFor="username"
                      className="text-xs font-medium text-gray-700"
                    >
                      Username
                    </Label>
                    <Input
                      ref={username}
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      required
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label
                      htmlFor="email"
                      className="text-xs font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <Input
                      ref={email}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label
                      htmlFor="password"
                      className="text-xs font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <Input
                      ref={password}
                      id="password"
                      type="password"
                      required
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium text-gray-700">
                      Role
                    </Label>
                    <Select value={role} onValueChange={(val) => setRole(val)}>
                      <SelectTrigger className="h-8 text-xs text-gray-700">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-700">
                        <SelectGroup>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit button */}
                  <div className="pt-1">
                    {loading ? (
                      <ButtonLoading />
                    ) : (
                      <Button
                        type="submit"
                        className="w-full h-8 text-xs text-white bg-[#8a34ec] font-medium transition-all duration-300 rounded-lg shadow-lg shadow-[#8a34ec]-500/20 hover:shadow-[#8a34ec]-500/40"
                      >
                        Sign Up
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="px-5 pb-4 flex justify-center">
              <p className="text-center text-gray-500 text-xs">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#8a34ec] hover:text-indigo-500 font-medium transition-colors underline underline-offset-2"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
