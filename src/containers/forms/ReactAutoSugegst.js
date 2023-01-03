import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import Search from './search';

const ReactAutoSugegstExample = ({ intl, data, select }) => {
  var result = data.map((a) => a.name);
  const [selectedOption, setSelectedOption] = useState({});

  //find the selected institute from result array
  const findSelectedInstitute = (op) => {
    const selectedInstitute = data.find((a) => a.name === op);
    setSelectedOption(selectedInstitute);
    select(selectedInstitute);
    console.log('selectedOption', selectedOption);
    console.log('selectedInstitute', selectedInstitute);
  };

  return (
    <Search
      inst={result}
      ChangeSelectedOption={(option) => {
        findSelectedInstitute(option);
      }}
    />
  );
};

export default injectIntl(ReactAutoSugegstExample);
