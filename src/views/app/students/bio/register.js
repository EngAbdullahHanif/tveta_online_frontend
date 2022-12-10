import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx } from 'components/common/CustomBootstrap';
import { MDBFile } from 'mdb-react-ui-kit';
import { injectIntl } from 'react-intl';
import IntlMessages from 'helpers/IntlMessages';
import TagsInput from 'react-tagsinput';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import {
  Button,
  Label,
  Card,
  CardTitle,
  CardBody,
  Row,
  Form,
  Input,
} from 'reactstrap';
import axios from 'axios';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from 'availity-reactstrap-validation';

const selectGender = [
  { label: 'male', value: '1', key: 0 },
  { label: 'female', value: '2', key: 1 },
];

const Register = () => {
  const [selectedOptionLO, setSelectedOptionLO] = useState('');
  const [selectedOptionLT, setSelectedOptionLT] = useState('');
  const [startDateLO, setStartDateLO] = useState(null);
  const [startDateLT, setStartDateLT] = useState(null);
  const [tagsLO, setTagsLO] = useState([]);
  const [tagsLT, setTagsLT] = useState([]);

  const [isNext, setIsNext] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [IdCard, setIdCard] = useState(null);

  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [lastname, setLastname] = useState('');
  const [grandfathername, setGrandfathername] = useState('');
  const [job, setJob] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  // const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [rank, setRank] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [paperedIdCardNum, setPaperedIdCardNum] = useState('');
  const [eIdCardNum, setEIdCardNum] = useState('');
  const [pageNum, setPageNum] = useState('');
  const [coverNum, setCoverNum] = useState('');
  const [education, setEducation] = useState('');
  const [mainVillage, setMainVillage] = useState('');
  const [mainDistrict, setMainDistrict] = useState('');
  const [mainProvince, setMainProvince] = useState('');
  const [currentVilage, setCurrentVilage] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [currentProvince, setCurrentProvince] = useState('');
  const [placeOfBirith, setPlaceOfBirith] = useState('');
  const [fatherJob, setFatherJob] = useState('');

  const handleClick = (event) => {
    setIsNext(event);
  };

  const onSubmit = (event, errors, values) => {
    if (errors.length === 0) {
    }
    console.log('values', values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('values', event);

    const data = {
      studentName: studentName,
      fatherName: fatherName,
      lastname: lastname,
      grandfathername: grandfathername,
      job: job,
      graduationYear: graduationYear,
      email: email,
      rank: rank,
      dob: dob,
      phoneNum: phoneNum,
      paperedIdCardNum: paperedIdCardNum,
      eIdCardNum: eIdCardNum,
      pageNum: pageNum,
      coverNum: coverNum,
      education: education,
      mainVillage: mainVillage,
      mainDistrict: mainDistrict,
      mainProvince: mainProvince,
      currentVilage: currentVilage,
      currentDistrict: currentDistrict,
      currentProvince: currentProvince,
      placeOfBirith: placeOfBirith,
      fatherJob: fatherJob,
    };
    console.log('data', data);
    // send data to server with axios

    axios
      .post('http://localhost:8000/api/', data)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  //get teacher list from the databse with axios
  const [teacherList, setTeacherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  axios.get('http://localhost:8000/api/teacher').then((res) => {
    console.log('res', res);
    setTeacherList(res.data);
  });

  //use history hooks to save data in local storage
  const handleNext = () => {
    handleClick(true);
  };

  return (
    // <>
    //   <AvForm
    //     className="av-tooltip tooltip-label-right"
    //     onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
    //   >
    //     {!isNext ? (
    //       <Card className="mb-5">
    //         <h4 className="mt-5 m-5">بیوگرافی</h4>
    //         <CardBody>
    //           <Row>
    //             <Colxx>
    //               <AvGroup>
    //                 <Label>نوم/ نام</Label>
    //                 <AvInput
    //                   name="name"
    //                   required
    //                   onChange={(e) => setStudentName(e.target.value)}
    //                   value={studentName}
    //                 />
    //                 <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label>د پلار نوم/نام پدر</Label>
    //                 <AvInput
    //                   name="fathername"
    //                   required
    //                   value={fatherName}
    //                   onChange={(e) => setFatherName(e.target.value)}
    //                 />
    //                 <AvFeedback>یه ارور همینطوری</AvFeedback>
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label>دنده/وظیفه</Label>
    //                 <AvInput
    //                   name="job"
    //                   required
    //                   onChange={(e) => setJob(e.target.value)}
    //                 />
    //                 <AvFeedback>یه ارور همینطوری</AvFeedback>
    //               </AvGroup>
    //               <AvField
    //                 type="select"
    //                 name="educaiton"
    //                 required
    //                 label="زده کړې/ تحصیل"
    //                 errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
    //                 onChange={(e) => setEducation(e.target.value)}
    //               >
    //                 <option value="0" />
    //                 <option>1</option>
    //                 <option>2</option>
    //                 <option>3</option>
    //                 <option>4</option>
    //                 <option>5</option>
    //               </AvField>

    //               <AvGroup>
    //                 <Label>دنده/وظیفه</Label>
    //                 <AvInput
    //                   name="rank"
    //                   required
    //                   onChange={(e) => setRank(e.target.value)}
    //                 />
    //                 <AvFeedback>یه ارور همینطوری</AvFeedback>
    //               </AvGroup>

    //               {/* <AvGroup>
    //                 <Label>د زیږیدنې ځای / تاریخ تولد</Label>
    //                 <DatePicker />
    //               </AvGroup> */}

    //               <AvGroup>
    //                 <Label>د زیږیدنې ځای / تاریخ تولد</Label>
    //                 <AvField
    //                   name="dob"
    //                   type="date"
    //                   selected={selectedDate}
    //                   onChange={[
    //                     (date) => setSelectedDate(date),
    //                     (e) => setDob(e.target.value),
    //                   ]}
    //                   dateFormat="dd/MM/yyyy"
    //                   placeholderText="dd/mm/yyyy"
    //                   minDate={new Date()}
    //                 />
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label>د تلفن شمیره / نمبر تلفن</Label>
    //                 <AvField
    //                   name="phonenum"
    //                   type="number"
    //                   max="10000000000"
    //                   onChange={(e) => setPhoneNum(e.target.value)}
    //                 />
    //               </AvGroup>

    //               {/* <AvCheckboxGroup
    //           className="error-l-150"
    //           inline
    //           name="checkboxCustomInputExample2"
    //           required
    //         >
    //           <Label className="d-block">د تذکرې بڼه/نوعیت تذکره</Label>
    //           <AvCheckbox customInput label="الکترونیکی" value="Yes" />
    //           <AvCheckbox customInput label="کاغذی" value="No" />
    //             </AvCheckboxGroup> */}
    //             </Colxx>
    //             <Colxx>
    //               <AvGroup>
    //                 <Label>تخلص</Label>
    //                 <AvInput
    //                   name="lastname"
    //                   required
    //                   onChange={(e) => setLastname(e.target.value)}
    //                 />
    //                 <AvFeedback>نام اجباری اسس!/نوم ضروری دی</AvFeedback>
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label>د نیکه نوم/نام پدر کلان</Label>
    //                 <AvInput
    //                   name="grandfathername"
    //                   required
    //                   onChange={(e) => setGrandfathername(e.target.value)}
    //                 />
    //                 <AvFeedback>یه ارور همینطوری</AvFeedback>
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label>د پلار دنده/ وظیفه پدر</Label>
    //                 <AvInput
    //                   name="fatherJob"
    //                   required
    //                   onChange={(e) => setFatherJob(e.target.value)}
    //                 />
    //                 <AvFeedback>یه ارور همینطوری</AvFeedback>
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label>د فراغت کال / سال فراغت</Label>
    //                 <AvField
    //                   name="graduationYear"
    //                   type="date"
    //                   selected={selectedDate}
    //                   onChange={[
    //                     (date) => setSelectedDate(date),
    //                     (e) => setGraduationYear(e.target.value),
    //                   ]}
    //                   dateFormat="dd/MM/yyyy"
    //                   placeholderText="dd/mm/yyyy"
    //                   minDate={new Date()}
    //                 />
    //               </AvGroup>

    //               <AvField
    //                 type="select"
    //                 name="gender"
    //                 required
    //                 label="جنسیت"
    //                 errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
    //                 onChange={(e) => setGender(e.target.value)}
    //               >
    //                 <option value="0" />
    //                 <option>نارینه/ مذکر</option>
    //                 <option>ښځینه/مونث</option>
    //               </AvField>

    //               <AvGroup>
    //                 <Label>د زیږیدنې ځای/ مکان تولد</Label>
    //                 <AvInput name="placeOfBirith" required />
    //                 <AvFeedback>یه ارور همینطوری</AvFeedback>
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label> برښنا لیک/ایمیل ادرس</Label>
    //                 <Label />
    //                 <AvInput name="email" required />
    //                 <AvFeedback>یه ارور همینطوری</AvFeedback>
    //               </AvGroup>

    //               <AvGroup>
    //                 <Label> لطفا اسناد مورد نیاز را درج نماید</Label>
    //                 <Label />
    //                 <MDBFile name="documents" label="اسناد فراغت" size="bg" />
    //               </AvGroup>
    //             </Colxx>
    //           </Row>
    //           <Button onClick={() => handleClick(true)} color="primary m-3">
    //             مخته/ بعدی
    //           </Button>
    //         </CardBody>
    //       </Card>
    //     ) : (
    //       <Card className="mb-5">
    //         <h4 className="mt-5 m-5">نور مالومات / معلومات دیگر</h4>

    //         <CardBody>
    //           <Row>
    //             <Colxx>
    //               <AvField
    //                 type="select"
    //                 name="IdCard"
    //                 onChange={(e) => {
    //                   const selectedOption = e.target.value;
    //                   setIdCard(selectedOption);
    //                 }}
    //                 required
    //                 label="تذکره"
    //                 errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
    //               >
    //                 <option value="الکترونیکی">الکترونیکی</option>
    //                 <option value="کاغذی">کاغذی</option>
    //               </AvField>

    //               {IdCard === 'کاغذی' ? (
    //                 <AvGroup>
    //                   <Label>جلد </Label>
    //                   <AvInput name="coverNum" required />
    //                   <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
    //                 </AvGroup>
    //               ) : (
    //                 <div></div>
    //               )}

    //               <div className="square border border-dark p-3 ">
    //                 <h6>دایمی ادرس/ ادرس دایمی</h6>

    //                 <AvGroup>
    //                   <Label>قریه/ ناحیه</Label>
    //                   <AvInput name="mainVillage" required />
    //                   <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
    //                 </AvGroup>

    //                 <AvGroup>
    //                   <Label>ولسوالی</Label>
    //                   <AvInput name="mainDistrict" required />
    //                   <AvFeedback>یه ارور همینطوری</AvFeedback>
    //                 </AvGroup>

    //                 <AvGroup>
    //                   <Label>ولایت</Label>
    //                   <AvInput name="mainProvince" required />
    //                   <AvFeedback>یه ارور همینطوری</AvFeedback>
    //                 </AvGroup>
    //               </div>
    //             </Colxx>
    //             <Colxx>
    //               {IdCard === 'کاغذی' ? (
    //                 <AvGroup>
    //                   <Label>د تذکرې شمیره/نمبر تذکره </Label>
    //                   <AvInput name="paperedIdCardNum" required />
    //                   <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
    //                 </AvGroup>
    //               ) : (
    //                 <AvGroup>
    //                   <Label>د تذکرې شمیره/نمبر تذکره </Label>
    //                   <AvInput name="eIdCardNum" required />
    //                   <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
    //                 </AvGroup>
    //               )}

    //               {IdCard === 'کاغذی' ? (
    //                 <AvGroup>
    //                   <Label>پاڼه/ صفحه</Label>
    //                   <AvInput name="pageNum" required />
    //                   <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
    //                 </AvGroup>
    //               ) : (
    //                 <div></div>
    //               )}

    //               <div className="square border border-dark p-3 ">
    //                 <h6> اوسنی ادرس/ ادرس فعلی</h6>

    //                 <AvGroup>
    //                   <Label>قریه/ ناحیه</Label>
    //                   <AvInput name="currentVilage" required />
    //                   <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
    //                 </AvGroup>

    //                 <AvGroup>
    //                   <Label>ولسوالی</Label>
    //                   <AvInput name="currentDistrict" required />
    //                   <AvFeedback>یه ارور همینطوری</AvFeedback>
    //                 </AvGroup>

    //                 <AvGroup>
    //                   <Label>ولایت</Label>
    //                   <AvInput name="currentProvince" required />
    //                   <AvFeedback>یه ارور همینطوری</AvFeedback>
    //                 </AvGroup>
    //               </div>
    //             </Colxx>
    //           </Row>
    //           <Row>
    //             <Colxx>
    //               <Button
    //                 onClick={() => handleClick(false)}
    //                 color="secondary m-3"
    //               >
    //                 شاته/ قبلی
    //               </Button>
    //             </Colxx>
    //             <Button type="submit" color="primary m-4">
    //               ثبت
    //             </Button>
    //           </Row>
    //         </CardBody>
    //       </Card>
    //     )}
    //   </AvForm>
    // </>

    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.top-labels-over-line" />
            </CardTitle>
            <Form method="post">
              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <span>نام شاگرد</span>
              </Label>
              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <span>تخلص شاگرد</span>
              </Label>
              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="fatherName"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                />
                <span>نام پدر شاگرد</span>
              </Label>
              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="grandfathername"
                  value={grandfathername}
                  onChange={(e) => setGrandfathername(e.target.value)}
                />
                <span>نام پدر بزرگ شاگرد</span>
              </Label>
              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
                <span>شغل</span>
              </Label>
              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="graduationYear"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
                <span>سال فارغ التحصیلی</span>
              </Label>
              <Label className="form-group has-float-label">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={selectedOptionLO}
                  onChange={(val) => setSelectedOptionLO(val)}
                  options={selectGender}
                  placeholder=""
                />
                <span>جنسیت</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span>ایمیل</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="rank"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                />
                <span>رتبه</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <span>تاریخ تولد</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="number"
                  name="phoneNum"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
                <span>شماره تماس</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="paperedIdCardNum"
                  value={paperedIdCardNum}
                  onChange={(e) => setPaperedIdCardNum(e.target.value)}
                />
                <span>د تذکرې شمیره/نمبر تذکره </span>
              </Label>

              {/* <Label className="form-group has-float-label">
                <Input type="text" name="eIdCardNum" />
                <span>د الکترونیکی تذکرې شمیره/نمبر تذکره الکترونیکی</span>
              </Label> */}

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="pageNum"
                  value={pageNum}
                  onChange={(e) => setPageNum(e.target.value)}
                />
                <span>د تذکرې پاڼې شمیره/نمبر صفحه تذکره</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="coverNum"
                  value={coverNum}
                  onChange={(e) => setCoverNum(e.target.value)}
                />
                <span>د تذکرې کور شمیره/نمبر جلد تذکره</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
                <span>تحصیلات</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="mainVillage"
                  value={mainVillage}
                  onChange={(e) => setMainVillage(e.target.value)}
                />
                <span>قریه</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="mainDistrict"
                  value={mainDistrict}
                  onChange={(e) => setMainDistrict(e.target.value)}
                />
                <span>ولسوالی</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="mainProvince"
                  value={mainProvince}
                  onChange={(e) => setMainProvince(e.target.value)}
                />
                <span>ولایت</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="currentVilage"
                  value={currentVilage}
                  onChange={(e) => setCurrentVilage(e.target.value)}
                />
                <span>قریه</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="currentDistrict"
                  value={currentDistrict}
                  onChange={(e) => setCurrentDistrict(e.target.value)}
                />
                <span>ولسوالی</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="currentProvince"
                  value={currentProvince}
                  onChange={(e) => setCurrentProvince(e.target.value)}
                />
                <span>ولایت</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="placeOfBirith"
                  value={placeOfBirith}
                  onChange={(e) => setPlaceOfBirith(e.target.value)}
                />
                <span>محل تولد</span>
              </Label>

              <Label className="form-group has-float-label">
                <Input
                  type="text"
                  name="fatherJob"
                  value={fatherJob}
                  onChange={(e) => setFatherJob(e.target.value)}
                />
                <span>شغل پدر</span>
              </Label>

              <Button color="primary" onClick={handleSubmit}>
                <IntlMessages id="forms.submit" />
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Register;
