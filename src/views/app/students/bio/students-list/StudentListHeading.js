import React, { useContext, useState } from 'react';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

import { AuthContext } from 'context/AuthContext';
// import Breadcrumb from '../navs/Breadcrumb';

const ListPageHeading = ({
  intl,
  displayMode,
  changeDisplayMode,
  heading,
  onIdSearchKey,
  // Gender
  selectedGenderOption,
  changeGenderBy,
  genderOptionsForList,
  selectedShiftOption,
  changeShiftBy,
  studyTimeOptionsForList,
  // Educational Years
  selectedEducationalYearOption,
  changeEducationalYearBy,
  educationalYearsOptionsForList,
  // Level Of Education
  studentTypeOptions,
  changeStudentTypeBy,
  studentType,
  // Province
  selectedProvinceOption,
  changeProvinceBy,
  provincesOptionsForList,
  // Districts
  onDistrictSearchKey,
  onProvinceSearchKey,
  onResetClick,
  reset,
  institutes,
  onInstituteSelect,
  setSelectedDistrict,
  selectedStudentId,
  selectedInstitute,
  setSelectedStudentId,
  handleReset,
}) => {
  console.log('provincesOptionsForList:', provincesOptionsForList);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;
  onInstituteSelect(selectedInstitute);
  const { districts: districtsFromContext } = useContext(AuthContext);
  console.log('districts from context: ', districtsFromContext);
  let districts = districtsFromContext;
  if (selectedProvinceOption) {
    districts = districtsFromContext.filter(
      (district) => district.province === selectedProvinceOption.value,
    );
  }

  console.log('distrcts: ', districts);
  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1 style={{ fontSize: 40 }}>
            <IntlMessages id={heading} />
          </h1>
        </div>
        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="pages.display-options" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <span className="mr-3 d-inline-block float-md-left">
              {/* <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'list' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('list')}
              >
                <DataListIcon />
              </a> */}
              {/* <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'thumblist' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('thumblist')}
              >
                <ThumbListIcon />
              </a>
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'imagelist' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('imagelist')}
              >
                <ImageListIcon />
              </a> */}
            </span>
            <div className="d-block d-md-inline-block pt-1">
              <div className="row">
                {/* Gender */}
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '17px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedGenderOption?.label || 'جنسیت'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {genderOptionsForList.map((gender, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeGenderBy(gender.value)}
                          style={{ fontSize: '17px' }}
                        >
                          {gender.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* Province */}
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    // size="xs"
                    style={{ fontSize: '17px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedProvinceOption?.label || 'ولایت'}
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      height: '300px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    {console.log(
                      'provincesOptionsForList',
                      provincesOptionsForList,
                    )}
                    {provincesOptionsForList &&
                      provincesOptionsForList.map((province, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => changeProvinceBy(province.value)}
                            style={{ fontSize: '17px' }}
                          >
                            {province.label}
                          </DropdownItem>
                        );
                      })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* District */}
                {/* <div className="search-sm d-inline-block float-md-left mr-1 mb-1 ">
                  
                  <ReactAutoSugegst
                    data={districts}
                    select={(district) => {
                      setSelectedDistrict(district);
                    }}
                    style={{ fontSize: '17px' }}
                    placeholder={messages['search.district']}
                  />
                </div> */}

                {/* Educational Year */}
                {/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle caret color="outline-dark">
                    <IntlMessages id="filter" />
                    {selectedEducationalYearOption?.label || 'سال تعلیمی'}
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      height: '300px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    {educationalYearsOptionsForList.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeEducationalYearBy(order.column)}
                          style={{ fontSize: '17px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown> */}

                {/* Timing Shift */}
                {/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '17px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedShiftOption?.label || 'شفټ'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {studyTimeOptionsForList.map((shift, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeShiftBy(shift.column)}
                          style={{ fontSize: '17px' }}
                        >
                          {shift.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown> */}

                {/* Student Id */}
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="student_id"
                    id="student_id"
                    value={selectedStudentId}
                    placeholder={messages['search.id']}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    onKeyUp={(e) => onIdSearchKey(e)}
                    style={{ fontSize: '17px' }}
                  />
                </div>

                {/* Institute */}
                {/* <div style={{ marginLeft: '90px', fontSize: '17px' }}>
                  <ReactAutoSugegst
                    data={institutes}
                    select={(institute) => {
                      onInstituteSelect(institute);
                    }}
                    value={selectedInstitute}
                    placeholder={messages['search.institute.name']}
                  />
                </div> */}

                {/* Education Level */}
                {/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '17px' }}
                  >
                    <IntlMessages id="filter" />
                    {studentTypeOptions?.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {studentType.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeStudentTypeBy(order.column)}
                          style={{ fontSize: '17px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown> */}

                {/* INTEGRATE THIS BASE ON DEPARTMENT */}
                {/* <div style={{ fontSize: '17px' }}>
                  <ReactAutoSugegst
                    data={institutes}
                    select={(opt) => {
                      setSelectedInstitute(opt);
                    }}
                    placeholder={messages['search.department.name']}
                  />
                </div> */}
              </div>
              <Button
                color="outline-red"
                size="xs"
                className="float-md-left mb-1"
                style={{ fontSize: '17px' }}
                onClick={handleReset}
              >
                <IntlMessages id="pages.reset" />
              </Button>
            </div>

            {/* <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div> */}
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);

// Study time (Shift) Should be integrated
