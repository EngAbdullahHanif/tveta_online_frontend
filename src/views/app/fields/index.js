import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FieldRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './field-register')
);

const Fields = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fields`} />
      <Route
        path={`${match.url}/register`}
        render={(props) => <FieldRegister {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Fields;
