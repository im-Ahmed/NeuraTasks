// import { useRef, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link } from "react-router-dom";
// import { PiCameraPlus } from "react-icons/pi";
// import AuthLeft from "@/components/ui/authLeft";
// import { ButtonLoading } from "@/components/ui/loadingButton";

// const SignUp = () => {
//   const name = useRef<HTMLInputElement>(null);
//   const email = useRef<HTMLInputElement>(null);
//   const password = useRef<HTMLInputElement>(null);
//   const [avatar, setAvatar] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState<Boolean>(false);

//   const [role, setRole] = useState<string>("");
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setAvatar(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };
//   const handleSubmit = async (e: React.SyntheticEvent) => {
//     e.preventDefault();

//     if (role === "") {
//       alert("Please select a role");
//       return;
//     }
//     if (avatar === null) {
//       alert("Please select an avatar");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name.current?.value || "");
//     formData.append("email", email.current?.value || "");
//     formData.append("password", password.current?.value || "");
//     formData.append("role", role);
//     formData.append("avatar", avatar);

//     try {
//       setLoading(true);
//       const response = await axios.post("/api/v1/users/register", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // 👈 important for Multer
//         },
//       });
//       alert(response.data.message);
//       console.log(response.data);
//       setLoading(false);
//     } catch (err: any) {
//       setLoading(false);

//       if (axios.isAxiosError(err)) {
//         // If backend sent a custom error message
//         const backendMessage = err.response?.data?.message;

//         if (backendMessage) {
//           alert(backendMessage); // show custom backend message
//         } else {
//           alert("Unexpected error occurred.");
//         }
//       } else {
//         alert("Something went wrong: " + err.message);
//       }
//     }
//   };

//   return (
//     <div className=" flex h-screen">
//       {/* left Side Background */}
//       <AuthLeft heading="Join NeuraTasks and experience productivity powered by intelligence." />
//       {/* Right Side Form */}
//       <div className="w-full lg:w-1/2 bg-neutral-800 text-white flex-col items-center justify-center">
//         <nav className=" flex w-full">
//           <Link to={"/"}>
//             <img src="/hero_logo.png" alt="logo" className="w-40 h-30" />
//           </Link>
//         </nav>
//         <div className="flex items-start justify-center w-full">
//           <Card className="w-full max-w-sm relative">
//             <CardHeader className="flex flex-col items-center">
//               <CardTitle>
//                 <label className="cursor-pointer rounded-full ">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     required
//                     hidden
//                   />
//                   {preview ? (
//                     <img
//                       src={preview}
//                       alt="Avatar Preview"
//                       className="w-18 h-18 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-18 h-18 rounded-full bg-gray-200 flex items-center justify-center">
//                       <PiCameraPlus size={"20"} />
//                     </div>
//                   )}
//                 </label>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit}>
//                 <div className="flex flex-col gap-2">
//                   <div className="grid gap-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input
//                       ref={name}
//                       id="name"
//                       type="text"
//                       placeholder="john"
//                       required
//                     />
//                   </div>
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
//                     <div className="flex items-center">
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
//                     <div className="flex items-center">
//                       <Label htmlFor="role">User role</Label>
//                     </div>
//                     <Select value={role} onValueChange={(val) => setRole(val)}>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Select a role" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectLabel>Roles</SelectLabel>
//                           <SelectItem value="admin">Admin</SelectItem>
//                           <SelectItem value="member">Member</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid gap-2">
//                     {loading ? (
//                       <ButtonLoading />
//                     ) : (
//                       <Button type="submit" className="w-full">
//                         Sign Up
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </form>
//             </CardContent>
//             <CardFooter className="flex justify-center items-center w-full">
//               <p className="leading-7 [&:not(:first-child)]:mt-6">
//                 Already have and account?
//               </p>
//               <Link to="/login">
//                 <Button size={"sm"} variant={"link"}>
//                   Login
//                 </Button>
//               </Link>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
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

const SignUp = () => {
  const name = useRef<HTMLInputElement>(null);
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
      <AuthLeft
        heading="Join NeuraTasks and experience productivity powered by intelligence."
      />

      {/* Right side - Compact Signup Form */}
      <div className="relative w-full lg:w-1/2 bg-gray-900/70 backdrop-blur-xl flex items-center justify-center p-4">
        {/* Logo */}
        <div className="absolute top-2 left-2">
          <Link to="/">
            <img
              src="/hero_logo.png"
              alt="Logo"
              className="h-30 w-40 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Ultra-compact Signup Card */}
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <Card className="border-none w-md flex justify-center bg-white backdrop-blur-lg shadow-xl shadow-black/30 rounded-2xl overflow-hidden">
            <CardHeader className="p-5 pt-6 flex flex-col items-center space-y-3">
              <CardTitle className="text-xl font-bold ">
                Create Account
              </CardTitle>

              {/* Compact Avatar */}
              <label className="cursor-pointer ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className=""
                  required
                  hidden
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    className="w-14 h-14 rounded-full object-cover border-2 border-maroon-600 shadow-sm"
                  />
                ) : (
                  <div className="w-17 h-17 rounded-full  border-2 border-gray-200 flex items-center justify-center hover:border-maroon-500 transition-colors">
                    <PiCameraPlus size={20} className="text-gray-400 " />
                  </div>
                )}
              </label>
            </CardHeader>

            <CardContent className="p-5 pb-4 mt-[-30px]">
              <form onSubmit={handleSubmit}>
                {/* Compact inputs */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black mb-2 text-xs font-medium">
                    Name
                  </Label>
                   <Input
                      ref={name}
                      id="name"
                      type="text"
                      required
                      className="h-11 mt-1 mb-1"
                    />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black text-xs  mb-1 font-medium">
                    Email
                  </Label>
                   <Input
                      ref={email}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="h-11 mt-1  mb-1"
                    />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black text-xs   mb-1 font-medium">
                    Password
                  </Label>
                   <Input
                      ref={password}
                      id="password"
                      type="password"
                      required
                      className="h-11 mt-1  mb-1"
                    />
                </div>

                <div className="space-y-2 ">
                  <Label className="text-black text-xs font-medium">Role</Label>
                  <Select value={role} onValueChange={(val) => setRole(val)}>
                    <SelectTrigger className="h-11 text-black focus:border-maroon-500 focus:ring-maroon-500/30 rounded-lg text-xs">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-200 text-black">
                      <SelectGroup>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Left-aligned button */}
                <div className="pt-2 flex justify-start ]">
                  {loading ? (
                    <ButtonLoading  />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full h-11  text-white bg-[#8a34ec] font-medium transition-all duration-300 rounded-lg shadow-lg shadow-[#8a34ec]-500/20 hover:shadow-[#8a34ec]-500/40"
                    >
                      Sign Up
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>

            <CardFooter className="  pb-7  mt-[-40px] flex justify-center ">
                <p className="mt-8 text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#8a34ec] hover:text-indigo-300 font-medium transition-colors underline underline-offset-4"
                >
                  sign in
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