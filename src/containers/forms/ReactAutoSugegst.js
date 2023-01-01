import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import ReactAutoSuggest from 'components/common/ReactAutoSuggest';
import cakes from 'data/cakes';
import Search from './search';

// const pata = cakes.map((item) => {
//   return { name: item.title };
// });

const ReactAutoSugegstExample = ({ intl, data }) => {
  const [value, setValue] = useState('');
  const { messages } = intl;

  var result = data.map((a) => a.name);

  console.log('data400', result);
  const [fatchedData] = useState(result);

  return <Search inst={result} />;
};

export default injectIntl(ReactAutoSugegstExample);
