import React, { useEffect, useState } from 'react';
import IntlMessages from 'helpers/IntlMessages';
import ListPageListing from 'views/app/students/bio/students-list/StudentListCatagory';
function UsersList(props) {
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([
    {
      user_id: '1',
      student_id: '2',
      name: 'Suhaib',
      province: 'Kabul',
      role: 'Admin',
    },
  ]);
  const [lastChecked, setLastChecked] = useState(null);
  const fetchData = async () => {
    // const response = await callApi("user/users/", "", null);
    // if (response) {
    //   setItems(response.data);
    //   console.log("Users: ", response.data);
    // }
  };

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <table className="table">
        <thead
          className="pl-2 d-flex flex-grow-1  table-dark mb-2"
          style={{ maxHeight: '55px' }}
        >
          <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
            <th
              style={{
                width: '11%',
                fontSize: '20px',
                paddingInline: '0%',
                textAlign: 'right',
                borderStyle: 'hidden',
              }}
            >
              <IntlMessages id="ایدی" />
            </th>
            <th
              style={{
                width: '14%',
                fontSize: '20px',
                paddingInline: '0%',
                textAlign: 'right',
                borderStyle: 'hidden',
              }}
            >
              <IntlMessages id="نوم" />
            </th>

            <th
              style={{
                width: '15%',
                padding: '0%',
                fontSize: '20px',
                textAlign: 'right',
                borderStyle: 'hidden',
              }}
            >
              <IntlMessages id="ادرس" />
            </th>
            <th
              style={{
                width: '15%',
                padding: '0%',
                fontSize: '20px',
                textAlign: 'right',
                borderStyle: 'hidden',
              }}
            >
              <IntlMessages id="رول" />
            </th>
            <th
              style={{
                width: '15%',
                padding: '0%',
                fontSize: '20px',
                textAlign: 'right',
                borderStyle: 'hidden',
              }}
            >
              <IntlMessages id="یوزر نوم" />
            </th>
          </tr>
        </thead>

        <ListPageListing
          items={items}
          displayMode={displayMode}
          selectedItems={selectedItems}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        />
      </table>
    </div>
  );
}

export default UsersList;
