import { Link } from "react-router-dom";
import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="flex justify-between pr-4 pt-4 lg:pr-8 items-center w-full h-20 ">
      <img src="/hero_logo.png" alt="logo" className="w-40 h-40 md:w-50 md:h-40" />
      <Button asChild variant="secondary">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );
};

export default Navbar;
