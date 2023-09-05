import React, { useContext, useEffect } from 'react';
import { Row, Card, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { adminRoot } from 'constants/defaultValues';
import { AuthContext } from 'context/AuthContext';
import callApi from 'helpers/callApi';

const Unauthorized = ({ location, ...rest }) => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    setUser(null);
    window.location.href = window.location.origin;
    console.log('clearing from localstorage');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('current_user');
    console.log('calling backend logout');

    const response = await callApi('auth/logout/', 'POST', null);
    console.log('response: ', response);
    // if (response.status === 200) {
    //   console.log('logged out from backend');
    // }
  };

  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  console.log('returnPath: ', location?.state?.returnPath);
  console.log('rest: ', rest);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto m-all-outo">
              <Card className="auth-card">
                <div className="form-side">
                  {/* <NavLink to="/">لوگو </NavLink> */}
                  <CardTitle className="mb-4">
                    <IntlMessages id="unauthorized.title" />
                  </CardTitle>
                  <p className="mb-0 text-muted text-small mb-0">
                    <IntlMessages id="unauthorized.detail" />
                  </p>
                  <p className="display-1 font-weight-bold mb-5">503</p>
                  <div className="d-flex justify-content-between flex-wrap">
                    <NavLink
                      to={location?.state?.returnPath || adminRoot}
                      className="btn btn-primary btn-shadow btn-lg"
                    >
                      <IntlMessages id="pages.go-back-home" />
                    </NavLink>
                    <div classname="pr-2">&nbsp;</div>
                    <button
                      className="btn btn-secondary btn-shadow btn-lg "
                      onClick={handleLogout}
                    >
                      خروج از حساب/ وتل
                    </button>
                  </div>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Unauthorized;
