import { Navigate } from "react-router-dom";
import { setAuth, useGetUserProfileQuery } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { data: userResponse, isLoading, isError } = useGetUserProfileQuery();
  const dispatch = useDispatch<AppDispatch>();
  const user = userResponse?.data?.user;
  console.log(user);
  // Check if user is authenticated & has admin role
  useEffect(() => {
    if (!isLoading && user) {
      dispatch(setAuth({ isAdmin: user?.role === "admin", user }));
    }
  }, [dispatch, isLoading, user]);

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
