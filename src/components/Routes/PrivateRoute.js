import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, redirect = "/login" }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirect} replace />;
}

export { PrivateRoute };
