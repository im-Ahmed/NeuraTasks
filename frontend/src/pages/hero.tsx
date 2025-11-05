import SubHeading from "@/components/ui/subHeading";
import Navbar from "../components/ui/navbar";
import H1 from "@/components/ui/mainHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-neutral-800 text-white w-screen h-screen">
      <Navbar></Navbar>
      <main
        className="flex flex-col items-center justify-center gap-8 lg:gap-12 w-screen
      h-auto my-30"
      >
        <H1 heading="Organize Smarter, Work Faster" />
        <SubHeading />
        <div className="flex gap-8 ">
          <Link to="/signUp" className="lg">
            <Button size={"lg"}>Get started</Button>
          </Link>
          <Link to={"/login"}>
            <Button size={"lg"} variant={"secondary"}>
              Login
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Hero;
