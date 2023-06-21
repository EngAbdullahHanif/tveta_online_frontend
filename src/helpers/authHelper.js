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
    console.log(props, "propssssssssssssssssssssssssssssssssssssssssss");
    if (isAuthGuardActive) {
      if (user) {
        if (roles) {
          // console.log('roles of protected', roles)
          if (roles.includes(Number(user.role))) {
            return <Component {...props} />;
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
            pathname: "/user/login",
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
