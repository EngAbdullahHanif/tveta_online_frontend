import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="3">
              <p className="mb-0 text-muted">د تخنیکی او مسلکی زده کړو اداره</p>
            </Colxx>
             <Colxx > 
              <p className=" mb-0 text-muted ">اداره تعلیمات تخنیکی و مسلکی</p>
            </Colxx>
            <Colxx className="col-sm-6 d-none d-sm-block">
             <p className="mb-0 text-muted">Technical and Vocational Education and Training  Authority</p>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
