/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  title?: string;
  onClickLogo?: MouseEventHandler<HTMLElement> | undefined;
  onClickAbout?: MouseEventHandler<HTMLElement> | undefined;
  onClickBecomeOwner?: MouseEventHandler<HTMLElement> | undefined;
  onClickTransfer?: MouseEventHandler<HTMLElement> | undefined;
  onClickNotifications?: MouseEventHandler<HTMLElement> | undefined;
  onClickSearch?: MouseEventHandler<HTMLElement> | undefined;
  onClickProfile?: MouseEventHandler<HTMLElement> | undefined;
}

const Header: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  title = 'MIOTO',
  onClickLogo,
  onClickAbout,
  onClickBecomeOwner,
  onClickTransfer,
  onClickNotifications,
  onClickSearch,
  onClickProfile,
  ...props
}) => {
  const safeData = data ?? {};
  const displayTitle = title ?? 'MIOTO';

  return (
    <header 
      id={id}
      style={style}
      className={`bg-white shadow-sm border-b border-gray-200 ${className ?? ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <button
              onClick={onClickLogo}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {displayTitle}
              </span>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={onClickAbout}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Về chúng tôi
            </button>
            <button
              onClick={onClickBecomeOwner}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Trở thành chủ xe
            </button>
            <button
              onClick={onClickTransfer}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Chuyến của tôi
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={onClickNotifications}
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-4.5-4.5M9 17H4l4.5-4.5M12 3v18"
                />
              </svg>
            </button>

            {/* Search */}
            <button
              onClick={onClickSearch}
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Profile */}
            <button
              onClick={onClickProfile}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/32x32"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden sm:block">Đăng Minh Khôi</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;