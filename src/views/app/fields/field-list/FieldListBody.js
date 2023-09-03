import React, { useState } from 'react';
import {
  Card,
  CustomInput,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import callApi from 'helpers/callApi';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';

const createNotification = (type, className) => {
  const cName = className || '';
  switch (type) {
    case 'success':
      NotificationManager.success(
        'رشته په بریالیتوب سره دیلیت شو',
        'موفقیت',
        3000,
        null,
        null,
        cName
      );
      break;
    case 'error':
      NotificationManager.error(
        'رشته دیلیت نه شو بیا کوشش وکری',
        'خطا',
        9000,
        () => {
          alert('callback');
        },
        null,
        cName
      );
      break;
    default:
      NotificationManager.info('Info message');
      break;
  }
};

const FieldListBody = ({ field, isSelect, collect, onCheckItem, index }) => {
  console.log('inside body', field);
  const [modalBasic, setModalBasic] = useState(false);

  const handleClick = async (fieldId) => {
    const instituteResponse = await callApi(
      `institute/field/${fieldId}/`,
      'DELETE',
      null
    );
    if (instituteResponse.status >= 200 && instituteResponse.status < 300) {
      console.log('succesfully deleted');
      createNotification('success', 'filled');
      // relaoad after 3 seconds to see the changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.log('error');
      createNotification('error', 'filled');
    }

    // setDeletion(event);
  };
  return (
    <Colxx xxs="12" key={field.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={field.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, field.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center "
              style={{ width: '100%' }}
            >
              <p
                className="list-item-heading mb-1 truncate"
                style={{ width: '25%', fontSize: 20 }}
              >
                {index + 1}
              </p>

              <p
                className="mb-1 text-small"
                style={{ width: '26%', textAlign: 'right', fontSize: 20 }}
              >
                {field.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '25%', textAlign: 'right', fontSize: 20 }}
              >
                {field.english_name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right', fontSize: 20 }}
              >
                {field.sector.sector}
              </p>
            </div>
            <>
              {/* <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <div>
                  <BsPencilSquare
                    outline
                    style={{ fontSize: '20px' }}
                    id="updateIcon"
                  />
                </div>
                <div className="ml-2">
                  <BsTrashFill
                    id="deleteIcon"
                    outline
                    onClick={() => setModalBasic(true)}
                    style={{ fontSize: '20px' }}
                  />
                </div>
              </div> */}
              <Modal
                isOpen={modalBasic}
                toggle={() => setModalBasic(!modalBasic)}
                style={{ marginTop: '10%' }}
              >
                <ModalHeader>
                  <IntlMessages id="modal.deletion-message-title" />
                </ModalHeader>
                <ModalBody className="text-center">
                  <IntlMessages id="modal.deletion-message-details" />
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
                      handleClick(`${field.id}`);
                    }}
                    style={{ marginLeft: '5%' }}
                  >
                    هو / بلی
                  </Button>{' '}
                </ModalFooter>
              </Modal>{' '}
            </>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(FieldListBody);
