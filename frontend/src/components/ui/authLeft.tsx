type Props = {
  heading: string;
};
const AuthLeft = ({ heading }: Props) => {
  return (
    <div className="w-1/2 hidden lg:flex flex-col items-center justify-start   bg-[#120d16]">
      <img src="/logo.png" alt="hero" className=" w-1/2 h-1/2" />
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center text-white">
        {heading}
      </h4>
    </div>
  );
};

export default AuthLeft;
