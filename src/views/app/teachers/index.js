import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const TeacherList = React.lazy(() =>
  import(/* webpackChunkName: "teacher-list" */ './bio/teacher-list/TeacherListMain')
);

const Teachers = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/teachers`} />
      <Route
        path={`${match.url}/teachers`}
        render={(props) => <TeacherList {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Teachers;
