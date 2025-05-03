import { Navigate } from 'react-router-dom';
import { getAuthData } from '../utils/authStorage';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = getAuthData();

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
