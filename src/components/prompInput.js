import { Input, Popconfirm, Button } from 'antd';
import callApi from 'helpers/callApi';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
const PromptInput = ({ endpoint, colName, title }) => {
  const [val, setVal] = useState('');

  const fetchByID = async (value) => {
    await callApi(`${endpoint}/?${colName}=${value}`).then((response) => {
      // setItems(response.data);
      console.log('RESPONSE IN PROMPT: ', response.data);
    });
  };
  return (
    <Popconfirm
      title="Title"
      description={() => <Input onChange={(e) => setVal(e.target.value)} />}
      onConfirm={() => fetchByID(val)}
    >
      <Button
        style={{ border: 'none', background: 'none', fontWeight: 'bold' }}
      >
        {title} &nbsp;
        <BsSearch />
      </Button>
    </Popconfirm>
  );
};
export default PromptInput;
