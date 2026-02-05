import { Navigate } from "react-router-dom";
import { useGetUserProfileQuery } from "@/features/user/userSlice";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isError } = useGetUserProfileQuery();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}
