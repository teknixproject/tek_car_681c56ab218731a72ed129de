/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler, useState } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  tabs?: any[];
  locations?: string[];
  defaultLocation?: string;
  searchButtonText?: string;
  onClickSearch?: MouseEventHandler<HTMLElement> | undefined;
  onClickTab?: MouseEventHandler<HTMLElement> | undefined;
  onSubmitForm?: MouseEventHandler<HTMLFormElement> | undefined;
  onChangeLocation?: MouseEventHandler<HTMLSelectElement> | undefined;
  onChangeDate?: MouseEventHandler<HTMLInputElement> | undefined;
  onChangeStartDate?: MouseEventHandler<HTMLInputElement> | undefined;
  onChangeEndDate?: MouseEventHandler<HTMLInputElement> | undefined;
  onChangeStartTime?: MouseEventHandler<HTMLInputElement> | undefined;
  onChangeEndTime?: MouseEventHandler<HTMLInputElement> | undefined;
}

// Hero Background Component
const HeroBackground: React.FC<OnClickProps> = ({ 
  backgroundImage,
  children,
  ...props 
}) => {
  const bgImage = backgroundImage ?? 'https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg';
  
  return (
    <div 
      className="relative h-96 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      {children}
    </div>
  );
};

// Hero Text Content Component
const HeroTextContent: React.FC<OnClickProps> = ({ 
  title,
  subtitle,
  ...props 
}) => {
  const heroTitle = title ?? 'Mioto - Cùng Bạn Đến Mọi Hành Trình';
  const heroSubtitle = subtitle ?? 'Trải nghiệm sự khác biệt từ hơn 10,000 xe gia đình đời mới khắp Việt Nam';

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl">{heroSubtitle}</p>
    </div>
  );
};

// Tab Item Component
const TabItem: React.FC<{
  tab: any;
  isActive: boolean;
  onClick: (tabId: string) => void;
  onClickTab?: MouseEventHandler<HTMLElement>;
}> = ({ tab, isActive, onClick, onClickTab }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(tab?.id ?? '');
    onClickTab?.(event);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex-1 p-4 text-center relative ${
        isActive 
          ? 'bg-green-500 text-white' 
          : 'text-gray-600 hover:bg-gray-50'
      } first:rounded-l-lg last:rounded-r-lg transition-colors`}
    >
      <div className="flex items-center justify-center gap-2">
        <span>{tab?.icon ?? '🚗'}</span>
        <span className="font-medium">{tab?.label ?? 'Tab'}</span>
        {tab?.badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {tab.badge}
          </span>
        )}
      </div>
    </button>
  );
};

// Tab Navigation Component
const TabNavigation: React.FC<OnClickProps> = ({ 
  tabs,
  onClickTab,
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState('self-drive');
  
  const defaultTabs = [
    { id: 'self-drive', label: 'Xe tự lái', icon: '🚗' },
    { id: 'with-driver', label: 'Xe có tài xế', icon: '👨‍✈️' },
    { id: 'limousine', label: 'Thuê xe dài hạn', icon: '🚐', badge: 'MỚI' }
  ];
  
  const tabItems = _.isArray(tabs) ? tabs : defaultTabs;

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex bg-white rounded-lg shadow-sm mb-4">
      {tabItems?.map((tab: any) => (
        <TabItem
          key={tab?.id ?? Math.random()}
          tab={tab}
          isActive={activeTab === tab?.id}
          onClick={handleTabClick}
          onClickTab={onClickTab}
        />
      ))}
    </div>
  );
};

// Location Icon Component
const LocationIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Location Dropdown Component
const LocationDropdown: React.FC<OnClickProps> = ({ 
  locations,
  defaultLocation,
  onChangeLocation,
  ...props 
}) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  
  const defaultLocations = [
    'TP. Hồ Chí Minh',
    'Hà Nội', 
    'Đà Nẵng',
    'Cần Thơ',
    'Nha Trang',
    'Đà Lạt'
  ];
  
  const locationList = _.isArray(locations) ? locations : defaultLocations;
  const currentLocation = defaultLocation ?? 'TP. Hồ Chí Minh';

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLocation(value);
    onChangeLocation?.(event as any);
  };

  return (
    <div className="flex-1">
      <label className="flex items-center gap-2 text-gray-600 mb-2">
        <LocationIcon />
        Địa điểm
      </label>
      <select
        value={selectedLocation || currentLocation}
        onChange={handleLocationChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
      >
        {locationList?.map((location: string) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

// Calendar Icon Component
const CalendarIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Date Input Field Component
const DateInputField: React.FC<{
  label: string;
  dateValue: string;
  timeValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onChangeDate?: MouseEventHandler<HTMLInputElement>;
}> = ({ 
  label, 
  dateValue, 
  timeValue, 
  onDateChange, 
  onTimeChange,
  onChangeDate 
}) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(event.target.value);
    onChangeDate?.(event as any);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTimeChange(event.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="date"
        value={dateValue}
        onChange={handleDateChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
      <input
        type="time"
        value={timeValue}
        onChange={handleTimeChange}
        className="w-full p-2 border border-gray-300 rounded mt-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  );
};

// Date Display Component
const DateDisplay: React.FC<{
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ startDate, endDate, startTime, endTime, isOpen, onToggle }) => {
  const formatDateDisplay = () => {
    if (!startDate || !endDate) {
      return '21:00, 16/06/2025 - 20:00, 17/06/2025';
    }
    
    const formatDate = (dateStr: string, time: string) => {
      const date = new Date(dateStr);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${time}, ${day}/${month}/${year}`;
    };

    return `${formatDate(startDate, startTime)} - ${formatDate(endDate, endTime)}`;
  };

  return (
    <input
      type="text"
      value={formatDateDisplay()}
      onClick={onToggle}
      readOnly
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer"
      placeholder="Chọn thời gian thuê"
    />
  );
};

// Date Picker Dropdown Component
const DatePickerDropdown: React.FC<{
  isOpen: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onChangeDate?: MouseEventHandler<HTMLInputElement>;
}> = ({ 
  isOpen, 
  startDate, 
  endDate, 
  startTime, 
  endTime,
  onStartDateChange,
  onEndDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onChangeDate
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
      <div className="grid grid-cols-2 gap-4">
        <DateInputField
          label="Ngày bắt đầu"
          dateValue={startDate}
          timeValue={startTime}
          onDateChange={onStartDateChange}
          onTimeChange={onStartTimeChange}
          onChangeDate={onChangeDate}
        />
        <DateInputField
          label="Ngày kết thúc"
          dateValue={endDate}
          timeValue={endTime}
          onDateChange={onEndDateChange}
          onTimeChange={onEndTimeChange}
          onChangeDate={onChangeDate}
        />
      </div>
    </div>
  );
};

// Date Picker Component
const DatePicker: React.FC<OnClickProps> = ({ 
  onChangeDate,
  onChangeStartDate,
  onChangeEndDate,
  onChangeStartTime,
  onChangeEndTime,
  ...props 
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('21:00');
  const [endTime, setEndTime] = useState('20:00');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex-1">
      <label className="flex items-center gap-2 text-gray-600 mb-2">
        <CalendarIcon />
        Thời gian thuê
      </label>
      <div className="relative">
        <DateDisplay
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
          isOpen={isOpen}
          onToggle={toggleDropdown}
        />
        <DatePickerDropdown
          isOpen={isOpen}
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onChangeDate={onChangeDate}
        />
      </div>
    </div>
  );
};

// Search Icon Component
const SearchIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Search Button Component
const SearchButton: React.FC<OnClickProps> = ({ 
  onClickSearch,
  searchButtonText,
  ...props 
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClickSearch?.(event);
  };

  const buttonText = searchButtonText ?? 'Tìm Xe';

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 h-fit"
    >
      <SearchIcon />
      {buttonText}
    </button>
  );
};

// Search Form Container Component
const SearchFormContainer: React.FC<OnClickProps> = ({ 
  tabs,
  locations,
  defaultLocation,
  searchButtonText,
  onSubmitForm,
  onChangeLocation,
  onChangeDate,
  onClickSearch,
  onClickTab,
  onChangeStartDate,
  onChangeEndDate,
  onChangeStartTime,
  onChangeEndTime,
  ...props 
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitForm?.(event as any);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto -mt-16 relative z-20">
      <TabNavigation 
        tabs={tabs}
        onClickTab={onClickTab}
        {...props} 
      />
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
        <LocationDropdown 
          locations={locations}
          defaultLocation={defaultLocation}
          onChangeLocation={onChangeLocation}
          {...props} 
        />
        <DatePicker 
          onChangeDate={onChangeDate}
          onChangeStartDate={onChangeStartDate}
          onChangeEndDate={onChangeEndDate}
          onChangeStartTime={onChangeStartTime}
          onChangeEndTime={onChangeEndTime}
          {...props} 
        />
        <SearchButton 
          searchButtonText={searchButtonText}
          onClickSearch={onClickSearch}
          {...props} 
        />
      </form>
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC<OnClickProps> = ({ 
  backgroundImage,
  title,
  subtitle,
  ...props 
}) => {
  return (
    <HeroBackground backgroundImage={backgroundImage} {...props}>
      <HeroTextContent 
        title={title}
        subtitle={subtitle}
        {...props}
      />
    </HeroBackground>
  );
};

// Main Car Rental Component
const CarRentalForm: React.FC<OnClickProps> = ({ 
  id,
  style,
  className,
  data,
  items,
  backgroundImage,
  title,
  subtitle,
  tabs,
  locations,
  defaultLocation,
  searchButtonText,
  onSubmitForm,
  onChangeLocation,
  onChangeDate,
  onClickSearch,
  onClickTab,
  onChangeStartDate,
  onChangeEndDate,
  onChangeStartTime,
  onChangeEndTime,
  ...props 
}) => {
  const safeData = data ?? {};
  const containerClass = `min-h-screen bg-gray-50 ${className ?? ''}`;

  // Safe data extraction with fallbacks
  const heroBackgroundImage = backgroundImage ?? _.get(safeData, 'backgroundImage') ?? 'https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg';
  const heroTitle = title ?? _.get(safeData, 'title');
  const heroSubtitle = subtitle ?? _.get(safeData, 'subtitle');
  const tabItems = tabs ?? _.get(safeData, 'tabs');
  const locationList = locations ?? _.get(safeData, 'locations');
  const defaultLocationValue = defaultLocation ?? _.get(safeData, 'defaultLocation');
  const searchText = searchButtonText ?? _.get(safeData, 'searchButtonText');

  // Event handlers with safe function calls
  const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Searching for cars...');
    onClickSearch?.(event);
  };

  const handleLocationChange = (event: React.MouseEvent<HTMLSelectElement>) => {
    console.log('Location changed:', event.currentTarget.value);
    onChangeLocation?.(event);
  };

  const handleDateChange = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log('Date changed:', event.currentTarget.value);
    onChangeDate?.(event);
  };

  const handleFormSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
    onSubmitForm?.(event);
  };

  const handleTabClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Tab clicked');
    onClickTab?.(event);
  };

  return (
    <div id={id} style={style} className={containerClass}>
      <HeroSection 
        backgroundImage={heroBackgroundImage}
        title={heroTitle}
        subtitle={heroSubtitle} 
        {...props}
      />
      <div className="container mx-auto px-4">
        <SearchFormContainer 
          tabs={tabItems}
          locations={locationList}
          defaultLocation={defaultLocationValue}
          searchButtonText={searchText}
          onSubmitForm={handleFormSubmit}
          onChangeLocation={handleLocationChange}
          onChangeDate={handleDateChange}
          onClickSearch={handleSearchClick}
          onClickTab={handleTabClick}
          onChangeStartDate={onChangeStartDate}
          onChangeEndDate={onChangeEndDate}
          onChangeStartTime={onChangeStartTime}
          onChangeEndTime={onChangeEndTime}
          {...props}
        />
      </div>
    </div>
  );
};

export default CarRentalForm;