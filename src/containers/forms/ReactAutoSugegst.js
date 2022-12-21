import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import ReactAutoSuggest from 'components/common/ReactAutoSuggest';
import cakes from 'data/cakes';

const ReactAutoSugegstExample = ({ intl, data }) => {
  const [value, setValue] = useState('');
  const { messages } = intl;

  return (
    <ReactAutoSuggest
      placeholder={messages['institute.search']}
      value={value}
      onChange={(val) => setValue(val)}
      data={data}
    />
  );
};

export default injectIntl(ReactAutoSugegstExample);
