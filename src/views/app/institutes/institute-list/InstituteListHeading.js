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

  // toggleModal,
  heading,
  // Gender
  selectedGenderOption,
  changeGenderBy,
  genderOptions,
  // Status
  selectedStatusOptions,
  changeStatusBy,
  statusOptions,
  // Institut Type
  selectedInstituteType,
  changeInstituteBy,
  instituteTypeOptions,
  ////
  selectedProvinceOption,
  provincesOptionsForList,
  changeProvinceBy,
  onResetClick,
  reset,
  institutes,
  onInstituteSelect,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;
  const [selectedInstitute, setSelectedInstitute] = useState('');
  console.log('selectedInstitute12', selectedInstitute);
  onInstituteSelect(selectedInstitute);
  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          {/* <Breadcrumb match={match} /> */}
        </div>

        <div className="mb-2">
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <div className="d-block d-md-inline-block pt-1">
              <div className="row">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '18px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedGenderOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {genderOptions.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeGenderBy(order.value)}
                          style={{ fontSize: '18px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '18px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedProvinceOption.label}
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      height: '200px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    {provincesOptionsForList.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeProvinceBy(order.value)}
                          style={{ fontSize: '18px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '18px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectedStatusOptions?.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {statusOptions.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeStatusBy(order.value)}
                          style={{ fontSize: '18px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '18px' }}
                  >
                    <IntlMessages id="filter" />

                    {selectedInstituteType?.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {instituteTypeOptions.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeInstituteBy(order.value)}
                          style={{ fontSize: '18px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="district"
                    id="district"
                    style={{ fontSize: '18px' }}
                    placeholder={messages['search.district']}
                    onKeyPress={(e) => onDistrictSearchKey(e)}
                  />
                </div> */}
                {/* <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages['search.id']}
                    onKeyPress={(e) => onIdSearchKey(e)}
                  />
                </div> */}
                <div className="" style={{ fontSize: '18px' }}>
                  <ReactAutoSugegst
                    data={institutes}
                    select={(opt) => {
                      setSelectedInstitute(opt);
                    }}
                    placeholder={messages['dorm.search.name']}
                  />
                </div>

                {/* <Row>
                <Colxx xs="12" sm="12" className="mb-4">
                  <ReactAutoSugegst data={institutes} />
                </Colxx>
              </Row> */}
              </div>
              <Button
                style={{ fontSize: '18px' }}
                color="outline-dark"
                size="xs"
                className="float-md-left mb-1"
                onClick={() => {
                  changeGenderBy('all');
                  changeStatusBy('all');
                  changeProvinceBy('all');
                  // document.getElementById('district').value = '';
                  // document.getElementById('search').value = '';
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
