/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import ReactAutoSugegst from 'containers/forms/ReactAutoSugegst';

import { DataListIcon, ThumbListIcon, ImageListIcon } from 'components/svg';
// import Breadcrumb from '../navs/Breadcrumb';

const ListPageHeading = ({
  intl,
  displayMode,
  changeDisplayMode,
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,
  // toggleModal,
  heading,
  onIdSearchKey,
  // Gender
  selectedGenderOption,
  changeGenderBy,
  genderOptions,
  selectedShiftOption,
  changeShiftBy,
  shiftOption,
  // Educational Years
  selectedEducationalYearOption,
  changeEducationalYearBy,
  educationYears,
  // Level Of Education
  selectLevelOfEducationOption,
  changeLevelOfEducationBy,
  levelOfEdcation,
  // Province
  selectedProvinceOption,
  changeProvinceBy,
  provinces,
  // Districts
  onDistrictSearchKey,
  onProvinceSearchKey,
  onResetClick,
  reset,
  institutes,
  onInstituteSelect,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;
  const [selectedInstitute, setSelectedInstitute] = useState('');
  onInstituteSelect(selectedInstitute);
  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>
          <div className="text-zero top-right-button-container">
            {/* <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => toggleModal()}
            >
              <IntlMessages id="pages.add-new" />
            </Button> */}
            {'  '}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 &&
                        selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="pages.another-action" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          {/* <Breadcrumb match={match} /> */}
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
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'list' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('list')}
              >
                <DataListIcon />
              </a>
              <a
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
              </a>
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
                    {selectedGenderOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {genderOptions.map((gender, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeGenderBy(gender.column)}
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
                    size="xs"
                    style={{ fontSize: '17px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedProvinceOption.label}
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      height: '300px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    {provinces.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeProvinceBy(order.column)}
                          style={{ fontSize: '17px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <div>
                  {/* Educational Year */}
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                    <DropdownToggle
                      caret
                      color="outline-dark"
                      size="xs"
                      style={{ fontSize: '17px' }}
                    >
                      <IntlMessages id="filter" />
                      {selectedEducationalYearOption.label}
                      {/* {Educationnal} */}
                      {/* <span>fdsg</span> */}
                    </DropdownToggle>
                    <DropdownMenu
                      style={{
                        height: '300px',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                      }}
                    >
                      {educationYears.map((order, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() =>
                              changeEducationalYearBy(order.column)
                            }
                            style={{ fontSize: '17px' }}
                          >
                            {order.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>

                {/* Timing Shift */}
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '17px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedShiftOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {shiftOption.map((shift, index) => {
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
                </UncontrolledDropdown>

                {/* District */}
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="district"
                    id="district"
                    placeholder={messages['search.district']}
                    onKeyPress={(e) => onDistrictSearchKey(e)}
                    style={{ fontSize: '17px' }}
                  />
                </div>

                {/* Student Id */}
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="student_id"
                    id="student_id"
                    placeholder={messages['search.id']}
                    onKeyPress={(e) => onIdSearchKey(e)}
                    style={{ fontSize: '17px' }}
                  />
                </div>

                {/* Institute */}
                <div style={{ marginLeft: '90px', fontSize: '17px' }}>
                  <ReactAutoSugegst
                    data={institutes}
                    select={(opt) => {
                      setSelectedInstitute(opt);
                    }}
                    placeholder={messages['search.institute.name']}
                  />
                </div>

                {/* Education Level */}
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '17px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectLevelOfEducationOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {levelOfEdcation.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeLevelOfEducationBy(order.column)}
                          style={{ fontSize: '17px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* INTEGRATE THIS BASE ON DEPARTMENT */}
                <div style={{ fontSize: '17px' }}>
                  <ReactAutoSugegst
                    data={institutes}
                    select={(opt) => {
                      setSelectedInstitute(opt);
                    }}
                    placeholder={messages['search.department.name']}
                  />
                </div>
              </div>
              <Button
                color="outline-dark"
                size="xs"
                className="float-md-left mb-1"
                style={{ fontSize: '17px' }}
                onClick={() => {
                  changeGenderBy('all');
                  changeProvinceBy('all');
                  changeShiftBy('all');
                  changeLevelOfEducationBy('all');
                  changeEducationalYearBy('all');
                  document.getElementById('district').value = '';
                  document.getElementById('student_id').value = '';
                  setSelectedInstitute('');
                  onResetClick(!reset);
                }}
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
