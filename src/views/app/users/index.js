import React, { Suspense } from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';
import UsersList from './users-list';
const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards'),
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages'),
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications'),
);
const Students = React.lazy(() =>
  import(/* webpackChunkName: "students" */ './students'),
);

const Teachers = React.lazy(() =>
  import(/* webpackChunkName: "teachers" */ './teachers'),
);

const Institutes = React.lazy(() =>
  import(/* webpackChunkName: "institues" */ './institutes'),
);

const Subjects = React.lazy(() =>
  import(/* webpackChunkName: "subjects" */ './subjects'),
);

const Classes = React.lazy(() =>
  import(/* webpackChunkName: "classes" */ './classes'),
);

const Fields = React.lazy(() =>
  import(/* webpackChunkName: "fields" */ './fields'),
);
const Evaluations = React.lazy(() =>
  import(/* webpackChunkName: "evaluation" */ './evaluations'),
);
const HREvaluations = React.lazy(() =>
  import(/* webpackChunkName: "hr-evaluation" */ './hr-evaluation'),
);

const Dorms = React.lazy(() =>
  import(/* webpackChunkName: "dorms" */ './dorms'),
);

const Workers = React.lazy(() =>
  import(/* webpackChunkName: "workers" */ './workers'),
);

const Groups = React.lazy(() =>
  import(/* webpackChunkName: "group" */ './group'),
);

const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page'),
);

const App = ({ match, props }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
            <ProtectedRoute
              path={`${match.url}/users`}
              component={UsersList}
              props={props}
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
