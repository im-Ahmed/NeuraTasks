import { Navigate } from "react-router-dom";
import { useGetUserProfileQuery } from "@/features/user/userSlice";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { data: userResponse, isLoading, isError } = useGetUserProfileQuery();
  const user = userResponse?.data.user;

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

  // rule bases authorization check
  if (allowedRoles && !allowedRoles.includes(user?.role ?? "")) {
    return <Navigate to="/login" replace />;
  }
  // Render protected content if authenticated
  return <>{children}</>;
}
