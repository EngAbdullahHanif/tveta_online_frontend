import React, { Suspense, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive } from './constants/defaultValues';
import { getDirection, getCurrentUser } from './helpers/Utils';
import {
  AuthContext,
  ProvincesContext,
  DistrictsContext,
} from './context/AuthContext';
import Application from 'context/Application';
import Authentication from 'context/Authentication';
import callApi from 'helpers/callApi';
import { Button, Spinner } from 'reactstrap';

const App = ({ locale }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [contextFields, setContextFields] = useState();
  const [sectors, setSectors] = useState([]);
  const [options, setOptions] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [settings, setSettings] = useState({ current_educational_year: 1390 });
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const handleLogout = async () => {
    // logoutUserAction(history);
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

  const getUser = async () => {
    callApi('auth/user/').then((response) => {
      if (response.status == 200) {
        setUser(response.data);
      }
    });
  };

  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  const checkTokenValidity = async () => {
    setIsTokenValid(false);
    console.log('Checking token validity');

    const token = localStorage.getItem('access_token');
    console.log('Token is:', token);

    if (!token) {
      removeUserAndToken();
      return;
    }

    const response = await verifyToken(token);

    if (!response) {
      console.log('Cannot connect to the server');
      removeUserAndToken();
      return;
    }

    if (response.status >= 200 && response.status <= 299) {
      console.log('Token is valid');
      setIsTokenValid(true);
    } else {
      handleInvalidToken();
    }
  };

  const removeUserAndToken = () => {
    console.log('Removing token and user from local storage');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleInvalidToken = () => {
    console.log('Token is invalid. Removing it from local storage');
    removeUserAndToken();
  };

  const verifyToken = async (token) => {
    try {
      const response = await callApi('auth/token/verify/', 'POST', {
        token: token,
      });
      return response;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  };

  const fetchProvinces = async () => {
    if (!user) return;
    const response = await callApi('core/provinces/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.native_name,
      }));

      setProvinces(updatedData);
      setOptions((prevOptions) => ({ ...prevOptions, provinces: updatedData }));
    } else {
      console.log('province error');
    }
  };

  const fetchDistricts = async () => {
    if (!user) return;
    const response = await callApi(`core/districts/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.native_name,
        province: item.province,
      }));
      setDistricts(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchClasses = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/classs/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name + '-' + item.semester + '-' + item.section,
        grade: item.grade,
        semester: item.semester,
      }));
      setClasses(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchSubjects = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/subject/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSubjects(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchDepartments = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/department/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartments(updatedData);
    } else {
      console.log('district error');
    }
  };
  const fetchInstitutes = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map(({ id, name, ...rest }) => ({
        value: id,
        label: name,
        rest: rest,
      }));
      setInstitutes(updatedData);
      console.log('institues fetched in app.js: ', response.data);
    } else {
      console.log('institutes error');
    }
  };
  const fetchFields = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/field/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setContextFields(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchSectors = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/sectors/`, 'GET', null);
    if (response.data && response.status === 200) {
      console.log('SECTS: ', response.data);
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.sector,
      }));
      setSectors(updatedData);
    } else {
      console.log('Sector error');
    }
  };

  const fetchInitialData = async () => {
    // check token validity
    if (!isTokenValid) {
      return;
    }

    await Promise.all([
      fetchProvinces(),
      fetchDistricts(),
      fetchClasses(),
      fetchSubjects(),
      fetchDepartments(),
      fetchInstitutes(),
      fetchFields(),
      getUser(),
      fetchSectors(),
    ]).finally(() => {
      setIsLoadingInitialData(false);
    });
  };

  // check if token is still valid
  useEffect(() => {
    checkTokenValidity();
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [isTokenValid]);

  if (isLoadingInitialData) {
    return (
      // make this at center of screen
      <div className="text-center ">
        <Spinner />;
        <p>
          اولیه ډاټا ښکته کول په جریان کې دي. / دانلود داتا اولیه در جریان است
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        provinces,
        districts,
        classes,
        subjects,
        departments,
        institutes,
        contextFields,
        settings,
        sectors,
      }}
    >
      <ProvincesContext.Provider value={{ provinces }}>
        <DistrictsContext.Provider value={{ districts }}>
          <div className="h-100">
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}
            >
              <>
                <NotificationContainer />
                {isMultiColorActive && <ColorSwitcher />}
                <Suspense fallback={<div className="loading" />}>
                  <Router>
                    {!user ? (
                      <Authentication />
                    ) : user.groups.length > 0 ? (
                      <Application />
                    ) : (
                      <div
                        style={{
                          textAlign: 'center',
                          marginTop: 400,
                          width: '100%',
                        }}
                      >
                        <h1>
                          شما در هیچ گروپی نیستید. لطفاً با آدمین تان تماس
                          بگیرید/ تاسو هیڅ ګروپ نلری،‌مهربانی وکړی له اډمین سره
                          اړیکه ونیسی.‌
                        </h1>
                        <br />
                        <Button onClick={handleLogout}>وتل/خروج از حساب</Button>
                      </div>
                    )}
                  </Router>
                </Suspense>
              </>
            </IntlProvider>
          </div>
        </DistrictsContext.Provider>
      </ProvincesContext.Provider>
    </AuthContext.Provider>
  );
};

const mapStateToProps = ({ authUser, settings }) => {
  // const { currentUser } = authUser;
  const currentUser = getCurrentUser();

  // const { currentUser } = '';

  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
