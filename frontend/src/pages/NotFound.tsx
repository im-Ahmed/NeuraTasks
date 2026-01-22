import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#262626] px-4 text-center">
      {/* 404 Code */}
      <h1 className="text-8xl font-extrabold text-white">
        4<span className="text-violet-500">0</span>4
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-200">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-gray-400">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="rounded-lg bg-violet-600 px-6 py-3 text-white font-medium transition hover:bg-violet-700"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="rounded-lg border border-gray-600 px-6 py-3 text-gray-200 transition hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
