import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Students = React.lazy(() =>
  import(/* webpackChunkName: "students" */ './students')
);

const Teachers = React.lazy(() =>
  import(/* webpackChunkName: "teachers" */ './teachers')
);

const Institutes = React.lazy(() =>
  import(/* webpackChunkName: "institues" */ './institutes')
);

const Subjects = React.lazy(() =>
  import(/* webpackChunkName: "subjects" */ './subjects')
);

const Classes = React.lazy(() =>
  import(/* webpackChunkName: "classes" */ './classes')
);

const Evaluations = React.lazy(() =>
  import(/* webpackChunkName: "evaluation" */ './evaluations')
);

const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/students`}
              render={(props) => <Students {...props} />}
            />
            <Route
              path={`${match.url}/teachers`}
              render={(props) => <Teachers {...props} />}
            />

            <Route
              path={`${match.url}/institutes`}
              render={(props) => <Institutes {...props} />}
            />
            <Route
              path={`${match.url}/subjects`}
              render={(props) => <Subjects {...props} />}
            />

            <Route
              path={`${match.url}/classes`}
              render={(props) => <Classes {...props} />}
            />

            <Route
              path={`${match.url}/evaluations`}
              render={(props) => <Evaluations {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
