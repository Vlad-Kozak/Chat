import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children, redirect = "/chat", restricted = false }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const shouldRedirect = restricted && isLoggedIn;

  return shouldRedirect ? <Navigate to={redirect} replace /> : children;
}

export { PublicRoute };
