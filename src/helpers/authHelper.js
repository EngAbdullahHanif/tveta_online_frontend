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

          if (roles.includes('tester')) {
            if (user.groups.map((group) => group.name).includes('tester')) {
              return <Component {...props} roles={roles} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: '/auth/login',
                    state: { from: props.location },
                  }}
                />
              );
            }
          }

          const groups = user?.groups || [];
          console.log('user.groups: ', groups);
          console.log('roles: ', roles);

          const matchingGroups = groups.filter((group) =>
            roles.includes(group.name)
          );
          console.log('matched --------', matchingGroups);
          console.log('component: ', Component.name);
          if (matchingGroups.length !== 0) {
            return <Component {...props} roles={roles} />;
          }

          console.log('could not find user group in roles');
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: {
                  from: props.location,
                  returnPath: roleRoots[groups[0]?.name],
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
