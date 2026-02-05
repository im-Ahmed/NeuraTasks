type H1Props = {
  heading: string;
};

const H1 = ({ heading }: H1Props) => {
  return (
    <div>
      <h1
        className="
  scroll-m-20
  text-center
  text-4xl sm:text-5xl lg:text-6xl
  font-medium
  tracking-tight
  leading-tight
  bg-gradient-to-b from-white to-neutral-400
  bg-clip-text text-transparent
"
      >
        {heading}
      </h1>
    </div>
  );
};

export default H1;
