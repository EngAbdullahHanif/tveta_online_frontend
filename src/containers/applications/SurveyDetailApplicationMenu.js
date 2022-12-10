import React from 'react';
import { Badge, FormGroup, CustomInput } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';

import ApplicationMenu from 'components/common/ApplicationMenu';

const SurveyDetailApplicationMenu = () => {
  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">Status</p>
          <ul className="list-unstyled mb-5">
            <li className="active">
              <NavLink to="#" location={{}}>
                <i className="simple-icon-refresh" />
                نظرسنجی های باز
                <span className="float-right">12</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#" location={{}}>
                <i className="simple-icon-check" />
                نظرسنجی بسته
                <span className="float-right">24</span>{' '}
              </NavLink>
            </li>
          </ul>

          <p className="text-muted text-small">مجموعه ها</p>
          <FormGroup className="mb-5">
            <CustomInput
              type="checkbox"
              id="developmentCheck"
              label="مسافرت"
              className="mb-2"
            />
            <CustomInput
              type="checkbox"
              id="workplaceCheck"
              className="mb-2"
              label="مطالعه"
            />
            <CustomInput
              type="checkbox"
              id="hardwareCheck"
              className="mb-2"
              label="محصولات"
            />
          </FormGroup>

          <p className="text-muted text-small">برچسب ها</p>
          <div>
            <NavLink to="#" location={{}}>
              <Badge className="mb-1" color="outline-primary" pill>
                شخصی
              </Badge>{' '}
            </NavLink>

            <NavLink to="#" location={{}}>
              <Badge className="mb-1" color="outline-secondary" pill>
                آموزشی
              </Badge>{' '}
            </NavLink>
            <NavLink to="#" location={{}}>
              <Badge className="mb-1" color="outline-dark" pill>
                خیلی فوری
              </Badge>{' '}
            </NavLink>
          </div>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default SurveyDetailApplicationMenu;
