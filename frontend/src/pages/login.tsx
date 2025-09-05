import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
      alert(response.data.message);
    } catch (err: any) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        alert(
          err.response?.data.message || err.message || "something went wrong"
        );
      }
    }
  };

  return (
    <div className=" flex h-screen">
      {/* Left Side Background */}
      <AuthLeft
        heading="
        Welcome back! Let’s get you back on track with smarter task management."
      />

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 bg-neutral-800 text-white flex-col items-center justify-center">
        <nav className=" flex w-full">
          <Link to={"/"}>
            <img src="/hero_logo.png" alt="logo" className="w-40 h-30" />
          </Link>
        </nav>
        <div className="flex items-center justify-center w-full">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Link to="/signUp">
                  <Button variant="link">Sign Up</Button>
                </Link>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col gap-6">
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
                    {loading ? (
                      <ButtonLoading />
                    ) : (
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
