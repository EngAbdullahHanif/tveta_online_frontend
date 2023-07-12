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
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              <div style={{ width: '10%', fontSize: '20px' }}>
                <NavLink to={`institute/${institute.id}`} className="">
                  <p
                    className="list-item-heading mb-1 "
                    style={{ fontSize: '20px' }}
                  >
                    {institute.id}
                  </p>
                </NavLink>
              </div>
              <div style={{ width: '18%', fontSize: '20px' }}>
                <NavLink to={`institute/${institute.id}`} className="">
                  <p
                    className="list-item-heading mb-1 truncate"
                    style={{ fontSize: '20px' }}
                  >
                    {institute.name}
                  </p>
                </NavLink>
              </div>
              <p className="mb-1 " style={{ width: '14%', fontSize: '20px' }}>
                {institute.province}
              </p>
              {institute.type === '1' ? (
                <p className="mb-1 " style={{ width: '14%', fontSize: '20px' }}>
                  <IntlMessages id="dash.institutePublic" />
                </p>
              ) : (
                <p className="mb-1 " style={{ width: '15%', fontSize: '20px' }}>
                  <IntlMessages id="dash.institutePrivate" />
                </p>
              )}

              {institute.gender === 'male' ? (
                <p className="mb-1 " style={{ width: '13%', fontSize: '20px' }}>
                  <IntlMessages id="institute.studentgenderOption_1" />
                </p>
              ) : institute.gender === 'female' ? (
                <p className="mb-1 " style={{ width: '13%', fontSize: '20px' }}>
                  <IntlMessages id="institute.studentgenderOption_2" />
                </p>
              ) : (
                <p className="mb-1 " style={{ width: '13%', fontSize: '20px' }}>
                  <IntlMessages id="institute.studentgenderOption_3" />
                </p>
              )}

              {institute.status === 'active' ? (
                <p className="mb-1 " style={{ width: '15%', fontSize: '20px' }}>
                  <IntlMessages id="institute.statusOption_1" />
                </p>
              ) : (
                <p className="mb-1 " style={{ width: '15%', fontSize: '20px' }}>
                  <IntlMessages id="institute.statusOption_2" />
                </p>
              )}
            </div>
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <NavLink to={`/app/institutes/register/${institute.id}`}>
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
