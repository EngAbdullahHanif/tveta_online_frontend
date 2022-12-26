import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import ReactAutoSuggest from 'components/common/ReactAutoSuggest';

// const data = cakes.map((item) => {
//   return { name: item.title };
// });

const ReactAutoSugegstExample = ({ intl, data }) => {
  const [value, setValue] = useState('');
  const { messages } = intl;

  // const selected = data.find((d) => d.name === value);
  // onSelect(selected);

  return (
    <ReactAutoSuggest
      placeholder={messages['form-components.type-a-cake']}
      value={value}
      onChange={(val) => setValue(val)}
      data={data}
    />
  );
};

export default injectIntl(ReactAutoSugegstExample);
