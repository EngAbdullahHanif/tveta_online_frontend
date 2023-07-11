import React, { useEffect, useState } from "react";
import IntlMessages from "helpers/IntlMessages";
import ListPageHeading from "views/app/students/bio/students-list/StudentListHeading";
import ListPageListing from "views/app/students/bio/students-list/StudentListCatagory";
import callApi from "helpers/callApi";
function UsersList(props) {
  const [displayMode, setDisplayMode] = useState("thumblist");
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([
    {
      user_id: "1",
      student_id: "2",
      name: "Suhaib",
      province: "Kabul",
      role: "Admin",
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
  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, "id");
      const end = getIndex(lastChecked, newItems, "id");
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };
  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log("onContextMenuClick - selected items", selectedItems);
    console.log("onContextMenuClick - action : ", data.action);
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
          style={{ maxHeight: "55px" }}
        >
          <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
            <th
              style={{
                width: "11%",
                fontSize: "20px",
                paddingInline: "0%",
                textAlign: "right",
                borderStyle: "hidden",
              }}
            >
              <IntlMessages id="ایدی" />
            </th>
            <th
              style={{
                width: "14%",
                fontSize: "20px",
                paddingInline: "0%",
                textAlign: "right",
                borderStyle: "hidden",
              }}
            >
              <IntlMessages id="نوم" />
            </th>

            <th
              style={{
                width: "15%",
                padding: "0%",
                fontSize: "20px",
                textAlign: "right",
                borderStyle: "hidden",
              }}
            >
              <IntlMessages id="ادرس" />
            </th>
            <th
              style={{
                width: "15%",
                padding: "0%",
                fontSize: "20px",
                textAlign: "right",
                borderStyle: "hidden",
              }}
            >
              <IntlMessages id="رول" />
            </th>
            <th
              style={{
                width: "15%",
                padding: "0%",
                fontSize: "20px",
                textAlign: "right",
                borderStyle: "hidden",
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
          onCheckItem={onCheckItem}
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

// import { SearchOutlined } from "@ant-design/icons";
// import { Button, Input, Space, Table } from "antd";
// import React, { useRef, useState } from "react";
// import Highlighter from "react-highlight-words";

// const data = [
//   {
//     key: "1",
//     name: "صهیب قانونی",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Joe Black",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Jim Green",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];

// const UsersList = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const searchInput = useRef();

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns = [
//     {
//       title: "نوم",
//       dataIndex: "name",
//       key: "name",
//       width: "30%",
//       ...getColumnSearchProps("name"),
//     },
//     {
//       title: "عمر/سن",
//       dataIndex: "age",
//       key: "age",
//       width: "20%",
//       ...getColumnSearchProps("age"),
//     },
//     {
//       title: "ادرس",
//       dataIndex: "address",
//       key: "address",
//       ...getColumnSearchProps("address"),
//       sorter: (a, b) => a.address.length - b.address.length,
//       sortDirections: ["descend", "ascend"],
//     },
//   ];

//   return (
//     <>
//       <Table
//         className="thead-dark"
//         direction="rtl"
//         columns={columns}
//         dataSource={data}
//       />
//       <table class="table" dir="rtl">
//         <thead class="thead-dark">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">First</th>
//             <th scope="col">Last</th>
//             <th scope="col">Handle</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th scope="row">1</th>
//             <td>Mark</td>
//             <td>Otto</td>
//             <td>@mdo</td>
//           </tr>
//           <tr>
//             <th scope="row">2</th>
//             <td>Jacob</td>
//             <td>Thornton</td>
//             <td>@fat</td>
//           </tr>
//           <tr>
//             <th scope="row">3</th>
//             <td>Larry</td>
//             <td>the Bird</td>
//             <td>@twitter</td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default UsersList;
