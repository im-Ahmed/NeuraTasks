import SubHeading from "@/components/subHeading";
import Navabr from "../components/ui/navbar";
import H1 from "@/components/ui/mainHeading";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-neutral-800 text-white w-screen h-screen">
      <Navabr></Navabr>
      <main
        className="flex flex-col items-center justify-center gap-8 lg:gap-12 w-screen
      h-auto my-30"
      >
        <H1 heading="Organize Smarter, Work Faster" />
        <SubHeading />
        <div className="flex gap-8 ">
          <Button size={"lg"}>Get started</Button>
          <Button size={"lg"} variant={"secondary"}>
            Login
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Hero;
