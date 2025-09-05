import { useRef, useState } from "react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { PiCameraPlus } from "react-icons/pi";
import AuthLeft from "@/components/ui/authLeft";
import { ButtonLoading } from "@/components/ui/loadingButton";

const SignUp = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

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
    formData.append("email", email.current?.value || "");
    formData.append("password", password.current?.value || "");
    formData.append("role", role);
    formData.append("avatar", avatar);

    try {
      setLoading(true);
      const response = await axios.post("/api/v1/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 👈 important for Multer
        },
      });
      alert(response.data.message);
      console.log(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);

      if (axios.isAxiosError(err)) {
        // If backend sent a custom error message
        const backendMessage = err.response?.data?.message;

        if (backendMessage) {
          alert(backendMessage); // show custom backend message
        } else {
          alert("Unexpected error occurred.");
        }
      } else {
        alert("Something went wrong: " + err.message);
      }
    }
  };

  return (
    <div className=" flex h-screen">
      {/* left Side Background */}
      <AuthLeft heading="Join NeuraTasks and experience productivity powered by intelligence." />
      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 bg-neutral-800 text-white flex-col items-center justify-center">
        <nav className=" flex w-full">
          <Link to={"/"}>
            <img src="/hero_logo.png" alt="logo" className="w-40 h-30" />
          </Link>
        </nav>
        <div className="flex items-start justify-center w-full">
          <Card className="w-full max-w-sm relative">
            <CardHeader className="flex flex-col items-center">
              <CardTitle>
                <label className="cursor-pointer rounded-full ">
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
                      className="w-18 h-18 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-18 h-18 rounded-full bg-gray-200 flex items-center justify-center">
                      <PiCameraPlus size={"20"} />
                    </div>
                  )}
                </label>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      ref={name}
                      id="name"
                      type="text"
                      placeholder="john"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      ref={email}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      ref={password}
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="role">User role</Label>
                    </div>
                    <Select value={role} onValueChange={(val) => setRole(val)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    {loading ? (
                      <ButtonLoading />
                    ) : (
                      <Button type="submit" className="w-full">
                        Sign Up
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center items-center w-full">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Already have and account?
              </p>
              <Link to="/login">
                <Button size={"sm"} variant={"link"}>
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
