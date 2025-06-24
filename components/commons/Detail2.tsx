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
  onClickPickup?: MouseEventHandler<HTMLElement> | undefined;
  onClickDelivery?: MouseEventHandler<HTMLElement> | undefined;
  onClickDiscount?: MouseEventHandler<HTMLElement> | undefined;
  onClickPromo?: MouseEventHandler<HTMLElement> | undefined;
  onClickRent?: MouseEventHandler<HTMLElement> | undefined;
}

const PriceHeader: React.FC<{originalPrice?: string, currentPrice?: string, discount?: string}> = ({ 
  originalPrice = '1.033K', 
  currentPrice = '913K',
  discount = '13%'
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-gray-400 line-through text-sm">{originalPrice}</span>
        <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
          -{discount}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{currentPrice}</span>
        <span className="text-gray-500">/ngày</span>
      </div>
    </div>
  );
};

const DateSelector: React.FC = () => {
  return (
    <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4">
      <div className="grid grid-cols-2">
        <div className="p-4 border-r border-orange-400">
          <div className="text-gray-600 text-sm mb-1">Nhận xe</div>
          <div className="font-medium">24/06/2025</div>
          <div className="text-gray-500 text-sm">21:00</div>
        </div>
        <div className="p-4">
          <div className="text-gray-600 text-sm mb-1">Trả xe</div>
          <div className="font-medium">25/06/2025</div>
          <div className="text-gray-500 text-sm">20:00</div>
        </div>
      </div>
    </div>
  );
};

const WarningMessage: React.FC = () => {
  return (
    <div className="flex items-start gap-2 mb-6 p-3 bg-orange-50 rounded-lg">
      <div className="text-orange-500 mt-0.5">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-sm text-orange-600">
        Xe bận trong khoảng thời gian trên. Vui lòng đặt xe khác hoặc thay đổi lịch trình thích hợp.
      </div>
    </div>
  );
};

const SupportInfo: React.FC = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 text-gray-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">Chủ xe hỗ trợ thuê xe theo giờ.</span>
        <span className="text-green-500 text-sm cursor-pointer hover:underline">Tìm hiểu thêm</span>
      </div>
    </div>
  );
};

const DeliveryOptions: React.FC<{onClickPickup?: MouseEventHandler<HTMLElement>, onClickDelivery?: MouseEventHandler<HTMLElement>}> = ({
  onClickPickup,
  onClickDelivery
}) => {
  const [selectedOption, setSelectedOption] = useState('pickup');

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4 text-gray-900">Địa điểm giao nhận xe</h3>
      
      <div 
        className={`border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${selectedOption === 'pickup' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
        onClick={(e) => {
          setSelectedOption('pickup');
          onClickPickup?.(e);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 ${selectedOption === 'pickup' ? 'border-green-500 bg-green-500' : 'border-gray-300'} flex items-center justify-center`}>
              {selectedOption === 'pickup' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <div>
              <div className="font-medium text-gray-900">Tôi tự đến lấy xe</div>
              <div className="text-gray-600 text-sm">Quận Bình Thạnh, TP. Hồ Chí Minh</div>
            </div>
          </div>
          <span className="text-green-500 text-sm font-medium">Miễn phí</span>
        </div>
      </div>

      <div 
        className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedOption === 'delivery' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
        onClick={(e) => {
          setSelectedOption('delivery');
          onClickDelivery?.(e);
        }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 ${selectedOption === 'delivery' ? 'border-green-500 bg-green-500' : 'border-gray-300'} flex items-center justify-center`}>
            {selectedOption === 'delivery' && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
          <div className="font-medium text-gray-900">Tôi muốn được giao xe tận nơi</div>
        </div>
      </div>
    </div>
  );
};

const PriceBreakdown: React.FC = () => {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between items-center text-gray-700">
        <div className="flex items-center gap-2">
          <span>Đơn giá thuê</span>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="font-medium">1.033.200 /ngày</span>
      </div>

      <div className="flex justify-between items-center text-gray-700">
        <div className="flex items-center gap-2">
          <span>Bảo hiểm thuê xe</span>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="font-medium">92.701 /ngày</span>
      </div>

      <div className="text-gray-700 font-medium">Bảo hiểm bổ sung</div>

      <div className="flex items-center gap-3 ml-4">
        <input type="checkbox" className="rounded border-gray-300" />
        <div className="flex items-center gap-2 text-gray-600">
          <span>Bảo hiểm người trên xe</span>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="border-t pt-3 flex justify-between items-center font-medium text-gray-900">
        <span>Tổng cộng</span>
        <span>1.125.901 x 1 ngày</span>
      </div>
    </div>
  );
};

const DiscountSection: React.FC<{onClickDiscount?: MouseEventHandler<HTMLElement>, onClickPromo?: MouseEventHandler<HTMLElement>}> = ({
  onClickDiscount,
  onClickPromo
}) => {
  return (
    <div className="space-y-3 mb-6">
      <div 
        className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg cursor-pointer"
        onClick={onClickDiscount}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div className="text-green-600">
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs inline-block mb-1">%</div>
            <div className="font-medium">Chương trình giảm giá</div>
            <div className="text-sm">Giảm 120K trên đơn giá</div>
          </div>
        </div>
        <span className="text-green-600 font-medium">-120.000</span>
      </div>

      <div 
        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300"
        onClick={onClickPromo}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-300 rounded-full opacity-0"></div>
          </div>
          <div>
            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs inline-block mb-1">%</div>
            <div className="font-medium text-gray-700">Mã khuyến mãi</div>
          </div>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

const FinalPrice: React.FC = () => {
  return (
    <div className="border-t pt-4 mb-6">
      <div className="flex justify-between items-center text-xl font-bold text-gray-900">
        <span>Thành tiền</span>
        <span>1.005.901đ</span>
      </div>
    </div>
  );
};

const CarRentalBooking: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickPickup,
  onClickDelivery,
  onClickDiscount,
  onClickPromo,
  onClickRent,
  ...props
}) => {
  const safeData = data ?? {};
  const originalPrice = _.get(safeData, 'originalPrice', '1.033K');
  const currentPrice = _.get(safeData, 'currentPrice', '913K');
  const discount = _.get(safeData, 'discount', '13%');

  return (
    <div id={id} style={style} className={`max-w-md mx-auto bg-white p-6 ${className ?? ''}`}>
      <PriceHeader 
        originalPrice={originalPrice}
        currentPrice={currentPrice}
        discount={discount}
      />
      
      <DateSelector />
      <WarningMessage />
      <SupportInfo />
      
      <DeliveryOptions 
        onClickPickup={onClickPickup}
        onClickDelivery={onClickDelivery}
      />
      
      <PriceBreakdown />
      
      <DiscountSection 
        onClickDiscount={onClickDiscount}
        onClickPromo={onClickPromo}
      />
      
      <FinalPrice />
      
      <button 
        onClick={onClickRent}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
      >
        CHỌN THUÊ
      </button>
    </div>
  );
};

export default CarRentalBooking;