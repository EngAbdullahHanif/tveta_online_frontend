import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthGuardActive } from "constants/defaultValues";
import { AuthContext } from "context/AuthContext";

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
          const userRoles = user.groups;
          for (let i = 0; i <= userRoles.length; i++) {
            if (roles.includes(userRoles[i].name)) {
              return <Component {...props} />;
            }
          }

          return (
            <Redirect
              to={{
                pathname: "/unauthorized",
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
            pathname: "/auth/login",
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
