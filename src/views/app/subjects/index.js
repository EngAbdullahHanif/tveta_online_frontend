import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SubjectRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './subject-register')
);

const Curriculum = React.lazy(() =>
  import(/* webpackChunkName: "curriculum" */ './curriculum')
);
const ProvincialDashboard = React.lazy(() =>
  import(/* webpackChunkName: "provincial-dash" */ './draftFileJustForTest')
);
const AdminDashboard = React.lazy(() =>
  import(/* webpackChunkName: "admin-dashboard" */ './admin-dashboard')
);
const SubjectList = React.lazy(() =>
  import(/* webpackChunkName: "admin-dashboard" */ './subject-list/SubjectListMain')
);
const CurriculumList = React.lazy(() =>
  import(/* webpackChunkName: "admin-dashboard" */ './curriculum-list/CurriculumListMain')
);

const Subjects = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/subjects`} />
      <Route
        path={`${match.url}/register`}
        render={(props) => <SubjectRegister {...props} />}
      />

      <Route
        path={`${match.url}/curriculum`}
        render={(props) => <Curriculum {...props} />}
      />
      <Route
        path={`${match.url}/provincial-dash`}
        render={(props) => <ProvincialDashboard {...props} />}
      />
      <Route
        path={`${match.url}/admin-dashboard`}
        render={(props) => <AdminDashboard {...props} />}
      />
        <Route
        path={`${match.url}/subject-list`}
        render={(props) => <SubjectList {...props} />}
      />
         <Route
        path={`${match.url}/curriculum-list`}
        render={(props) => <CurriculumList {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Subjects;
