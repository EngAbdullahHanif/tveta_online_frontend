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
import IntlMessages from 'helpers/IntlMessages';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';

const DormListBody = ({ dorm, isSelect, collect, onCheckItem }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);

  const handleClick = (event) => {
    setDeletion(event);
    console.log('API should be called here');
  };
  return (
    <Colxx xxs="12" key={dorm.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={dorm.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, dorm.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${dorm.id}`} className="d-flex">
            <img
              alt={dorm.title}
              src={dorm.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="py-3 card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center">
              <NavLink to={`dorm/${dorm.id}`} style={{ width: '10%' }}>
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5" style={{ fontSize: '20px' }}>
                    {dorm.id}
                  </span>
                </p>
              </NavLink>
              <NavLink to={`dorm/${dorm.id}`} style={{ width: '15%' }}>
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ fontSize: '20px' }}
                >
                  {dorm.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', fontSize: '20px' }}
              >
                {dorm.province}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '16%', fontSize: '20px' }}
              >
                {dorm.district}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '11%', fontSize: '20px' }}
              >
                {dorm.capacity}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '12%', fontSize: '20px' }}
              >
                {dorm.quota}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', fontSize: '20px' }}
              >
                {dorm.building_ownership === 'private' ? 'خصوصی' : 'دولتی'}
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
                      setModalBasic(false);
                      handleClick(true);
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
export default React.memo(DormListBody);
