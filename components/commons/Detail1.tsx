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
  onClickViewMore?: MouseEventHandler<HTMLElement> | undefined;
  onClickCheckbox?: MouseEventHandler<HTMLElement> | undefined;
}

const InsuranceCard: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickViewMore,
  onClickCheckbox,
  ...props
}) => {
  const safeData = data ?? {};
  const title = _.get(safeData, 'title', 'Bảo hiểm bổ sung');
  const productName = _.get(safeData, 'productName', 'Bảo hiểm người trên xe');
  const price = _.get(safeData, 'price', '50.000đ /ngày');
  const description = _.get(safeData, 'description', 'Trường hợp xảy ra sự cố ngoài ý muốn, tài xế & người ngồi trên xe được bảo hiểm với giá trị tối đa 300.000.000 VND/người.');
  const isNew = _.get(safeData, 'isNew', true);

  return (
    <div 
      id={id} 
      style={style} 
      className={`bg-white border border-gray-200 rounded-lg p-6 max-w-2xl ${className ?? ''}`}
    >
      {/* Header */}
      <h2 className="text-green-500 text-xl font-medium mb-4">
        {title}
      </h2>
      
      {/* Product Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {/* Checkbox */}
          <div 
            className="w-5 h-5 border border-gray-300 rounded cursor-pointer hover:border-green-500"
            onClick={onClickCheckbox}
          >
            <div className="w-full h-full bg-gray-50 rounded"></div>
          </div>
          
          {/* Product Name and New Badge */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-800 font-medium text-lg">
              {productName}
            </span>
            {isNew && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Mới
              </span>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="text-green-500 font-semibold text-lg">
          {price}
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed mb-4">
        {description}
      </p>
      
      {/* View More Link */}
      <div 
        className="flex items-center text-gray-700 cursor-pointer hover:text-green-500 transition-colors"
        onClick={onClickViewMore}
      >
        <span className="font-medium">Xem thêm</span>
        <svg 
          className="w-4 h-4 ml-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </div>
    </div>
  );
};

export default InsuranceCard;