import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    routeProps?: RouteProps;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if the user is authenticated

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;