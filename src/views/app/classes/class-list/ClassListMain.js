import React, { useState, useEffect } from "react";
import callApi from "helpers/callApi";
import IntlMessages from "helpers/IntlMessages";
// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from "./ClassListHeading";

import ListPageListing from "./ClassListCatagory";
import useMousetrap from "hooks/use-mousetrap";
import { semesterOptions } from "views/app/global-data/options";

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const servicePath = "http://localhost:8000";

const apiUrl = `${servicePath}/cakes/paging`;
const instituteApiUrl = `${servicePath}/institute/classs/`;

const pageSizes = [4, 8, 12, 20];

const ThumbListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState("thumblist");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedSemesterOption, setSelectedSemesterOption] = useState({
    column: "all",
    label: <IntlMessages id="field.SemesterLabel" />,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [rest, setRest] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedSemesterOption]);

  useEffect(() => {
    async function fetchData() {
      // axios
      //   // .get(
      //   //   `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`
      //   // )
      //   // get data from localhost:8000/institute
      //   .get(`${instituteApiUrl}`)
      //   .then((res) => {
      //     console.log('res.data', res.data);
      //     return res.data;
      //   })
      //   .then((data) => {
      // setTotalPage(data.totalPage);
      // setItems(data.data);
      // set fecahed data to items
      // setItems(data);

      // setSelectedItems([]);

      // setItems(
      //   data.data.map((x) => {
      //     console.log('Single Value of the array ', x);
      //     return { ...x, img: x.img.replace('img/', 'img/products/') };
      //   })
      // );
      // setSelectedItems([]);
      // setTotalItemCount(data.totalItem);
      // setIsLoaded(true);
      // });
      const response = await callApi(`institute/classs/`, "", null);
      if (response.data && response.status === 200) {
        setItems(response.data);
        setSelectedItems([]);
        // setTotalItemCount(data.totalItem);
        setIsLoaded(true);
      } else {
        console.log("3, institute error");
      }
    }
    fetchData();
  }, [selectedPageSize, currentPage, selectedSemesterOption, search]);

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

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
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

  useMousetrap(["ctrl+a", "command+a"], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(["ctrl+d", "command+d"], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  console.log("Data displayed on the table", items);

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="د صنفونو لست/ لست صنف ها"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
          changeSemesterBy={(column) => {
            setSelectedSemesterOption(
              semesterOptions.find((x) => x.column === column)
            );
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedSemesterOption={selectedSemesterOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            setSearch(e.target.value.toLowerCase());
            // if (e.key === 'Enter') {
            // }
          }}
          onResetClick={setRest}
          semesterOptions={semesterOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark"
            style={{ maxHeight: "55px", marginRight: 2 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: "20%",
                  padding: "0%",
                  textAlign: "right",
                  borderStyle: "hidden",
                  fontSize: "20px",
                }}
              >
                <IntlMessages id="marks.ID" />
              </th>
              <th
                style={{
                  width: "20%",
                  paddingInline: "0%",
                  textAlign: "right",
                  borderStyle: "hidden",
                  fontSize: "20px",
                }}
              >
                <IntlMessages id="curriculum.classLabel" />
              </th>

              <th
                style={{
                  width: "20%",
                  padding: "0%",
                  textAlign: "right",
                  borderStyle: "hidden",
                  fontSize: "20px",
                }}
              >
                {" "}
                <IntlMessages id="field.SemesterLabel" />
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
    </>
  );
};

export default ThumbListPages;
