import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/User.context";

export default function GuestRoute({ children }) {
  const { token } = useContext(UserContext);

  if (token) {
    return <Navigate to={"/"} replace />;
  } else {
    return children;
  }
}
