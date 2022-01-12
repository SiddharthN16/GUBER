import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const Protected = ({ children }) => {
  const { user } = useUserAuth();

  // checks if user is logged in, if not return back to login page
  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default Protected;
