import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from 'constants/defaultValues';
import { getCurrentUser } from './Utils';

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    console.log(props, 'propssssssssssssssssssssssssssssssssssssssssss');
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      // console.log('currentUser of protected', currentUser.role)
      if (currentUser) {
        if (roles) {
          // console.log('roles of protected', roles)
          if (roles.includes(Number(currentUser.role))) {
            return <Component {...props} />;
          }
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
