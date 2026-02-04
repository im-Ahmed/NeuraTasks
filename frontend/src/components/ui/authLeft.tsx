type Props = {
  heading: string;
};
const AuthLeft = ({ heading }: Props) => {
  return (
    <div className="hidden lg:flex w-1/2 relative bg-[#5f1bad] text-white">
      {/* Background pattern */}
      <div
        className="absolute inset-0 " 
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "35px 35px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold leading-tight max-w-xl">
          {heading}
        </h1>

        <p className="mt-6 text-lg text-accent-foreground-foreground max-w-lg">
          Organize tasks, collaborate with your team, and track progress — all in one place.
        </p>
      </div>
    </div>
  );
};

export default AuthLeft;
