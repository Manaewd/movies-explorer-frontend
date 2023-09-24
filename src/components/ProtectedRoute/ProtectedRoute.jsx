import { Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;