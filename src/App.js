import React, { Suspense, useEffect, useState } from 'react';
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

const App = ({ locale }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [classes, setClasses] = useState();
  const [subjects, setSubjects] = useState();
  const [departments, setDepartments] = useState();
  const [options, setOptions] = useState({});

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
    console.log('checking token validity');
    const token = localStorage.getItem('access_token');
    console.log('token is:', token);
    if (token) {
      const response = await callApi('auth/token/verify/', 'POST', {
        token: token,
      });
      if (response && response.status >= 200 && response.status <= 299) {
        console.log('token is valid');
      } else {
        console.log('token is invalid. removing it from local storage');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const fetchProvinces = async () => {
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

  const fetchDistricts = async (provinceId) => {
    const response = await callApi(`core/districts/?province`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.native_name,
      }));
      setDistricts(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchClasses = async (provinceId) => {
    const response = await callApi(`institute/classs/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name + '-' + item.section,
      }));
      setClasses(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchSubjects = async (provinceId) => {
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

  // check if token is still valid
  useEffect(async () => {
    checkTokenValidity();
    fetchProvinces();
    fetchDistricts();
    fetchClasses();
    fetchSubjects();
    fetchDepartments();
  }, []);

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
                    {!user ? <Authentication /> : <Application />}
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
