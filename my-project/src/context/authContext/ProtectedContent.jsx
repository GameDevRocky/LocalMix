import { Navigate } from "react-router-dom";
import { useAuth } from ".";

const ProtectedContent = ({ children }) => {
  const { currentUser, userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedContent;