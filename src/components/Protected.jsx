import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Protected = ({ children }) => {
  const { user } = useUserAuth();

  console.log(`Private User Check: ${user}`);

  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default Protected;
