import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ 
  placeholder = 'Select...', 
  options = [], 
  onSelect, 
  rightImage,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (option) => {
    setSelectedValue(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const baseClasses = 'w-full bg-global-4 text-global-2 text-xs sm:text-sm rounded-[18px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-global-13 cursor-pointer';

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${baseClasses} flex items-center justify-between px-3 py-2 sm:py-2.5`}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <span className={selectedValue ? 'text-global-3' : 'text-global-2'}>
          {selectedValue || placeholder}
        </span>
        {rightImage && (
          <img 
            src={rightImage.src} 
            alt="dropdown" 
            className={`w-[14px] h-[16px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-global-4 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 text-global-3 hover:bg-global-5 cursor-pointer text-xs sm:text-sm transition-colors duration-200"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  onSelect: PropTypes.func,
  rightImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default Dropdown;