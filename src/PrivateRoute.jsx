import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (userDetails && userDetails.userName === 'admin' && userDetails.password === 'Admin121437qwert!') {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
