import React, { useState } from 'react';

import { Colxx } from 'components/common/CustomBootstrap';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';

const Demo = () => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);

  const handleClick = (event) => {
    setDeletion(event);
  };

  return (
    <div>
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="modal.basic" />
            </CardTitle>
            <div>
              <Button
                color="primary"
                outline
                onClick={() => setModalBasic(true)}
              >
                Delete
              </Button>
            </div>
            <Modal
              isOpen={modalBasic}
              toggle={() => setModalBasic(!modalBasic)}
              style={{ marginTop: '10%' }}
            >
              <ModalHeader>
                <IntlMessages id="modal.deletion-message-title" />
              </ModalHeader>
              <ModalBody className="text-center">
                ایا تاسو غواړئ د شاګرد ریکارد دلیت کړئ/ ایا شما میخواهید که
                معلومات شاګرد متذکره را دلیت نماید؟
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => setModalBasic(false)}
                  style={{ marginLeft: '55%' }}
                >
                  نه/ نخیر
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setModalBasic(false);
                    handleClick(true);
                  }}
                  style={{ marginLeft: '5%' }}
                >
                  هو / بلی
                </Button>{' '}
              </ModalFooter>
            </Modal>{' '}
            {!dataDeletion ? (
              <div className="p-5">
                <h1>Ahmad Is Student of Nima</h1>
              </div>
            ) : (
              <CardTitle className="p-5">
                Your Students Data Deleted Successfully
              </CardTitle>
            )}
          </CardBody>
        </Card>
      </Colxx>
    </div>
  );
};

export default Demo;
