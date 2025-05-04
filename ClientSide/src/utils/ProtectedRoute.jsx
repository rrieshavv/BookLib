import { Navigate } from 'react-router-dom';
import { getAuthData } from './authStorage';

const ProtectedRoute = ({children}) => {
  const {token, role} = getAuthData();
  if(!token || !role){
    return <Navigate to ='/login'/>;
  }

  return children;
}

export default ProtectedRoute