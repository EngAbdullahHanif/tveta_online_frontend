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
import IntlMessages from 'helpers/IntlMessages';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';

const InstituteListBody = ({ institute, isSelect, collect, onCheckItem }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);

  const handleClick = (event) => {
    setDeletion(event);
    console.log('API should be called here');
  };
  return (
    <Colxx xxs="12" key={institute.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={institute.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, institute.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${institute.id}`} className="d-flex">
            <img
              alt={institute.title}
              src={institute.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              <div style={{ width: '10%' }}>
                <NavLink to={`institute/${institute.id}`} className="">
                  <p className="list-item-heading mb-1">{institute.id}</p>
                </NavLink>
              </div>
              <div style={{ width: '22%' }}>
                <NavLink to={`institute/${institute.id}`} className="">
                  <p className="list-item-heading mb-1 truncate">
                    {institute.name}
                  </p>
                </NavLink>
              </div>
              <p className="mb-1 text-small" style={{ width: '22%' }}>
                {institute.province}
              </p>
              {institute.type === '1' ? (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  دولتی
                </p>
              ) : (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  شخصی
                </p>
              )}

              {institute.gender === '1' ? (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  ذکور
                </p>
              ) : institute.gender === '2' ? (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  اناث
                </p>
              ) : (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  مختلط
                </p>
              )}
            </div>
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <NavLink to={`/app/institutes/register/${institute.id}`} >
                <div>
                  <BsPencilSquare
                    outline
                    style={{ fontSize: '20px' }}
                    id="updateIcon"
                    />
                </div>
                    </NavLink>
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
export default React.memo(InstituteListBody);
