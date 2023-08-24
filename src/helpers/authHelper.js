import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from 'constants/defaultValues';
import { AuthContext } from 'context/AuthContext';
import { roleRoots } from 'constants/defaultValues';

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const { user } = useContext(AuthContext);
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      if (user) {
        if (roles) {
          // if a route is allowed for all logged-in users, allow them
          if (roles.includes('authenticated')) {
            return <Component />;
          }
          console.log('roles are', roles);
          const groups = user?.groups;
          console.log('groups are', groups);
          console.log('groups[0].name', groups[0].name);
          for (let i = 0; i < groups.length; i++) {
            console.log('groups inside loop', groups, i);
            if (roles.includes(groups[i].name)) {
              return <Component {...props} />;
            }
          }
          console.log('could not found user group in roles');
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: {
                  from: props.location,
                  returnPath: roleRoots[user.groups[0].name],
                },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }
      return (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: props.location },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
