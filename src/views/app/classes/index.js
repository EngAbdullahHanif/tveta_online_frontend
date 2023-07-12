import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ClassRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './class-register')
);

const ClassList = React.lazy(() =>
  import(/* webpackChunkName: "subject-list" */ './class-list/ClassListMain')
);

const Classes = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/classes`} />
      <ProtectedRoute
        path={`${match.url}/classes`}
        component={ClassList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/register`}
        component={ClassRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Classes;
