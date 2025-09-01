type H1Props = {
  heading: string;
};

const H1 = ({ heading }: H1Props) => {
  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        {heading  }
      </h1>
    </div>
  );
};

export default H1;
