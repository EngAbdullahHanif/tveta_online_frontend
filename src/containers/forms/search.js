import React, { useState } from 'react';
import './AutoComplete.css';
import IntlMessages from 'helpers/IntlMessages';
import { injectIntl } from 'react-intl';
const Autocomplete = ({ inst, intl, ChangeSelectedOption, placeholder }) => {
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
    ChangeSelectedOption(value);
    setSearchtext(value);
    setSuggest([]);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== '' && !resfound) {
      return <p>No data</p>;
    }

    return (
      <div className="bg-primary  " id="para">
        {suggest.map((item, index) => {
          return (
            <div key={index} className="divs">
              <p
                style={{
                  paddingInline: '10%',
                  marginTop: '-15px',
                  marginBottom: '-18px',
                  padding: '10px',
                }}
                onClick={() => suggestedText(item)}
              >
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
    <>
      <div className='searchDiv'>
        <input
          type="text"
          placeholder={placeholder}
          className="search"
          value={searchtext}
          onChange={handleChange}
        />
      </div>
      <div
        className="searchcontainer ml-3"
        color="outline-dark"
        style={{
          overflowY: 'auto',
          maxHeight: '200px',
          width: '195px',
          borderRadius: '10px',
          zIndex: 4,
        }}
      >
        {getSuggestions()}
      </div>
    </>
  );
};
export default Autocomplete;
