import React, { useState } from 'react';
import { Row, Button, Collapse } from 'reactstrap';
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
  selectedProvinceOption,
  provinceOptions,
  changeProvinceBy,
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
          {/* <div className="text-zero top-right-button-container">

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
          </div> */}
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
            <div className="d-block d-md-inline-block pt-1">
              <div className="row">
                {/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="filter" />
                    {selectedGenderOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {genderOptions.map((gender, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeGenderBy(gender.column)}
                        >
                          {gender.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown> */}
                {/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 ">
                  <DropdownToggle caret color="outline-dark" size="xs">
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
                    {provinceOptions.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeProvinceBy(order.column)}
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
                    id="district"
                    placeholder={messages['search.district']}
                    onKeyPress={(e) => onDistrictSearchKey(e)}
                  />
                </div>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="student_id"
                    id="student_id"
                    placeholder={messages['search.id']}
                    onKeyPress={(e) => onIdSearchKey(e)}
                  />
                </div> */}
              </div>
              {/* <Button
                color="outline-dark"
                size="xs"
                className="float-md-left mb-1"
                onClick={() => {
                  changeGenderBy('all');
                  changeProvinceBy('all');
                  document.getElementById('district').value = '';
                  document.getElementById('student_id').value = '';
                  setSelectedInstitute('');
                  onResetClick(!reset);
                }}
              >
                <IntlMessages id="pages.reset" />
              </Button> */}
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
