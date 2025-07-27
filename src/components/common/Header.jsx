import React from 'react';
import SearchView from '../ui/SearchView';

const Header = () => {
  const handleSearch = (searchValue) => {
    console.log('Search:', searchValue);
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-0 px-4 sm:px-0">
      {/* Search View */}
      <div className="w-full sm:w-[32%]">
        <SearchView
          placeholder="Search for jobs, candidates and more..."
          onSearch={handleSearch}
          leftImage={{
            src: "/images/img_searchnormal.svg",
            width: 18,
            height: 16
          }}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Icon */}
        <button className="relative bg-global-4 rounded-[18px] p-2 transition-colors duration-200 hover:bg-global-5">
          <img 
            src="/images/img_group_427318807.svg" 
            alt="notifications" 
            className="w-[22px] h-[22px]"
          />
        </button>

        {/* Messages with Badge */}
        <button className="relative bg-global-4 rounded-[18px] p-2 transition-colors duration-200 hover:bg-global-5">
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-[6px] h-[6px] bg-global-13 rounded-full"></div>
            <img 
              src="/images/img_notification.svg" 
              alt="messages" 
              className="w-[18px] h-[18px]"
            />
          </div>
        </button>

        {/* Profile Avatar */}
        <button className="rounded-[18px] overflow-hidden transition-transform duration-200 hover:scale-105">
          <img 
            src="/images/img_rectangle_13.png" 
            alt="profile" 
            className="w-[38px] h-[38px] object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;