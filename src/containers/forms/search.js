import React, { useState } from 'react';
import './AutoComplete.css';
import IntlMessages from 'helpers/IntlMessages';
import { injectIntl } from 'react-intl';
const Autocomplete = ({ inst, intl }) => {
  //   const { messages } = intl;
  const [searchtext, setSearchtext] = useState('');
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  const handleChange = (e) => {
    let searchval = e.target.value;
    let suggestion = [];

    if (searchval.length > 0) {
      suggestion = inst
        .sort()
        .filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    }
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (value) => {
    console.log(value, 'suggested institute in search bar');
    setSearchtext(value);
    setSuggest([]);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== '' && !resfound) {
      return <p>No data</p>;
    }

    return (
      <div className="bg-primary " id="para">
        {suggest.map((item, index) => {
          return (
            <div key={index}>
              <p
                style={{ paddingInline: '10%' }}
                onClick={() => suggestedText(item)}
              >
                {' '}
                {item}
              </p>
              {index !== suggest.length - 1 && <hr />}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder=" انستیتوت  "
          className="search"
          value={searchtext}
          onChange={handleChange}
        />
      </div>
      <div
        className="searchcontainer mr-1 float-md-left  mb-1"
        color="outline-dark"
        style={{ overflowY: 'auto', maxHeight: '200px' }}
      >
        {getSuggestions()}
      </div>
    </div>
  );
};
export default Autocomplete;
