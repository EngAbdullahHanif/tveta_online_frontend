import React, { useState } from 'react';

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

import { ThumbListIcon, ImageListIcon } from 'components/svg';
// import Breadcrumb from '../navs/Breadcrumb';

const ListPageHeading = ({
  intl,
  displayMode,
  changeDisplayMode,
  handleChangeSelectAll,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  pageSizes,
  // toggleModal,
  heading,
  onIdSearchKey,
  changeGenderBy,
  selectedGenderOption,
  genderOptionsForList,
  // province
  selectedProvinceOption,
  changeProvinceBy,
  provincesOptionsForList,
  // Level Of Education
  selectLevelOfEducationOption,
  changeLevelOfEducationBy,
  levelOfEdcationForList,
  onDistrictSearchKey,
  onProvinceSearchKey,
  onResetClick,
  reset,
  institutes,
  onInstituteSelect,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  const [selectedInstitute, setSelectedInstitute] = useState('');
  onInstituteSelect(selectedInstitute);
  const { messages } = intl;

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
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
            <br />
            <br />
            <div className="d-block d-md-inline-block pt-1 ">
              <div className="row">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '18px' }}
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
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    style={{ fontSize: '18px' }}
                    placeholder={messages['search.id']}
                    onKeyPress={(e) => onIdSearchKey(e)}
                  />
                </div>

                {/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle
                    caret
                    color="outline-dark"
                    size="xs"
                    style={{ fontSize: '18px' }}
                  >
                    <IntlMessages id="filter" />
                    {selectLevelOfEducationOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {levelOfEdcationForList.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeLevelOfEducationBy(order.column)}
                          style={{ fontSize: '18px' }}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown> */}

                {/* <div
                  style={{ fontSize: '18px' }}
                  className=" d-inline-block float-md-left mr-1 mb-1 align-top"
                >
                  <ReactAutoSugegst
                    data={institutes}
                    select={(opt) => {
                      setSelectedInstitute(opt);
                    }}
                    style={{ fontSize: '18px' }}
                    placeholder={messages['search.institute.name']}
                  />
                </div> */}
              </div>

              <Button
                style={{ fontSize: '18px' }}
                color="outline-dark"
                size="xs"
                className="float-md-left mb-1"
                onClick={() => {
                  document.getElementById('search').value = '';
                  changeGenderBy('all');
                  changeProvinceBy('all');
                  // document.getElementById('district').value = null;

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
