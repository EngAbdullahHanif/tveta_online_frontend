import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6">
              <p className="mb-0 text-muted">فاطمه کاظمی زاده @2021</p>
            </Colxx>
            <Colxx className="col-sm-6 d-none d-sm-block">
              <ul className="breadcrumb pt-0 pr-0 float-right">
                <li className="breadcrumb-item mb-0">
                  <Link className="btn-link" href="https://www.rtl-theme.com/gogo-react-bootstrap-4-admin-dashboard/discussions/" >
                    نظرات کاربران
                  </Link>
                </li>
                <li className="breadcrumb-item mb-0">
                  <Link className="btn-link" href="https://www.rtl-theme.com/?p=94491" >
                    خرید قالب
                  </Link>
                </li>
                <li className="breadcrumb-item mb-0">
                  <Link className="btn-link" href="https://www.rtl-theme.com/gogo-react-bootstrap-4-admin-dashboard/" >
                    داکیومنت
                  </Link>
                </li>
              </ul>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
