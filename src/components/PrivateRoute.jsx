
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const hasRequiredRole = token && roles.includes(userRole);

  return hasRequiredRole ? Element : <Navigate to="/login" />;
};

export default PrivateRoute;
