import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DormList = React.lazy(() =>
  import(/* webpackChunkName: "dorm-list" */ './dorm-list/DormListMain')
);

const DormRegister = React.lazy(() =>
  import(/* webpackChunkName: "dorm-register" */ './dorm-register')
);

const StudentDormList = React.lazy(() =>
  import(
    /* webpackChunkName: "student-dorm-list" */ './dorm-students-list/DormStudentsListMain'
  )
);

const StudentRegistrationInDorm = React.lazy(() =>
  import(
    /* webpackChunkName: "student-register" */ './student-register-in-dorm'
  )
);

const DormDetails = React.lazy(() =>
  import(/* webpackChunkName: "details" */ './dorm-details')
);

const Dorms = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dorms`} />
      <Route
        path={`${match.url}/dorms`}
        render={(props) => <DormList {...props} />}
      />
      <Route
        path={`${match.url}/register`}
        render={(props) => <DormRegister {...props} />}
      />
      <Route
        path={`${match.url}/students`}
        render={(props) => <StudentDormList {...props} />}
      />
      <Route
        path={`${match.url}/student-register`}
        render={(props) => <StudentRegistrationInDorm {...props} />}
      />
      <Route
        path={`${match.url}/details`}
        render={(props) => <DormDetails {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dorms;
