import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';

import ListPageHeading from './DepartmentListHeading';

import ListPageListing from './DepartmentListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import callApi from 'helpers/callApi';
import config from '../../../../config';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const servicePath = config.API_URL;
const apiUrl = `${servicePath}/cakes/paging`;
const departmentApiUrl = `${servicePath}/institute/department/`;
const instituteApiUrl = `${servicePath}/institute/`;
const teacherInstituteApiUrl = `${servicePath}/teachers/institute/`;

const genderOptions = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  { column: '1', label: 'ذکور' },
  { column: '2', label: 'اناث' },
];
const pageSizes = [4, 8, 12, 20];

const Provinces = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  {
    column: '1',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" />,
  },
  {
    column: '2',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" />,
  },
  {
    column: '3',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" />,
  },
  {
    column: '4',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" />,
  },
  {
    column: '5',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" />,
  },
  {
    column: '6',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" />,
  },
  {
    column: '7',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" />,
  },
  {
    column: '8',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" />,
  },
  {
    column: '9',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" />,
  },
  {
    column: '10',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
  },
  {
    column: '11',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
  },
  {
    column: '12',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
  },
  {
    column: '13',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
  },
  {
    column: 'کابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
  },
  {
    column: '15',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
  },
  {
    column: '16',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
  },
  {
    column: '17',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
  },
  {
    column: '18',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
  },
  {
    column: '19',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
  },
  {
    column: '20',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    column: '21',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
  },
  {
    column: '22',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
  },
  {
    column: '23',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
  },
  {
    column: '24',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
  },
  {
    column: '25',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
  },
  {
    column: '26',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
  },
  {
    column: '27',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
  },
  {
    column: '28',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
  },
  {
    column: '29',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    column: '30',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
  },
  {
    column: '31',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
  },
  {
    column: '32',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
  },
  {
    column: '33',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
  },
  {
    column: '34',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
];
const ThumbListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedGenderOption, setSelectedGenderOption] = useState({
    column: 'all',
    label: 'جنیست',
  });
  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    column: 'all',
    label: 'ولایت',
  });
  const [selectedFieldOption, setSelectedFieldOption] = useState({
    value: 'all',
    label: <IntlMessages id="marks.FieldLabelList" />,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [teacherId, setTeacherId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [rest, setRest] = useState(0);
  const [institutes, setInstitutes] = useState([]);
  const [institute, setInstitute] = useState('');
  const [instituteTeachers, setInstituteTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedGenderOption, selectedProvinceOption]);

  useEffect(() => {
    async function fetchData() {
      if (selectedFieldOption?.value === 'all') {
        if (rest === true) {
          setRest(false);
        }
        if (selectedFieldOption?.value === 'all') {
          selectedFieldOption.value = '';
        }
        const response = await callApi('institute/department/', '', null);
        if (response.data && response.status === 200) {
          console.log('DEPARTMENTS:', response);
          setItems(response.data);
          setSelectedItems([]);
          // setTotalItemCount(response.data.totalItem);
          setIsLoaded(true);
        } else {
          console.log('error');
        }
      } else {
        console.log('field changed', selectedFieldOption);
        let newField = selectedFieldOption?.value;
        if (
          selectedFieldOption?.value === 'all' ||
          selectedFieldOption === null ||
          selectedFieldOption === undefined
        ) {
          newField = '';
        }
        const response = await callApi(
          `institute/department/?field_of_study=${newField}`,
          '',
          null
        );
        console.log('DEPARTMENTS:', response);
        if (response.data && response.status === 200) {
          setItems(response.data);
          setSelectedItems([]);
          // setTotalItemCount(response.data.totalItem);
          setIsLoaded(true);
        } else {
          console.log('error');
        }
      }
    }

    // }
    fetchData();
  }, [selectedPageSize, currentPage, selectedFieldOption, rest]);

  const fetchInstitutes = async () => {
    const response = await axios.get(instituteApiUrl);
    const updatedData = await response.data.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    setInstitutes(updatedData);
  };
  const fetchFields = async () => {
    const response = await callApi('institute/field/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      const all = { value: 'all', label: 'همه' };
      updatedData.unshift(all);
      setFields(updatedData);
    } else {
      console.log('field error');
    }
  };
  useEffect(() => {
    fetchInstitutes();
    fetchFields();
  }, []);
  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
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
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
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
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="د دیپارتمنتونو لست/ لست دیپارتمنت ها"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
          changeGenderBy={(column) => {
            setSelectedGenderOption(
              genderOptions.find((x) => x.column === column)
            );
          }}
          changeProvinceBy={(column) => {
            setSelectedProvinceOption(
              Provinces.find((x) => x.column === column)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedProvinceOption={selectedProvinceOption}
          genderOptions={genderOptions}
          provinces={Provinces}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onIdSearchKey={(e) => {
            if (e.key === 'Enter') {
              setTeacherId(e.target.value.toLowerCase());
            }
          }}
          onProvinceSearchKey={(e) => {
            if (e.key === 'Enter') {
              setProvince(e.target.value.toLowerCase());
            }
          }}
          onDistrictSearchKey={(e) => {
            if (e.key === 'Enter') {
              setDistrict(e.target.value.toLowerCase());
            }
          }}
          onResetClick={setRest}
          reset={rest}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          institutes={institutes}
          onInstituteSelect={setInstitute}
          changeFieldBy={(value) => {
            setSelectedFieldOption(fields.find((x) => x.value === value));
          }}
          fields={fields}
          selectedFieldOption={selectedFieldOption}
        />
        <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark"
            style={{ maxHeight: '55px', marginRight: 2 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '15%',
                  fontSize: '20px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="department.id" />
              </th>
              <th
                style={{
                  width: '20%',
                  fontSize: '20px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="departmentField" />
              </th>
              <th
                style={{
                  width: '30%',
                  fontSize: '20px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="departmentName" />
              </th>
              <th
                style={{
                  fontSize: '20px',
                  width: '30%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="departmentEnglishName" />
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
