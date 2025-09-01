import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="flex justify-between pr-4 lg:pr-8 items-center w-full h-25 ">
      <img src="/logo.png" alt="logo" className="w-50 h-40" />
      <Button variant={"secondary"}>sign up</Button>
    </div>
  );
};

export default Navbar;
