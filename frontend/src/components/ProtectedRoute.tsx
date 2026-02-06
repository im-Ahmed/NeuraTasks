import { Navigate } from "react-router-dom";
import { setAuth, useGetUserProfileQuery } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userResponse, isLoading, isError } = useGetUserProfileQuery();
  const dispatch = useDispatch<AppDispatch>();
  // Check if user is authenticated & has admin role
  useEffect(() => {
    if (!isLoading && userResponse?.data?.user?.role === "admin") {
      dispatch(setAuth({ isAdmin: true, user: userResponse.data.user }));
    }
  }, [dispatch, isLoading, userResponse]);

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
