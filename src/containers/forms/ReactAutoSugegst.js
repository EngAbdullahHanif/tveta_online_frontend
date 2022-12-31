import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import ReactAutoSuggest from 'components/common/ReactAutoSuggest';
import cakes from 'data/cakes';

const pata = cakes.map((item) => {
  return { name: item.title };
});

const ReactAutoSugegstExample = ({ intl, data }) => {
  const [value, setValue] = useState('');
  const { messages } = intl;

  // const selected = data.find((d) => d.name === value);
  // onSelect(selected);
  console.log('data', pata);
  return (
    <ReactAutoSuggest
      placeholder={messages['institute']}
      value={value}
      onChange={(val) => setValue(val)}
      data={pata}
    />
  );
};

export default injectIntl(ReactAutoSugegstExample);
