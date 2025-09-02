import { Link } from "react-router-dom";
import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="flex justify-between pr-4 lg:pr-8 items-center w-full h-20 ">
      <img src="/hero_logo.png" alt="logo" className="w-50 h-40" />
      <Link to={"/signUp"}>
        <Button variant={"secondary"}>sign up</Button>
      </Link>
    </div>
  );
};

export default Navbar;
