import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FieldRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './field-register')
);
const FieldList = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './field-list/FieldListMain')
);
const DepartmentRegistration = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './DepartmentRegstration')
);
const DepartmentList = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './department-list/DepartmentListMain')
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
        path={`${match.url}/field-list`}
        render={(props) => <FieldList {...props} />}
      />
       <Route
        path={`${match.url}/department-registration`}
        render={(props) => <DepartmentRegistration {...props} />}
      />
       <Route
        path={`${match.url}/department-list`}
        render={(props) => <DepartmentList {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Fields;
