import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import logo from './../../../../assets/logos/AdminLogo.png';
import profilePhoto from './../../../../assets/img/profiles/22.jpg';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import Classes from 'views/app/classes';

console.log(logo);

const TeacherProfile = () => {
  const [isNext, setIsNext] = useState(true);

  const handleClick = (event) => {
    setIsNext(event);
  };

  const style2 = {
    padding: '',
  };
  const style1 = {
    backgroungColor: 'blue',
  };

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Colxx className="mt-5 m-5" xxs="8">
              <h3>{<IntlMessages id="teacher.Profile" />}</h3>
            </Colxx>
            <Colxx className="mt-4">
              <div className="d-flex align-items-center flex-column">
                <img src={logo} alt="Logo" width={'30%'} />
                <p>
                  د تخنیکی او مسلکی زده کړو اداره
                  <br />
                  اداره تعلیمات تخنیکی و مسلکی
                </p>
              </div>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs="1"></Colxx>
            <Colxx>
              <img src={profilePhoto} alt="Photo" width={'10%'} />{' '}
            </Colxx>
          </Row>
          <Row>
            <Colxx
              className=" d-flex justify-content-center "
              style={{ marginRight: '21%' }}
            >
              {' '}
              <Button
                style={{ backgroundColor: !isNext ? 'blue' : '' }}
                size="lg"
                className="m-2"
                onClick={() => {
                  handleClick(false);
                }}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="button.TeacherBackround" />
                </span>
              </Button>{' '}
              <Button
                style={{ backgroundColor: isNext ? 'blue' : '' }}
                size="lg"
                className="m-2"
                onClick={() => {
                  handleClick(true);
                }}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="button.Teacherprofile" />
                </span>
              </Button>
            </Colxx>
          </Row>
          {isNext ? (
            <div>
              <Row className="justify-content-center border border-primary rounded m-5">
                <Colxx className=" p-5  border rounded" xxs="">
                  <Label>
                    <IntlMessages id="teacher.NameLabel" />
                  </Label>
                  <h3>احمد شبیر</h3>
                  <Label>
                    <IntlMessages id="teacher.FatherNameLabel" />
                  </Label>
                  <h3>عبدالرحیم</h3>
                  <Label>
                    <IntlMessages id="teacher.PhoneNoLabel" />
                  </Label>
                  <h3>077000000000</h3>
                  <Label>
                    <IntlMessages id="teacher.EmailLabel" />
                  </Label>
                  <h3>ahamd12@gmail.com</h3>
                  <Label>
                    <IntlMessages id="teacher.StatusLabel" />
                  </Label>
                  <h3>فعال</h3>
                </Colxx>
                <Colxx className="p-5 border rounded">
                  <Label>
                    <IntlMessages id="forms.InstituteLabel" />
                  </Label>
                  <h3>نیما</h3>
                  <Label>
                    <IntlMessages id="teacher.GradeLabel" />
                  </Label>
                  <h3>چهارم</h3>
                  <Label>
                    <IntlMessages id="teacher.StepLabel" />
                  </Label>
                  <h3>چهارم</h3>
                </Colxx>
              </Row>
            </div>
          ) : (
            <div className="p-2">
              <FormGroup className="form-group has-float-label m-5">
                <Label>مکافات / مجازات</Label>
                <Row
                  className="border border-primary  p-2"
                  style={{ borderRadius: '5px', minHeight: '200px' }}
                >
                  <Colxx className="m-3 border">
                    {' '}
                    <h1 className="p-2">مکافات</h1>
                    <div className="p-2" style={{ minHeight: '150px' }}>
                      یک استاد (یا معلم خصوصی) خوب در مرحله اول باید به کاری که
                      انجام می دهد علاقه داشته باشد. اگر علاقه ای در کار نباشد
                      روش ها و تکنیک های دیگر برای تبدیل شدن به استاد خوب موثر
                      واقع نخواهد شد. استاد باید دروسی را تدریس کند که خودش به
                      آن درس ها علاقه دارد و بر آن دروس مسلط است. اساتید عالی
                      معمولا همواره در حال یادگیری هستند و تونایی های خودشان را
                      به صورت مداوم افزایش می دهند. این اساتید در کلاس درس به
                      دانشجو احترام می گذارند و سعی می کنند مطالب را از دید
                      دانشجو ببینند و به ساده ترین زبان ممکن مطالب را توضیح می
                      دهند. در کلاس های دانشگاه بسیار خوب است کلاس به صورت
                      دوطرفه و تعاملی برگزار گردد. اساتید خوب که دانشجویان راضی
                      و موفقی دارند اینطور نیست که در کلاس فقط خودشان حرف بزنند
                      و متکلم وحده باشند. به هر میزان دانشجویان در کلاس مشارکت
                      بیشتری داشته باشند در نهایت بازدهی کلاس بالاتر خواهد بود.
                      اساتید خوب با پرسیدن سوالات مناسب حین تدریس سطح سواد
                      دانشجویان را مورد ارزیابی قرار می دهند و متناسب با آن
                      تدریس می کنند. این اساتید جو راحت و آزادی را در کلاس ایجاد
                      می نمایند به گونه ای که دانشجویان در عین حال که به استاد و
                      کلاس احترام می گذارند سوالات خودشان را هم راحت می پرسند و
                      اظهار نظر می کنند. در ادامه با استناد به مقالات معتبر علمی
                      در رابطه با ویژگی های استاد خوب توضیح داده می شود.
                    </div>
                  </Colxx>

                  <Colxx className="m-3 border">
                    {' '}
                    <h1 className="p-2">مجازات</h1>
                    <div className="p-2" style={{ minHeight: '150px' }}>
                      یک استاد (یا معلم خصوصی) خوب در مرحله اول باید به کاری که
                      انجام می دهد علاقه داشته باشد. اگر علاقه ای در کار نباشد
                      روش ها و تکنیک های دیگر برای تبدیل شدن به استاد خوب موثر
                      واقع نخواهد شد. استاد باید دروسی را تدریس کند که خودش به
                      آن درس ها علاقه دارد و بر آن دروس مسلط است. اساتید عالی
                      معمولا همواره در حال یادگیری هستند و تونایی های خودشان را
                      به صورت مداوم افزایش می دهند. این اساتید در کلاس درس به
                      دانشجو احترام می گذارند و سعی می کنند مطالب را از دید
                      دانشجو ببینند و به ساده ترین زبان ممکن مطالب را توضیح می
                      دهند.
                    </div>
                  </Colxx>
                </Row>
              </FormGroup>

              <FormGroup className="form-group has-float-label  m-5">
                <Label>ارزیابی استاد/د استاد ارزیابی</Label>
                <Row
                  className="border border-primary p-2"
                  style={{ borderRadius: '5px', minHeight: '200px' }}
                >
                  <Colxx className="m-3">
                    {' '}
                    <h1 className="p-2">ارزیابی سالانه</h1>
                    <div className="p-2" style={{ minHeight: '150px' }}>
                      یک استاد (یا معلم خصوصی) خوب در مرحله اول باید به کاری که
                      انجام می دهد علاقه داشته باشد. اگر علاقه ای در کار نباشد
                      روش ها و تکنیک های دیگر برای تبدیل شدن به استاد خوب موثر
                      واقع نخواهد شد. استاد باید دروسی را تدریس کند که خودش به
                      آن درس ها علاقه دارد و بر آن دروس مسلط است. اساتید عالی
                      معمولا همواره در حال یادگیری هستند و تونایی های خودشان را
                      به صورت مداوم افزایش می دهند. این اساتید در کلاس درس به
                      دانشجو احترام می گذارند و سعی می کنند مطالب را از دید
                      دانشجو ببینند و به ساده ترین زبان ممکن مطالب را توضیح می
                      دهند.
                    </div>
                  </Colxx>
                </Row>
              </FormGroup>

              <FormGroup className="form-group has-float-label  m-5">
                <Label>
                  ارزیابی د تخنیکی او مسلکی زده کړو اداری لخوا/ ارزیابی توسط
                  اداره تعلیمات تخنیکی و مسلکی
                </Label>
                <Row
                  className="border border-primary p-2"
                  style={{ borderRadius: '5px', minHeight: '200px' }}
                >
                  <Colxx className="m-3">
                    {' '}
                    <h1 className="p-2">ارزیابی</h1>
                    <div className="p-2" style={{ minHeight: '150px' }}>
                      یک استاد (یا معلم خصوصی) خوب در مرحله اول باید به کاری که
                      انجام می دهد علاقه داشته باشد. اگر علاقه ای در کار نباشد
                      روش ها و تکنیک های دیگر برای تبدیل شدن به استاد خوب موثر
                      واقع نخواهد شد. استاد باید دروسی را تدریس کند که خودش به
                      آن درس ها علاقه دارد و بر آن دروس مسلط است. اساتید عالی
                      معمولا همواره در حال یادگیری هستند و تونایی های خودشان را
                      به صورت مداوم افزایش می دهند. این اساتید در کلاس درس به
                      دانشجو احترام می گذارند و سعی می کنند مطالب را از دید
                      دانشجو ببینند و به ساده ترین زبان ممکن مطالب را توضیح می
                      دهند.
                    </div>
                  </Colxx>
                </Row>
              </FormGroup>

              <FormGroup className="form-group has-float-label  m-5">
                <Label>د تبدیلی سوابق / سوابق تبدیلی</Label>
                <Row
                  className="border border-primary p-2"
                  style={{ borderRadius: '5px', minHeight: '200px' }}
                >
                  <Colxx className="m-3">
                    {' '}
                    <h1 className="p-2">تبدیلی</h1>
                    <div className="p-2" style={{ minHeight: '150px' }}>
                      یک استاد (یا معلم خصوصی) خوب در مرحله اول باید به کاری که
                      انجام می دهد علاقه داشته باشد. اگر علاقه ای در کار نباشد
                      روش ها و تکنیک های دیگر برای تبدیل شدن به استاد خوب موثر
                      واقع نخواهد شد. استاد باید دروسی را تدریس کند که خودش به
                      آن درس ها علاقه دارد و بر آن دروس مسلط است. اساتید عالی
                      معمولا همواره در حال یادگیری هستند و تونایی های خودشان را
                      به صورت مداوم افزایش می دهند. این اساتید در کلاس درس به
                      دانشجو احترام می گذارند و سعی می کنند مطالب را از دید
                      دانشجو ببینند و به ساده ترین زبان ممکن مطالب را توضیح می
                      دهند.
                    </div>
                  </Colxx>
                </Row>
              </FormGroup>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default TeacherProfile;
