import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchView = ({ 
  placeholder = 'Search...', 
  onSearch, 
  leftImage, 
  className = '',
  ...props 
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const baseClasses = 'w-full bg-global-4 text-global-2 text-xs sm:text-sm rounded-[18px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-global-13';

  return (
    <div className={`relative flex items-center ${className}`}>
      {leftImage && (
        <img 
          src={leftImage.src} 
          alt="search" 
          className="absolute left-3 w-[18px] h-[16px] z-10"
        />
      )}
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${baseClasses} ${leftImage ? 'pl-10 pr-3' : 'px-3'} py-2 sm:py-2.5`}
        {...props}
      />
    </div>
  );
};

SearchView.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  leftImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default SearchView;