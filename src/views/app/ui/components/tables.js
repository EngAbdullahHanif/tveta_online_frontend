import React from 'react';
import { Row, Card, CardBody, CardTitle, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  ReactTableWithPaginationCard,
  ReactTableDivided,
} from 'containers/ui/ReactTableCards';

const TablesUi = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.tables" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row className="mb-5">
        <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="table.bootstrap-tables" />
          </h3>
        </Colxx>

        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="table.bootstrap-basic" />
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>نام کاربری</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>حسن</td>
                    <td>شریفی</td>
                    <td>@hsn_shrf548</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>رضا</td>
                    <td>ملکی</td>
                    <td>@black_ml84</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>لیلا</td>
                    <td>حسینی</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="table.bootstrap-striped" />
              </CardTitle>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>نام کاربری</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>حسن</td>
                    <td>شریفی</td>
                    <td>@hsn_shrf548</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>رضا</td>
                    <td>ملکی</td>
                    <td>@black_ml84</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>لیلا</td>
                    <td>حسینی</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="table.bootstrap-bordered" />
              </CardTitle>
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>نام کاربری</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>حسن</td>
                    <td>شریفی</td>
                    <td>@hsn_shrf548</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>رضا</td>
                    <td>ملکی</td>
                    <td>@black_ml84</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>لیلا</td>
                    <td>حسینی</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="table.bootstrap-borderless" />
              </CardTitle>
              <Table borderless>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>نام کاربری</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>حسن</td>
                    <td>شریفی</td>
                    <td>@hsn_shrf548</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>رضا</td>
                    <td>ملکی</td>
                    <td>@black_ml84</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>لیلا</td>
                    <td>حسینی</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="table.bootstrap-hoverable" />
              </CardTitle>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>نام کاربری</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>حسن</td>
                    <td>شریفی</td>
                    <td>@hsn_shrf548</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>رضا</td>
                    <td>ملکی</td>
                    <td>@black_ml84</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>لیلا</td>
                    <td>حسینی</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="table.bootstrap-responsive" />
              </CardTitle>

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>هدینگ جدول</th>
                    <th>هدینگ جدول</th>
                    <th>هدینگ جدول</th>
                    <th>هدینگ جدول</th>
                    <th>هدینگ جدول</th>
                    <th>هدینگ جدول</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>سلول 1-1</td>
                    <td>سلول 1-2</td>
                    <td>سلول 1-3</td>
                    <td>سلول 1-4</td>
                    <td>سلول 1-5</td>
                    <td>سلول 1-6</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>سلول 2-1</td>
                    <td>سلول 2-2</td>
                    <td>سلول 2-3</td>
                    <td>سلول 2-4</td>
                    <td>سلول 2-5</td>
                    <td>سلول 2-6</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>سلول 3-1</td>
                    <td>سلول 3-2</td>
                    <td>سلول 3-3</td>
                    <td>سلول 3-4</td>
                    <td>سلول 3-5</td>
                    <td>سلول 3-6</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

       <Row>
        <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="table.react-tables" />
          </h3>
        </Colxx>

        <Colxx xxs="12">
          <ReactTableWithPaginationCard />
        </Colxx>

        <Colxx xxs="12">
          <ReactTableDivided />{' '}
        </Colxx>
      </Row>
    </>
  );
};
export default TablesUi;
