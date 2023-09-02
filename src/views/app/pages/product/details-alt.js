import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Rating from 'components/common/Rating';

import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import RadialProgressCard from 'components/cards/RadialProgressCard';
import SmallLineCharts from 'containers/dashboards/SmallLineCharts';
import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard';
import NewComments from 'containers/dashboards/NewComments';
import Orders from 'containers/pages/Orders';

const DetailsAltPages = ({ match, intl }) => {
  const [activeTab, setActiveTab] = useState('details');

  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>کیک شکلاتی</h1>
          <div className="text-zero top-right-button-container">
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                color="primary"
                size="lg"
                outline
                className="top-right-button top-right-button-single"
              >
                <IntlMessages id="pages.actions" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>
                  <IntlMessages id="pages.header" />
                </DropdownItem>
                <DropdownItem disabled>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="pages.another-action" />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <IntlMessages id="pages.another-action" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

          <Breadcrumb match={match} />

          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'details',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('details')}
              >
                <IntlMessages id="pages.details" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'orders',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('orders')}
              >
                <IntlMessages id="pages.orders" />
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="details">
              <Row>
                <Colxx xxs="12" lg="4" className="mb-4">
                  <Card className="mb-4">
                    <div className="position-absolute card-top-buttons">
                      <Button outline color="white" className="icon-button">
                        <i className="simple-icon-pencil" />
                      </Button>
                    </div>
                    <img
                      src="/assets/img/details/1.jpg"
                      alt="Detail"
                      className="card-img-top"
                    />

                    <CardBody>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.description" />
                      </p>
                      <p className="mb-3">
                        کیک لایه‌ای (به انگلیسی: Layer cake) نوعی کیک است که از
                        دو یا سه لایهٔ هم اندازه که بر روی هم قرار گرفته‌اند،
                        تشکیل شده است. مابین لایه‌های کیک با موادی مانند خامه یا
                        یک مادهٔ پرحجم پر می‌شود و اطراف و سطح بالای کیک نیز
                        معمولاً با مانند خامهٔ زده شده پوشانده شده
                        <br />
                        <br />و سپس ممکن بر روی آن چاشنی‌ها یا تزئینات، مختلف
                        مانند شکلات، نارگیل، خشکبار و دیگر مواد غذایی یا گل‌های
                        خوراکی قرار داده شود.
                      </p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.rating" />
                      </p>
                      <div className="mb-3">
                        <Rating total={5} rating={5} interactive={false} />
                      </div>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.price" />
                      </p>
                      <p className="mb-3">8,14 تومان</p>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.ingredients" />
                      </p>
                      <div className="mb-3">
                        <p className="d-sm-inline-block mb-1">
                          <Badge color="outline-secondary mb-1 mr-1" pill>
                            تخم مرغ
                          </Badge>
                          <Badge color="outline-secondary mb-1 mr-1" pill>
                            شکر
                          </Badge>
                          <Badge color="outline-secondary mb-1 mr-1" pill>
                            وانیل
                          </Badge>
                          <Badge color="outline-secondary mb-1 mr-1" pill>
                            آرد کیک
                          </Badge>
                          <Badge color="outline-secondary mb-1 mr-1" pill>
                            شیر
                          </Badge>
                          <Badge color="outline-secondary mb-1 mr-1" pill>
                            نمک
                          </Badge>
                          <Badge color="outline-secondary mb-1 mr-1" pill>
                            روغن زیتون
                          </Badge>
                        </p>
                      </div>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.is-vegan" />
                      </p>
                      <p>خیر</p>
                    </CardBody>
                  </Card>
                  <Row>
                    <Colxx xxs="12" className="mb-4">
                      <RadialProgressCard
                        className="mb-4"
                        title={messages['pages.order-status']}
                        percent={85}
                        isSortable={false}
                      />
                    </Colxx>
                    <Colxx xxs="12" className="mb-4">
                      <RadialProgressCard
                        className="mb-4"
                        title={messages['pages.order-status']}
                        percent={40}
                        isSortable={false}
                      />
                    </Colxx>
                  </Row>
                </Colxx>

                <Colxx xxs="12" lg="8">
                  <SmallLineCharts itemClass="dashboard-small-chart-analytics" />
                  <WebsiteVisitsChartCard className="mb-4" controls={false} />
                  <NewComments className="mb-4" displayRate />
                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="orders">
              <Orders />
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DetailsAltPages);
