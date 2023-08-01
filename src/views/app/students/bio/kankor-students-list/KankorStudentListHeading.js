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
  changeGenderBy,
  selectedGenderOption,
  genderOptions,
  provincesOptionsForList,
  changeProvinceBy,
  onDistrictSearchKey,
  onProvinceSearchKey,
  onResetClick,
  reset,
  institutes,
  onInstituteSelect,
  onEducationYearSelect,
  selectedProvinceOption,
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
          <h1 style={{ fontSize: 35 }}>
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
                    {genderOptions.map((gender, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeGenderBy(gender.column)}
                          style={{ fontSize: '18px' }}
                        >
                          {gender.label}
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
                    {selectedProvinceOption?.label || 'ولایت'}
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
                          onClick={() => changeProvinceBy(order.column)}
                          style={{ fontSize: '18px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="district"
                    style={{ fontSize: '18px' }}
                    id="district"
                    placeholder={messages['search.district']}
                    onKeyPress={(e) => onDistrictSearchKey(e)}
                  />
                </div>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="student_id"
                    style={{ fontSize: '18px' }}
                    id="student_id"
                    placeholder={messages['search.id']}
                    onKeyPress={(e) => onIdSearchKey(e)}
                  />
                </div>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <ReactAutoSugegst
                    data={institutes}
                    select={(opt) => {
                      setSelectedInstitute(opt);
                    }}
                    placeholder={messages['search.institute.name']}
                  />
                </div>
              </div>
              <Button
                color="outline-dark"
                style={{ fontSize: '18px' }}
                size="xs"
                className="float-md-left mb-1"
                onClick={() => {
                  changeGenderBy('all');
                  changeProvinceBy('all');
                  document.getElementById('district').value = '';
                  document.getElementById('student_id').value = '';
                  document.getElementById('educationYear').value = '';
                  onEducationYearSelect('');
                  setSelectedInstitute('');
                  onResetClick(!reset);
                }}
              >
                <IntlMessages id="pages.reset" />
              </Button>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
