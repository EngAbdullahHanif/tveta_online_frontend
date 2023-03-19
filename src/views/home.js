/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useState, useEffect, useRef } from 'react';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import ReactCardCarousel from 'react-card-carousel';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { scroller } from 'react-scroll';
import Headroom from 'react-headroom';
import GlideComponent from 'components/carousel/GlideComponent';
import { buyUrl, adminRoot } from 'constants/defaultValues';
import logo from '../assets/img/logo2.png';
import CarPhoto from '../assets/img/blog/car.png';
import CarPhotoWithoutBackground from '../assets/img/blog/132.png';
import CarPhoto2 from '../assets/img/blog/car2.png';
import CarPhoto3 from '../assets/img/blog/45.png';
import Shahamat from '../assets/img/blog/9090.JPG';
import Photo55 from '../assets/img/blog/55.jpeg';
import CarPhoto22 from '../assets/img/blog/Car22.png';
import CarPhoto12 from '../assets/img/blog/12.png';
import CarPhoto15 from '../assets/img/blog/15.png';
import CarPhoto13 from '../assets/img/blog/13.png';
import CarPhoto14 from '../assets/img/blog/14.png';
import RahimiPhoto from '../assets/img/blog/Rahimi.jpg';
import Carousel from 'react-grid-carousel';
import CS_Sector from '../assets/img/sectors/CS.jpg';
import SpecialEducationSector from '../assets/img/sectors/Special_Education.png';
import Economic_Sector from '../assets/img/sectors/Economic.jpg';
import Agriculture_Sector from '../assets/img/sectors/agriculture.jfif';
import literature_sector from '../assets/img/sectors/literature.jpg';
import OilAndGas_Sector from '../assets/img/sectors/oil_gas.jpeg';
import civil_Eng from '../assets/img/sectors/civil_Engineering.jpg';
import Industerial from '../assets/img/sectors/Industerial.jpg';
import IndividualIntervalsExample from './carousel';
import DemoCarousel from './../views/app/subjects/draftFileJustForTest';
import ScrollAnimation from 'react-animate-on-scroll';
import IntlMessages from 'helpers/IntlMessages';
import './carousel.css';
import {
  Row,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const contact = [
  {
    icon: 'simple-icon-phone',
    detail: '020656465425',
  },
  {
    icon: 'iconsminds-mail',
    detail: 'tvetaonline@gov.af',
  },
  {
    icon: 'simple-icon-social-facebook',
    detail: 'tvetaonline@gov.af',
  },
];
const contact1 = [
  {
    icon: 'simple-icon-social-twitter',
    detail: 'tvetaonline@gov.af',
  },
  {
    icon: 'simple-icon-social-youtube',
    detail: 'www.tveta.youtube.com',
  },
  {
    icon: 'iconsminds-location-2',
    detail: 'کارته چهار ، کابل ، افغانستان',
  },
];

const slideSettings = {
  type: 'carousel',
  // autoplayInterval: 30000000, // set the autoplayTimeout here
  // autoPlaySpeed: 40000000,
  gap: 30,
  perView: 4,
  hideNav: true,
  // autoplay: true,

  peek: { before: 10, after: 10 },
  breakpoints: {
    600: { perView: 1 },
    992: { perView: 2 },
    1200: { perView: 3 },
  },
};

const slideItems = [
  {
    icon: 'iconsminds-mouse-3',
    title: 'اقتصاد او مدریت',
    detail:
      'برای این گذاشتیم که استفاده ی کامل و حداکثری از قالب بتونین داشته باشید',
  },
  {
    icon: 'iconsminds-mouse-3',
    title: 'علوم حیوانی و وترنری',
    detail: 'با پکیج Video.js کار میکنه و حتی از یوتیوب هم پشتیبانی میکنه',
  },
  {
    icon: 'iconsminds-mouse-3',
    title: 'ادبیات او هنر',
    detail:
      'میانبر های صفحه کلید درست کردیم که هم قابل تنظیمه و هم ux برای کاربرهات بهتر میکنه',
  },
  {
    icon: 'iconsminds-mouse-3',
    title: 'تکنالوؤ',
    detail:
      'یه منو با سه تا مرحله، تا هرجا خواستی ازش استفاده کنی و حتی تو ریسپانسیو هم اذیتت نمیکنه',
  },
  {
    icon: 'iconsminds-mouse-3',
    title: 'پکیج آیکن Mind',
    detail:
      '1040 آیکن توی 53 تا مجموعه, طراحیش پیکسلی هست و توی پروژه برای شما قرار دادیم تا هرکدوم دلت خواست استفاده کنی',
  },
  {
    icon: 'iconsminds-mouse-3',
    title: '20 تا تم رنگی',
    detail:
      'رنگ ها، آیکن ها و طراحی هارمونی که توسط بهترین گرافیستهامون طراحی شدن',
  },
  {
    icon: 'iconsminds-mouse-3',
    title: '3 اپلیکیشن کاربردی',
    detail:
      'برنامه هایی رو برات قرار دادیم که در زمان یه برنامه نویس بشدت صرفه جویی میکنه',
  },
  {
    icon: 'iconsminds-mouse-3',
    title: 'ریسپانسیو قوی و موبایلی',
    detail:
      'کلاسهای سفارشی بوت استرپ 4 xxs & xxl تجربه های بهتری را برای صفحات کوچک و بزرگ ارائه می دهد',
  },
];

const icons = { icon1: 'simple-icon-location-pin' };

const features = [
  {
    title: 'اهداف اداره',
    img: '../assets/img/blog/9090.JPG',
    detail: `معین سیاسی وزارت امور خارجه در دیدار از مرکز نوآوری اداره تعلیمات تخنیکی و مسلکی گفت: افغان‌ها قهرمان همه‌ی عرصه‌ها استند. آنان ثابت ساختند که مستحق پیروزی در هر میدان هستند.
      <br/>
      <br/>
     شیرمحمد عباس ستانکزی، معین سیاسی وزارت امور خارجه گفت «این موتر مورد تبصره جهانی قرار گرفته‌است. و این یک افتخار بزرگ به همه افغان‌ها است.»
      <br/>

      `,
  },
  {
    title: ' لاسته راوړنې',
    img: '/assets/img/landing-page/features/extra-responsive.png',
    detail: `دیدار مولوی محمد یعقوب مجاهد سرپرست وزارت دفاع از مرکز نوآوری اداره تعلیمات تخنیکی و مسلکی افغانستان و موتر ساخته شده در این مرکز !!
    <br/>
دیدار مولوی محمد یعقوب مجاهد سرپرست وزارت دفاع از مرکز نوآوری اداره تعلیمات تخنیکی و مسلکی افغانستان و موتر ساخته شده در این مرکز !!    <br/>
    <br/>
    دیدار مولوی محمد یعقوب مجاهد سرپرست وزارت دفاع از مرکز نوآوری اداره تعلیمات تخنیکی و مسلکی افغانستان و موتر ساخته شده در این مرکز !!
    <br/>
    <br/>
    دیدار مولوی محمد یعقوب مجاهد سرپرست وزارت دفاع از مرکز نوآوری اداره تعلیمات تخنیکی و مسلکی افغانستان و موتر ساخته شده در این مرکز !!
    `,
  },
];

const Home = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const onWindowResize = (event) => {
    const homeRect = refRowHome.current.getBoundingClientRect();

    const homeSection = refSectionHome.current;
    homeSection.style.backgroundPositionX = `${homeRect.x - 580}px`;

    const footerSection = refSectionFooter.current;
    footerSection.style.backgroundPositionX = `${
      event.target.innerWidth - homeRect.x - 2000
    }px`;

    if (event.target.innerWidth >= 992) {
      setShowMobileMenu(false);
    }
  };

  const onWindowClick = () => {
    setShowMobileMenu(false);
  };

  const onWindowScroll = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onWindowClick);

    document.body.classList.add('no-footer');
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('click', onWindowClick);
      document.body.classList.remove('no-footer');
    };
  }, []);

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 40,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
    return false;
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div
        className={classnames('landing-page', {
          'show-mobile-menu': showMobileMenu,
        })}
      >
        <div
          className="mobile-menu"
          onClick={(event) => event.stopPropagation()}
        >
          <a
            className="  c-pointer"
            onClick={(event) => scrollTo(event, 'home')}
          >
            <img src={logo} alt="Logo" />
            <span />
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, 'home')}
              >
                ادراه ما
              </a>
            </li>
            <li className="nav-item">
              <a
                className="c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, 'goals')}
              >
                اهداف
              </a>
            </li>
            <li className="nav-item">
              <a
                className="c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, 'achivements')}
              >
                دستاورد ها
              </a>
            </li>
            <li className="nav-item">
              <a
                className="c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, 'developers')}
              >
                برنامه نویس ها
              </a>
            </li>
            <li className="nav-item">
              <a
                className="c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, 'contact')}
              >
                تماس با ما
              </a>
            </li>
          </ul>
        </div>

        <div className="main-container ">
          <Headroom className="landing-page-nav">
            <nav>
              <div className="container d-flex align-items-center justify-content-between">
                <a
                  className=" pull-left c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'home')}
                >
                  <img src={logo} alt="Logo" />
                </a>
                <ul className="navbar-nav d-none d-lg-flex flex-row">
                  <li className="nav-item">
                    <a
                      className="c-pointer"
                      href="#scroll"
                      onClick={(event) => scrollTo(event, 'home')}
                    >
                      ادراه ما
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="c-pointer"
                      href="#scroll"
                      onClick={(event) => scrollTo(event, 'goals')}
                    >
                      اهداف
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="c-pointer"
                      href="#scroll"
                      onClick={(event) => scrollTo(event, 'achivements')}
                    >
                      دستاورد ها
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="c-pointer"
                      href="#scroll"
                      onClick={(event) => scrollTo(event, 'developers')}
                    >
                      برنامه نویس ها
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="c-pointer"
                      href="#scroll"
                      onClick={(event) => scrollTo(event, 'contact')}
                    >
                      تماس با ما
                    </a>
                  </li>
                </ul>

                <span
                  className="mobile-menu-button"
                  onClick={(event) => {
                    setShowMobileMenu(!showMobileMenu);
                    event.stopPropagation();
                  }}
                >
                  <i className="simple-icon-menu" />
                </span>
              </div>
            </nav>
          </Headroom>
          <div className="content-container">
            <div className="section home " ref={refSectionHome} id="hom">
              <div className="container">
                <div className="row home-row" ref={refRowHome}>
                  <div
                    className="col-s-12 col-12 d-block d-md-none   "
                    style={{ fontSize: '62.5 %' }}
                  >
                    <img
                      src={CarPhoto12}
                      alt="slide 2"
                      style={{
                        borderRadius: '15px',
                        maxWidth: '100%',
                        margin: '5%',
                        opacity: 0.8,
                      }}
                    />
                  </div>

                  <div className="col-12 col-xl-5 col-lg-5 col-md-6">
                    <ScrollAnimation
                      animateIn="fadeInRight"
                      animateOnce={true}
                      duration={2}
                    >
                      <div className="home-text">
                        <div className="display-1 text-bold ">
                          {' '}
                          دتخنیکي او مسلکي زده کړو اداره
                        </div>
                        <p className="white mb-5 text-justify">
                          شناخت و پذیرش تعلیمات تخنیکی و مسلکی و نقش آن در رشد و
                          توسعه اقتصاد ملی نخستین گام ضروری برای بازگشایی دروازه
                          توسعه اقتصاد ملی نخستین گام ضروری برای بازگشایی دروازه
                          توسعه اقتصاد ملی نخستین گام ضروری برای بازگشایی دروازه
                        </p>

                        <a
                          className="btn btn-light btn-xl mr-2 mb-2 mt-5"
                          href={'/user/login'}
                        >
                          ننوتل/ورود <i className="simple-icon-arrow-right" />
                        </a>
                      </div>
                    </ScrollAnimation>
                  </div>

                  <div className="col-12 col-xl-6  col-lg-7 col-md-6 col-s-12  d-none d-md-block rounded">
                    <ScrollAnimation
                      animateIn="fadeInLeft"
                      animateOnce={true}
                      offset={50}
                      duration={2}
                    >
                      {/* <NavLink to="/app/dashboards/default">
                      <IndividualIntervalsExample />
                    </NavLink> */}

                      <img
                        src={CarPhoto12}
                        alt="slide 2"
                        style={{
                          borderRadius: '15px',
                          maxWidth: '100%',
                          margin: '0% 10% 10%',
                          opacity: 0.8,
                        }}
                      />
                    </ScrollAnimation>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="CONTAINER_STYLE col-s-12 col-12  bg-primary"
              style={{
                position: 'relative',
                marginBottom: '400px',
                marginTop: '-500px',
                // backgroundColor: 'important blue',
              }}
            >
              <ReactCardCarousel
                autoplay={true}
                // spread={medium}
                disable_box_shadow={true}
                autoplay_speed={3000}
              >
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    <IntlMessages id="dash.sectorType_1" />
                    <img
                      src={SpecialEducationSector}
                      style={{
                        width: '400px',
                        height: '210px',
                        padding: '15px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    <IntlMessages id="dash.sectorType_2" />
                    <img
                      src={Economic_Sector}
                      style={{
                        width: '400px',
                        height: '235px',
                        padding: '15px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    {' '}
                    <IntlMessages id="dash.sectorType_3" />
                    <img
                      src={Agriculture_Sector}
                      style={{
                        width: '400px',
                        height: '235px',
                        padding: '15px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    {' '}
                    <IntlMessages id="dash.sectorType_4" />
                    <img
                      src={literature_sector}
                      style={{
                        width: '400px',
                        height: '235px',
                        padding: '15px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    {' '}
                    <IntlMessages id="dash.sectorType_5" />
                    <img
                      src={CS_Sector}
                      style={{
                        width: '400px',
                        padding: '15px',
                        // marginInline: '30px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    {' '}
                    <IntlMessages id="dash.sectorType_6" />
                    <img
                      src={OilAndGas_Sector}
                      style={{
                        width: '400px',
                        padding: '15px',
                        height: '235px',
                        // marginInline: '30px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    {' '}
                    <IntlMessages id="dash.sectorType_7" />
                    <img
                      src={civil_Eng}
                      style={{
                        width: '400px',
                        padding: '15px',
                        height: '235px',
                        // marginInline: '30px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    {' '}
                    <IntlMessages id="dash.sectorType_8" />
                    <img
                      src={civil_Eng}
                      style={{
                        width: '400px',
                        padding: '15px',
                        height: '235px',
                        // marginInline: '30px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
                <Card>
                  {' '}
                  <div className="CARD_STYLE text-muted">
                    {' '}
                    <IntlMessages id="dash.sectorType_9" />
                    <img
                      src={Industerial}
                      style={{
                        width: '400px',
                        padding: '15px',
                        height: '235px',
                        // marginInline: '30px',
                        borderRadius: '30px',
                      }}
                    />
                  </div>{' '}
                </Card>
              </ReactCardCarousel>
            </div>

            {/* 
                <ControlledCarousel />
                <div className="row ">
                  <div className="col-s-12 col-12  d-md-block">
                    <div className="home-carousel rounded ">
                      <GlideComponent settings={slideSettings}>
                        {slideItems.map((f, index) => (
                          // eslint-disable-next-line react/no-array-index-key

                          <div key={`slide_${index}`} className="card ">
                            <div className="card-body text-center">
                              <div>
                                <i className={`${f.icon} large-icon`} />
                                <h5 className="font-weight-semibold">
                                  {f.title}
                                </h5>
                              </div>
                              <div>
                                <p className="detail-text">{f.detail}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </GlideComponent>
                    </div>
                  </div>
                </div> */}

            <div className="section">
              <div className="container" id="goals">
                {features.map((feature, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={`feature_${i}`}>
                    {i % 2 === 0 && (
                      <div className="row feature-row">
                        <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                          <ScrollAnimation
                            animateIn="fadeInRight"
                            animateOnce={true}
                            duration={2}
                          >
                            <div className="feature-text-container">
                              <h2>{feature.title}</h2>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: feature.detail,
                                }}
                              />
                            </div>
                          </ScrollAnimation>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative">
                          <ScrollAnimation
                            animateIn="fadeInLeft"
                            animateOnce={true}
                            offset={50}
                            duration={2}
                          >
                            <img
                              alt={feature.title}
                              src={Shahamat}
                              style={{ maxWidth: '100%' }}
                              className="feature-image-right feature-image-charts position-relative rounded"
                            />
                          </ScrollAnimation>
                        </div>
                      </div>
                    )}
                    {i % 2 === 1 && (
                      <div className="row feature-row pt-5" id="achivements">
                        <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1 ">
                          <ScrollAnimation
                            animateIn="fadeInRight"
                            animateOnce={true}
                            duration={2}
                          >
                            <img
                              alt={feature.title}
                              src={CarPhotoWithoutBackground}
                              className="feature-image-left feature-image-charts "
                            />
                          </ScrollAnimation>
                        </div>
                        <div className="col-12 col-md-6 offset-md-0 col-lg-5 offset-lg-1 d-flex align-items-center order-1 order-md-2">
                          <div className="feature-text-container ">
                            <ScrollAnimation
                              animateIn="fadeInLeft"
                              animateOnce={true}
                              duration={2}
                            >
                              <h2>{feature.title}</h2>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: feature.detail,
                                }}
                              />
                            </ScrollAnimation>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <ScrollAnimation
              animateIn="fadeInUp"
              animateOnce={true}
              duration={2}
            >
              <section id="developers">
                <Row className="text-center justify-content-center">
                  <Colxx xxs="8">
                    {' '}
                    <h2>برنامه نویس ها</h2>
                    <p>
                      شناخت و پذیرش تعلیمات تخنیکی و مسلکی و نقش آن در رشد و
                      توسعه اقتصاد ملی نخستین گام ضروری برای بازگشایی دروازه
                      توسعه اقتصاد ملی شناخت و پذیرش تعلیمات تخنیکی و مسلکی و
                      نقش آن در رشد و توسعه اقتصاد ملی نخستین گام ضروری برای
                      بازگشایی دروازه توسعه اقتصاد ملی
                    </p>
                  </Colxx>
                </Row>
                <Row className="justify-content-center m-4 d-flex-block ">
                  {/* Sharif Ahmad */}
                  <Colxx
                    xxs="12"
                    sm="4"
                    md="2"
                    style={{
                      minWidth: '300px',
                      maxWidth: '300px',
                      marginBottom: '3%',
                    }}
                  >
                    <Card
                      style={{ borderRadius: '10px' }}
                      className="containerCard"
                    >
                      {' '}
                      <img
                        src={Photo55}
                        class="developers-member-img"
                        id="img1"
                        style={{ margin: '', width: 'auto' }}
                      />
                      <div className="p-3">
                        <h4 class="developers-member-name text-left pr-4">
                          Sharif Ahmad Rasikh
                          <span>
                            <br />
                            Project Manager
                          </span>
                        </h4>
                        <div className="text-center">
                          <a href="#" class="fa fa-facebook" id="fa"></a>
                          <a href="#" class="fa fa-twitter"></a>
                          <a href="#" class="fa fa-linkedin"></a>
                          <a href="#" class="fa fa-youtube"></a>
                        </div>
                      </div>
                    </Card>
                  </Colxx>
                  {/* Abdullah Hanif */}
                  <Colxx
                    xxs="12"
                    sm="4"
                    md="2"
                    style={{
                      minWidth: '300px',
                      maxWidth: '300px',
                      marginBottom: '3%',
                    }}
                  >
                    <Card
                      style={{ borderRadius: '10px' }}
                      className="containerCard"
                    >
                      {' '}
                      <img
                        src={Photo55}
                        class="developers-member-img"
                        id="img1"
                        style={{ margin: '', width: 'auto' }}
                      />
                      <div className="p-3">
                        <h4 class="developers-member-name text-left pr-4">
                          Abdullah Hanif
                          <span>
                            <br />
                            FullStack Developer
                          </span>
                        </h4>
                        <div className="text-center">
                          <a href="#" class="fa fa-facebook" id="fa"></a>
                          <a href="#" class="fa fa-twitter"></a>
                          <a href="#" class="fa fa-linkedin"></a>
                          <a href="#" class="fa fa-youtube"></a>
                        </div>
                      </div>
                    </Card>
                  </Colxx>
                  {/* Samiullah Rahimi */}
                  <Colxx
                    xxs="12"
                    sm="4"
                    md="2"
                    style={{
                      minWidth: '300px',
                      maxWidth: '300px',
                      marginBottom: '3%',
                    }}
                  >
                    <Card
                      style={{ borderRadius: '10px' }}
                      className="containerCard"
                    >
                      {' '}
                      <img
                        src={RahimiPhoto}
                        class="developers-member-img"
                        id="img1"
                        style={{ margin: '', width: 'auto' }}
                      />
                      <div className="p-3">
                        <h4 class="developers-member-name text-left pr-4">
                          Samiullah Rahimi
                          <span>
                            <br />
                            Frontend Developer
                          </span>
                        </h4>
                        <div className="text-center">
                          <a href="#" class="fa fa-facebook" id="fa"></a>
                          <a href="#" class="fa fa-twitter"></a>
                          <a href="#" class="fa fa-linkedin"></a>
                          <a href="#" class="fa fa-youtube"></a>
                        </div>
                      </div>
                    </Card>
                  </Colxx>
                  {/* Mansoor AhmadZai */}
                  <Colxx
                    xxs="12"
                    sm="4"
                    md="2"
                    style={{
                      minWidth: '300px',
                      maxWidth: '300px',
                      marginBottom: '3%',
                    }}
                  >
                    <Card
                      style={{ borderRadius: '10px' }}
                      className="containerCard"
                    >
                      {' '}
                      <img
                        src={Photo55}
                        class="developers-member-img"
                        id="img1"
                        style={{ margin: '', width: 'auto' }}
                      />
                      <div className="p-3">
                        <h4 class="developers-member-name text-left pr-4">
                          Mansoor Ahmadzai
                          <span>
                            <br />
                            Backend Developer
                          </span>
                        </h4>
                        <div className="text-center">
                          <a href="#" class="fa fa-facebook" id="fa"></a>
                          <a href="#" class="fa fa-twitter"></a>
                          <a href="#" class="fa fa-linkedin"></a>
                          <a href="#" class="fa fa-youtube"></a>
                        </div>
                      </div>
                    </Card>
                  </Colxx>
                  {/* Noman Ahmadi */}
                  <Colxx
                    xxs="12"
                    sm="4"
                    md="2"
                    style={{
                      minWidth: '300px',
                      maxWidth: '300px',
                      marginBottom: '3%',
                    }}
                  >
                    <Card
                      style={{ borderRadius: '10px' }}
                      className="containerCard"
                    >
                      {' '}
                      <img
                        src={Photo55}
                        class="developers-member-img"
                        id="img1"
                        style={{ margin: '', width: 'auto' }}
                      />
                      <div className="p-3">
                        <h4 class="developers-member-name text-left pr-4">
                          Noman Ahmadi
                          <span>
                            <br />
                            Frontend Developer
                          </span>
                        </h4>
                        <div className="text-center">
                          <a href="#" class="fa fa-facebook" id="fa"></a>
                          <a href="#" class="fa fa-twitter"></a>
                          <a href="#" class="fa fa-linkedin"></a>
                          <a href="#" class="fa fa-youtube"></a>
                        </div>
                      </div>
                    </Card>
                  </Colxx>
                </Row>
              </section>
            </ScrollAnimation>
            <div className="section footer mb-0 " ref={refSectionFooter}>
              <div className="container">
                <div className="row footer-row ">
                  <div className="col-12 text-right">
                    <a
                      className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer "
                      href="#scroll"
                      onClick={(event) => scrollTo(event, 'home')}
                    >
                      <i className="simple-icon-arrow-up" />
                    </a>
                  </div>

                  <div className="col-12  text-center">
                    <ScrollAnimation
                      animateIn="fadeInDown"
                      animateOnce={true}
                      duration={2}
                    >
                      <a
                        className="c-pointer "
                        href="#scroll"
                        onClick={(event) => scrollTo(event, 'home')}
                      >
                        <img src={logo} alt="Logo" />
                      </a>
                    </ScrollAnimation>
                  </div>
                </div>
              </div>

              {/* <div className="row" id="con"> */}
              <Row
                className="justify-cntent-center "
                style={{ paddingInline: '10%' }}
                id="contact"
              >
                <Colxx
                  xxs="12"
                  xs="12"
                  sm="12"
                  md="5"
                  lg="4"
                  style={{
                    marginBottom: '3%',
                  }}
                >
                  <ScrollAnimation
                    animateIn="fadeInRight"
                    animateOnce={true}
                    duration={2}
                  >
                    <div class=" mb-5 " style={{ opacity: 0.8 }}>
                      <form>
                        <input
                          type="text"
                          id="fname"
                          name="firstname"
                          placeholder="Your name.."
                          style={{ borderRadius: '10px' }}
                        />

                        <input
                          type="text"
                          id="lname"
                          name="email"
                          placeholder="email Address"
                          style={{ borderRadius: '10px' }}
                        />
                        <textarea
                          id="subject"
                          name="subject"
                          placeholder="your message"
                          style={{ borderRadius: '10px' }}
                          rows={3}
                        ></textarea>
                        <input
                          type="submit"
                          value="Submit"
                          className="bg-primary text-center btn-btn"
                        />
                      </form>
                    </div>
                  </ScrollAnimation>
                </Colxx>

                <Colxx
                  xxs="12"
                  xs="12"
                  sm="12"
                  md="5"
                  lg="4"
                  style={{
                    marginBottom: '3%',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <div className="pl-2 m-4">
                    <ScrollAnimation
                      animateIn="fadeInLeft"
                      animateOnce={true}
                      duration={2}
                    >
                      <h3 className="text-white">پل ارتباطی </h3>
                      {contact.map((d) => (
                        <div className="contact-container">
                          <div>
                            <b style={{ paddingLeft: '5px ' }}>
                              {' '}
                              <i className={`${d.icon} `} />
                            </b>{' '}
                          </div>
                          <div>
                            {' '}
                            <p
                              style={{ fontSize: '15px' }}
                              className="text-white"
                            >
                              {d.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </ScrollAnimation>
                  </div>

                  <div style={{ paddingTop: '66px' }}>
                    <ScrollAnimation
                      animateIn="fadeInLeft"
                      animateOnce={true}
                      duration={2}
                    >
                      {contact1.map((d) => (
                        <div className="contact-container ">
                          <div>
                            <b style={{ paddingLeft: '5px ' }}>
                              {' '}
                              <i className={`${d.icon} `} />
                            </b>{' '}
                          </div>
                          <div>
                            {' '}
                            <p
                              style={{ fontSize: '15px' }}
                              className="text-white"
                            >
                              {d.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </ScrollAnimation>
                  </div>
                </Colxx>
              </Row>

              <div className="col-12  pb-4" style={{ paddingInline: '10%' }}>
                <Row>
                  <Colxx xxs="12" sm="3">
                    <p className="mb-0 text-muted">
                      د تخنیکی او مسلکی زده کړو اداره
                    </p>
                  </Colxx>
                  <Colxx>
                    <p className=" mb-0 text-muted ">
                      اداره تعلیمات تخنیکی و مسلکی
                    </p>
                  </Colxx>
                  <Colxx className="col-sm-6 d-none d-sm-block">
                    <p className="mb-0 text-muted">
                      Technical and Vocational Education and Training Authority
                    </p>
                  </Colxx>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center p-3">
          © Copyright 2035 TVETA-Online - All Rights Reserved
        </div>
      </div>
    </>
  );
};

export default Home;
