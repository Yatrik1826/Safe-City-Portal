import { Navigate } from 'react-router-dom';
import { getRole, isAuthed } from '../utils/auth.js';

export default function ProtectedRoute({ roles, children }) {
  if (!isAuthed()) return <Navigate to="/auth" replace />;
  if (roles && !roles.includes(getRole())) return <Navigate to="/auth" replace />;
  return children;
}
