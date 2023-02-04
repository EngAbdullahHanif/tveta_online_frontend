import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FieldRegister = React.lazy(() =>
  import(/* webpackChunkName: "field-register" */ './field-register')
);

const DepartmentRegister = React.lazy(() =>
  import(/* webpackChunkName: "department-register" */ './department-register')
);

const InstituteFieldDepartmentRegister = React.lazy(() =>
  import(
    /* webpackChunkName: "institute-field-department-register" */ './institute-field-department-register'
  )
);

const Fields = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fields`} />
      <Route
        path={`${match.url}/register`}
        render={(props) => <FieldRegister {...props} />}
      />
      <Route
        path={`${match.url}/department-register`}
        render={(props) => <DepartmentRegister {...props} />}
      />

      <Route
        path={`${match.url}/institute-field-department-register`}
        render={(props) => <InstituteFieldDepartmentRegister {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Fields;
