/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useState, useEffect, useRef } from 'react';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { scroller } from 'react-scroll';
import Headroom from 'react-headroom';
import GlideComponent from 'components/carousel/GlideComponent';
import { buyUrl, adminRoot } from 'constants/defaultValues';
import logo from '../assets/img/logo2.png';

const slideSettings = {
  type: 'carousel',
  gap: 30,
  perView: 4,
  hideNav: true,
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
    title: 'منوی کلیک راست',
    detail:
      'برای این گذاشتیم که استفاده ی کامل و حداکثری از قالب بتونین داشته باشید',
  },
  {
    icon: 'iconsminds-electric-guitar',
    title: 'ویدئو پلیر',
    detail: 'با پکیج Video.js کار میکنه و حتی از یوتیوب هم پشتیبانی میکنه',
  },
  {
    icon: 'iconsminds-keyboard',
    title: 'شورتکات صفحه کلید',
    detail:
      'میانبر های صفحه کلید درست کردیم که هم قابل تنظیمه و هم ux برای کاربرهات بهتر میکنه',
  },
  {
    icon: 'iconsminds-three-arrow-fork ',
    title: 'منو با دوتا پنل',
    detail:
      'یه منو با سه تا مرحله، تا هرجا خواستی ازش استفاده کنی و حتی تو ریسپانسیو هم اذیتت نمیکنه',
  },
  {
    icon: 'iconsminds-deer',
    title: 'پکیج آیکن Mind',
    detail:
      '1040 آیکن توی 53 تا مجموعه, طراحیش پیکسلی هست و توی پروژه برای شما قرار دادیم تا هرکدوم دلت خواست استفاده کنی',
  },
  {
    icon: 'iconsminds-palette',
    title: '20 تا تم رنگی',
    detail:
      'رنگ ها، آیکن ها و طراحی هارمونی که توسط بهترین گرافیستهامون طراحی شدن',
  },
  {
    icon: 'iconsminds-air-balloon-1',
    title: '3 اپلیکیشن کاربردی',
    detail:
      'برنامه هایی رو برات قرار دادیم که در زمان یه برنامه نویس بشدت صرفه جویی میکنه',
  },
  {
    icon: 'iconsminds-resize',
    title: 'ریسپانسیو قوی و موبایلی',
    detail:
      'کلاسهای سفارشی بوت استرپ 4 xxs & xxl تجربه های بهتری را برای صفحات کوچک و بزرگ ارائه می دهد',
  },
];

const features = [
  {
    title: 'طراحی ساده ولی دلنشین',
    img: '/assets/img/landing-page/features/plesant-design.png',
    detail: `بعنوان یه برنامه نویس، تجربه ای که دارم اینه که هررررررچقدرم خوب کد بزنی تا وقتی که ظاهر سایتت خوب نباشه، مشتری یا کاربر متوجه زحمتهات نمیشه!!
      <br/>
      <br/>
      طراحی خوب همیشه ضرورت نیست، ولی وقتی محصول نهایی به چشم کاربر یا مشتری، زیبا باشه، انگیزه ی قشنگی برای ما ایجاد میشه
      <br/>
      <br/>
      ناگفته نمونه که ماهم برای اینکه قالب گوگو به این حد از محبوبیت برسه زمان زیادی رو برای آیکن ها و هماهنگی رنگها صرف کردیم
      <br/>
      <br/>
      و اولین چیزی که در این پروسه الویت کار خودمون قرار دادیم، ux کاربرهامون بوده
      `,
  },
  {
    title: 'ریسپانسیو میدونی تا کجاست؟',
    img: '/assets/img/landing-page/features/extra-responsive.png',
    detail: `نقطه ی Xxs برای دستگاه های خیلی کوچیکه که کمتر از 420 پیکسل رزولوشن دارند
    <br/>
    نقطه ی Xs بین رزولوشن های 420 پیکسل تا 567 پیکسل کار میکنه
    <br/>
    نقطه ی Xl برای کامپیوترهای معمولی که رزولوشن بیت 1200 تا 1440 پیکسل دارند کار میکنه
    <br/>
    و چیزی که براتون اضافه کردیم نقطه ی Xxl برای صفحه نمایش های بزرگتر با رزولوشن بیش از 1440 پیکسل کار میکنه
    <br/>
    <br/>
    هدف ما از ایجاد این قابلیت های ریسپانسیو این بوده که هم تجربه ی کاربری یا (UX) بهتری رو به کاربرهامون انتقال بدیم و هم انعطاف استفاده از دستگاه ها رو برای کار با قالب راحت تر کنیم
    `,
  },
  {
    title: 'درباره چارت ها بخونین',
    img: '/assets/img/landing-page/features/superfine-charts.png',
    detail: `یه باور عمومی داریم که میگه استفاده از چارت ها باعث میشه که داده ها و اطلاعاتو راحت تر مجسم کنیم
    <br/>
    نمیگم نمودارها بد هستن..! اصلا.. اونها خیلی هم عالی هستن
    <br/>
    ولی به نظر من نموداری خوبه که استفاده ازش راحت باشه، هم برای برنامه نویس هم کاربری که قراره اونو ببینه
    <br/>
    باید رنگهاش به قالب بیاد و هماهنگ باشه
    <br/>
    نمودار باید ریسپانسیو باشه یا تمام قابلیت هاش قابل تنظیم باشه
    <br/>
    میدونی چرا اینا رو میگم؟! چون ما همشو توی گوگو داریم 😎
    <br/>
    <br/>
    ما فقط از یک پکیج برای ایجاد نمودارها استفاده کردیم و هم سعی کردیم ساده باشند و هم با تمام رنگ بندی های قالب هماهنگ باشه
    <br/>
    میتونین همین الان رنگ تم رو عوض کنین و نمودارها رو در رنگهای دیگه هم ببینید
    `,
  },
  {
    title: 'طرح بندی حتی برای کسب و کار',
    img: '/assets/img/landing-page/features/layouts-for-the-job.png',
    detail: `
    توی داستان گوگو، یکی از چیزهایی که ما براش در نظر گرفتیم پرسونای کاربرهامون بود. عیعنی ما دوست داشتیم که بتونیم مخاطبانی که هدف ما هستند بیشتر باشه
    <br/>
    مثلا یک نفر یک قالب مینویسه با موضوع فروشگاهی، خب مشخصه مخاطبانی که هدفش هستند کسانی هستند که تصمیم دارند فروشگاه بسازن
    <br/>
    ماهم توی فرآیند ساخت این قالب افرادی رو درنظر گرفتیم که تصمیم دارن از این قالب برای مدیریت کسب و کار خودشون استفاده کنن
    <br/>
    تمام لایوت ها رو طوری درنظر گرفتیم که حتی کاربران با دانش فنی پایین هم بتونن به فهم و درک خوبی از کارکرد قالب برسند
    <br/>
    حتی برای بیزینس های مختلف، طرح های مختلفی قراردادیم.`,
  },
  {
    title: 'منوی هوشمند',
    img: '/assets/img/landing-page/features/smart-menu.png',
    detail: `
    انصافا بیاین قبول کنیم که توی پنل های مدیریت، دیگه استفاده از منوهای آکاردئونی یه چیز قدیمی و تکراری شده
    <br/>
    بیاین ببینین ما چه کررررررردیم تو گوگو
    <br/>
    به جای این تکراری بازی ها و اسکی رفتن ها، ما دوتا پنل ایجاد کردیم و صفحات رو بر اساس اون دسته بندی کردیم
    <br/>
    اسمشو <strong>منوی هوشمند</strong> گذاشتم؛ چونکه:
    <br/>
    <br/>
    <ul>
    <li>1. خودتون میتونین تنظیم کنین که کدوم پنلش توی چه سایزی باز یا بسته باشه</li>
    <li> 2. خود منو تشخیص میده توی این سایز ریسپانسیوی که قرار داره، کدوم پنلش رو مخفی کنه یا کدوم رو نمایش بده</li>
    </ul>
    `,
  },
];

const layouts = [
  {
    title: 'منو پیش فرض',
    img: '/assets/img/landing-page/layouts/menu-default.jpg',
  },
  {
    title: 'زیرمنو مخفی',
    img: '/assets/img/landing-page/layouts/menu-subhidden.jpg',
  },
  {
    title: 'منو مخفی',
    img: '/assets/img/landing-page/layouts/menu-hidden.jpg',
  },
  { title: 'لیست عکس', img: '/assets/img/landing-page/layouts/image-list.jpg' },
  {
    title: 'لیست Thumb',
    img: '/assets/img/landing-page/layouts/thumb-list.jpg',
  },
  { title: 'دیتا لیست', img: '/assets/img/landing-page/layouts/data-list.jpg' },
  { title: 'جزئیات', img: '/assets/img/landing-page/layouts/details.jpg' },
  {
    title: 'احراز هویت',
    img: '/assets/img/landing-page/layouts/authentication.jpg',
  },
  {
    title: 'نتایج جستجو',
    img: '/assets/img/landing-page/layouts/search-result.jpg',
  },
  {
    title: 'اپلیکیشن SPA',
    img: '/assets/img/landing-page/layouts/spa.jpg',
  },
  {
    title: 'دیتا لیست با منو مخفی',
    img: '/assets/img/landing-page/layouts/data-list-app-menu-hidden.jpg',
  },
  { title: 'تب ها', img: '/assets/img/landing-page/layouts/tabs.jpg' },
];

const applications = [
  {
    title: 'نظرسنجی',
    path: `${adminRoot}/applications/survey`,
    img: '/assets/img/landing-page/applications/survey.jpg',
  },
  {
    title: 'چت',
    path: `${adminRoot}/applications/chat`,
    img: '/assets/img/landing-page/applications/chat.jpg',
  },
  {
    title: 'وظایف - Todo',
    path: `${adminRoot}/applications/todo`,
    img: '/assets/img/landing-page/applications/todo.jpg',
  },
];

const themes = [
  { title: 'Navy Blue', class: 'bluenavy' },
  { title: 'Olympic Blue', class: 'blueolympic' },
  { title: 'Yale Blue', class: 'blueyale' },
  { title: 'Moss Green', class: 'greenmoss' },
  { title: 'Lime Green', class: 'greenlime' },
  { title: 'Carrot Orange', class: 'carrotorange' },
  { title: 'Ruby Red', class: 'rubyred' },
  { title: 'Monster Purple', class: 'monsterpurple' },
  { title: 'Steel Grey', class: 'steelgrey' },
  { title: 'Granola Yellow', class: 'granolayellow' },
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
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
    return false;
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div
      className={classnames('landing-page', {
        'show-mobile-menu': showMobileMenu,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
        <a
          className="logo-mobile c-pointer"
          href="#scroll"
          onClick={(event) => scrollTo(event, 'home')}
        >
          <span />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'features')}
            >
              ویژگی ها
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'layouts')}
            >
              طرح بندی
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'components')}
            >
              کامپوننت ها
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'apps')}
            >
              برنامه ها
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'themes')}
            >
              تم های قالب
            </a>
          </li>
          <li className="nav-item">
            <div className="separator" />
          </li>
          <li className="nav-item text-center">
            <a
              className="btn btn-outline-primary btn-sm mobile-menu-cta"
              target="_blank"
              rel="noopener noreferrer"
              href={buyUrl}
            >
              خرید قالب
            </a>
          </li>
        </ul>
      </div>

      <div className="main-container">
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
                    onClick={(event) => scrollTo(event, 'features')}
                  >
                    ادراه ما
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'layouts')}
                  >
                    فعالیت ها
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'components')}
                  >
                    معلومات دیگر
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'apps')}
                  >
                    برنامه ها
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'themes')}
                  >
                    تماس با ما
                  </a>
                </li>
                {/* <li className="nav-item pl-4">
                  <a
                    className="btn btn-outline-semi-light btn-sm pr-4 pl-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={buyUrl}
                  >
                    خرید قالب
                  </a>
                </li> */}
              </ul>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
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
        <div className="content-container" id="home">
          <div className="section home" ref={refSectionHome}>
            <div className="container">
              <div className="row home-row" ref={refRowHome}>
                <div className="col-12 d-block d-md-none">
                  <NavLink to="/">
                    <img
                      alt="mobile hero"
                      className="mobile-hero"
                      src="/assets/img/landing-page/home-hero-mobile.png"
                    />
                  </NavLink>
                </div>

                <div className="col-12 col-xl-4 col-lg-5 col-md-6">
                  <div className="home-text">
                    <div className="display-1 text-bold">
                      {' '}
                      جادوی کارِ ما رو <br />
                      توی جزئیاتش ببین
                    </div>
                    <p className="white mb-5">
                      قالب گوگو یه ترکیبی از نهایت خلاقیت یه گرافیست، کدزنی و
                      خود زنی یه برنامه نویس و نهایت تلاش یک ux کار هست
                      <br />
                      <br />
                      درسته که قالب اجزا و صفحات زیادی داره ولی سعی کردیم از
                      زبانها و تنولوژی هایی استفاده کنیم که یکسان باشند <br />
                      <br />
                      دموی قالب رو ببین حتما ازش خوشت میاد 😊
                    </p>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a
                      className="btn btn-light btn-xl mr-2 mb-2"
                      href={adminRoot}
                      target="_blank"
                    >
                      ننوتل/ورود <i className="simple-icon-arrow-right" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-xl-7 offset-xl-1 col-lg-7 col-md-6  d-none d-md-block">
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={adminRoot} target="_blank">
                    <img
                      alt="hero"
                      src="/assets/img/landing-page/home-hero.png"
                    />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="col-12 p-0">
                  <div className="home-carousel">
                    <GlideComponent settings={slideSettings}>
                      {slideItems.map((f, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={`slide_${index}`} className="card">
                          <div className="card-body text-center">
                            <div>
                              <i className={`${f.icon} large-icon`} />
                              <h5 className="mb-3 font-weight-semibold">
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
              </div>

              <div className="row">
                <a
                  className="btn btn-circle btn-outline-semi-light hero-circle-button"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'features')}
                >
                  <i className="simple-icon-arrow-down" />
                </a>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="container" id="features">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>ویژگی ها تو یه نظر</h1>
                  <p>
                    ما قبل از اینکه این قالب رو بنویسیم، به این فکر کردیم که
                    خودمون بعنوان برنامه نویس، چه نیازها و انتظاراتی از یه قالب
                    مدیرت میتونیم داشته باشیم؟!
                    <br />
                    بعد همه ی اون مواردی که تهیه کردیم رو بعنوان الویت های اصلی
                    در گوگو قرار دادیم
                    <br />
                    ما دوست داشتیم قالبی که استفاده میکنیم پیچیده نباشه، سرعت
                    عمل خوبی داشته باشه و اجزای اضافی نداشته باشه که حجم قالب
                    زیاد بشه!
                  </p>
                </div>
              </div>
              {features.map((feature, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`feature_${i}`}>
                  {i % 2 === 0 && (
                    <div className="row feature-row">
                      <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{ __html: feature.detail }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className="feature-image-right feature-image-charts position-relative"
                        />
                      </div>
                    </div>
                  )}
                  {i % 2 === 1 && (
                    <div className="row feature-row">
                      <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className="feature-image-left feature-image-charts"
                        />
                      </div>
                      <div className="col-12 col-md-6 offset-md-0 col-lg-5 offset-lg-1 d-flex align-items-center order-1 order-md-2">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{ __html: feature.detail }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="section background">
            <div className="container" id="layouts">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>ساختار قالب و چیدمان ها</h1>
                  <p>
                    ما همه ی سعی و تلاش خودمون رو کردیم تا اونچه که مخاطبین ما
                    از یه قالب انتظار دارنو برآورده کنیم
                  </p>
                </div>
              </div>

              <div className="row pt-5">
                {layouts.map((l, index) => (
                  <div
                    key={`layout_${index}`}
                    className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-5"
                  >
                    <img
                      className="img-fluid border-radius depth-2 mb-3 semi-rounded"
                      alt={l.title}
                      src={l.img}
                    />
                    <h4 className="text-center">{l.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="section mb-0">
            <div className="container" id="components">
              <div className="row mb-5">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>کامپوننت های قالب</h1>
                  <p>
                    سعی کردیم توی درست کردن اجزا، از حداقل ابزار استفاده کنیم
                    چراکه کم حجم بودن قالب یکی از مولفه های مهم برای هر برنامه
                    نویسه
                    <br />
                    میتونم به جرعت بگم که تمام کامپوننت های ما با بوتسترپ 4
                    همخوانی دارند
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <img
              className="components-image mb-5 pb-5"
              alt="Components"
              src="/assets/img/landing-page/components.png"
            />
          </div>

          <div className="section background">
            <div className="container" id="apps">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center mb-4">
                  <h1>برنامه های آماده</h1>
                  <p className="section-text">
                    با استفاده از کامپوننت هایی که توی این قالب هستند، سه تا
                    برنامه ی آماده براتون درست کردیم که بنظرم حتی اگه بخواین یه
                    چیزی مشابه اینها بسازین خیلی توی زمان شما صرفه جویی میکنه
                  </p>
                </div>
              </div>
              <div className="row screenshots">
                <div className="col-12 text-center mb-4">
                  <Nav tabs className="justify-content-center">
                    {applications.map((app, index) => (
                      <NavItem key={`app_nav_${index}`}>
                        <a
                          href="#tab"
                          className={classnames({
                            'nav-link': true,
                            active: activeTab === index,
                          })}
                          onClick={(event) => {
                            event.preventDefault();
                            toggle(index);
                          }}
                        >
                          {app.title}
                        </a>
                      </NavItem>
                    ))}
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    {applications.map((app, index) => (
                      <TabPane key={`app_tab_${index}`} tabId={index}>
                        <NavLink to={app.path}>
                          <img
                            alt={app.title}
                            src={app.img}
                            className="app-image"
                          />
                        </NavLink>
                      </TabPane>
                    ))}
                  </TabContent>
                </div>
              </div>
            </div>
          </div>

          <div className="section mb-0">
            <div className="container" id="themes">
              <div className="row mb-5">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>رنگ بندی ها</h1>
                  <p>
                    10 تا تم رنگی براتون درست کردیم
                    <br />
                    حتی اگه از اینها خوشتون نیومد میتونین یه تم رنگی به دلخواه
                    خودتون بسازین چون تمام متغیر های رنگ ها با Sass ساخته شدن
                  </p>
                </div>
              </div>
              {themes.map((t, index) => (
                <div key={`theme_${index}`} className="row mb-5">
                  <div className="col-12 text-center mb-3">
                    <h4 className="text-center">{t.title}</h4>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 offset-lg-2 mb-3">
                    <div className="depth-2 color-container">
                      {['left', 'center', 'right'].map((align, i) => (
                        <div
                          key={`light_${index}_${i}`}
                          className={`${t.class}-light-${i + 1} color-${align}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="depth-2 color-container">
                      {['left', 'center', 'right'].map((align, i) => (
                        <div
                          key={`dark_${index}_${i}`}
                          className={`${t.class}-dark-${i + 1} color-${align}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section background background-no-bottom mb-0 pb-0">
            <div className="container">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>!تاحالا از تعریفام خوشت اومد؟</h1>
                  <p>
                    اگه دوست داری این قالب رو قانونی از ما تهیه کن تا هم به
                    توسعه تیم کمک کرده باشی و هم باعث بشی انگیزه ای برای ما بشه
                    تا محصولات با کیفیت عالی براتون تهیه کنیم
                  </p>
                </div>
                <div className="col-12 offset-0 col-lg-6 offset-lg-3 newsletter-input-container">
                  <div className="text-center mb-3">
                    <a
                      className="btn btn-secondary btn-xl"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={buyUrl}
                    >
                      خرید قالب
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section footer mb-0" ref={refSectionFooter}>
            <div className="container">
              <div className="row footer-row">
                <div className="col-12 text-right">
                  <a
                    className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <i className="simple-icon-arrow-up" />
                  </a>
                </div>
                <div className="col-12 text-center footer-content">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <img src={logo} alt="Logo" />
                  </a>
                </div>
              </div>
            </div>
            <div className="container copyright pt-5 pb-5">
              <div className="row">
                <div className="col-12" />
                <div className="col-12 text-center">
                  <p className="mb-0">2021 © فاطمه کاظمی زاده</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
