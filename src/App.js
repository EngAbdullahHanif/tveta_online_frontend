import React, {
  StrictMode,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive } from './constants/defaultValues';
import { getDirection, getCurrentUser } from './helpers/Utils';
import { AuthContext } from './context/AuthContext';
import Application from 'context/Application';
import Authentication from 'context/Authentication';
import callApi from 'helpers/callApi';
import { Button, Spinner } from 'reactstrap';


const App = ({ locale }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {}
  );
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [contextFields, setContextFields] = useState([]);
  const [dorms, setDorms] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [options, setOptions] = useState({});
  const token = localStorage.getItem('access_token') ? true : false;
  const [isTokenValid, setIsTokenValid] = useState(token);
  const [settings, setSettings] = useState({ current_educational_year: 1390 });
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [fromSuccessfulLogin, setFromSuccessfulLogin] = useState(false);
  const handleLogout = async () => {
    // logoutUserAction(history);
    setUser(null);
    window.location.href = window.location.origin;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('current_user');

    const response = await callApi('auth/logout/', 'POST', null);
    if (response?.status === 200) {
      console.log('logged out from backend');
    }
  };

  const getUser = async () => {
    callApi('auth/user/')
      .then((response) => {
        if (response.status == 200) {
          setUser(response.data);
        }
      })
      .catch((error) => console.log('error: ', error));
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
      return;
    }

    if (response.status >= 200 && response.status <= 299) {
      console.log('Token is valid');
      setIsTokenValid(true);
    } else {
      removeUserAndToken();
    }
  };

  const removeUserAndToken = () => {
    console.log('Removing token and user from local storage');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const verifyToken = async (token) => {
    try {
      const response = await callApi('auth/token/verify/', 'POST', {
        token: token,
      });
      return response;
    } catch (error) {
      if (error?.response?.status === 401) {
        removeUserAndToken();
      }
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
        label: item.name,
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
    const response = await callApi(`institute/all/`, 'GET', null);
    if (response.data && response.status === 200) {
      console.log('response.data: ', response.data);

      const updatedData = await response.data.map(({ id, name, ...rest }) => ({
        value: id,
        label: name,
        rest: rest,
      }));
      console.log('updatedData: ', updatedData);
      setInstitutes(updatedData);
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

  // localstorage
  const fetchSectors = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/sectors/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.sector,
      }));
      setSectors(updatedData);
    } else {
      console.log('Sector error');
    }
  };
  const fetchDorms = async () => {
    const response = await callApi(`institute/dorms/`, '', null);
    if (response?.data && response.status === 200) {
      const updatedData = await response?.data.results.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDorms(updatedData);
    } else {
      console.log('dorm  error');
    }
  };
  const fetchInitialData = async () => {
    try {
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
        fetchDorms(),
      ]);
    } catch (error) {
      console.log('Error fetching initial data: ', error);
    } finally {
      setIsLoadingInitialData(false);
    }
  };

  useEffect(() => {
    if (fromSuccessfulLogin) {
      setIsTokenValid(true);
      return;
    }
    checkTokenValidity();
  }, [fromSuccessfulLogin]);

  useEffect(async () => {
    if (isTokenValid) {
      fetchInitialData();
    }
  }, [isTokenValid]);

  const InitialDataSpinner = () => {
    return (
      // make this at center of screen
      <div className="text-center ">
        <Spinner />;
        <p>
          اولیه ډاټا ښکته کول په جریان کې دي. / دانلود داتا اولیه در جریان است
        </p>
      </div>
    );
  };

  const NoGroupScreen = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: 400, width: '100%' }}>
        <h1>
          شما در هیچ گروپی نیستید. لطفاً با آدمین تان تماس بگیرید/ تاسو هیڅ ګروپ
          نلری،‌مهربانی وکړی له اډمین سره اړیکه ونیسی.‌
        </h1>
        <br />
        <Button onClick={handleLogout}>وتل/خروج از حساب</Button>
      </div>
    );
  };

  let content;

  if (!isTokenValid) {
    content = <Authentication />;
  } else {
    if (isLoadingInitialData) {
      content = <InitialDataSpinner />;
    } else if (user?.groups?.length > 0) {
      content = <Application />;
    } else {
      content = <NoGroupScreen />;
    }
  }

  return (
    <StrictMode>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          setFromSuccessfulLogin,
          provinces,
          districts,
          classes,
          fetchClasses,
          subjects,
          departments,
          institutes,
          fetchInstitutes,
          contextFields,
          settings,
          sectors,
          dorms,
        }}
      >
        <div className="h-100">
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <>
              <NotificationContainer />
              {isMultiColorActive && <ColorSwitcher />}
              <Suspense fallback={<div className="loading" />}>
                <Router>{content}</Router>
              </Suspense>
            </>
          </IntlProvider>
        </div>
      </AuthContext.Provider>
    </StrictMode>
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
