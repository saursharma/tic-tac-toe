import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from './auth';

function PrivateRoute({ children }) {
    const isAuthenticateduth = auth.getAuthStatus();
    return isAuthenticateduth ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;