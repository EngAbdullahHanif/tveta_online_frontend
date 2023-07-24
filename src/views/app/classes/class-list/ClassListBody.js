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
        'صنف په بریالیتوب سره دیلیت شو',
        'موفقیت',
        3000,
        null,
        null,
        cName
      );
      break;
    case 'error':
      NotificationManager.error(
        'صنف دیلیت نه شو بیا کوشش وکری',
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

const InstituteListBody = ({
  classs,
  isSelect,
  collect,
  onCheckItem,
  index,
}) => {
  const [modalBasic, setModalBasic] = useState(false);

  const handleClick = async (classId) => {
    const instituteResponse = await callApi(
      `institute/classs/${classId}/`,
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
    <Colxx xxs="12" key={classs.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={classs.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, classs.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${classs.id}`} className="d-flex">
            <img
              alt={classs.title}
              src={classs.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="py-3 card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center">
              <NavLink
                to={`${classs.id}`}
                className=""
                style={{ width: '22%', fontSize: '20px' }}
              >
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5" style={{ fontSize: '20px' }}>
                    {index + 1}
                  </span>
                </p>
              </NavLink>
              <NavLink
                to={`${classs.id}`}
                style={{ width: '20%', fontSize: '20px' }}
              >
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ fontSize: '20px' }}
                >
                  {classs.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{
                  width: '20%',
                  textAlign: 'right',
                  marginRight: 50,
                  fontSize: '20px',
                }}
              >
                {classs.semester}
              </p>
              <p
                className="mb-1 text-small"
                style={{
                  width: '20%',
                  textAlign: 'right',
                  marginRight: 50,
                  fontSize: '20px',
                }}
              >
                {classs.section}
              </p>
              <p
                className="mb-1 text-small"
                style={{
                  width: '20%',
                  textAlign: 'right',
                  marginRight: 50,
                  fontSize: '20px',
                }}
              >
                {classs.season}
              </p>
            </div>
            <>
              <div
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
                      handleClick(`${classs.id}`);
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
export default React.memo(InstituteListBody);
