/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler, useState, useEffect } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  cars?: any[];
  onClickDriver?: MouseEventHandler<HTMLElement> | undefined;
  onClickEdit?: MouseEventHandler<HTMLElement> | undefined;
  onClickDelete?: MouseEventHandler<HTMLElement> | undefined;
  onClickView?: MouseEventHandler<HTMLElement> | undefined;
  onClickCar?: MouseEventHandler<HTMLElement> | undefined;
}

const DriverList: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  cars,
  ...props
}) => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    maxPage: 1
  });

  // Safe cars data handling
  const safeCars = _.isArray(cars) ? cars : [];

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://car.blocktrend.xyz/api/driver/list');
      const result = await response.json();
      
      setDrivers(_.get(result, 'data', []));
      setPagination({
        total: _.get(result, 'total', 0),
        currentPage: _.get(result, 'currentPage', 1),
        maxPage: _.get(result, 'maxPage', 1)
      });
    } catch (error) {
      console.error('Error fetching drivers:', error);
      // Fallback to sample data
      setDrivers([
        {
          "id": "0cd4816a-3fd8-44fd-a550-af21ceb271c9",
          "status": "active",
          "personal_id_number": "1234567489",
          "license_points": 12,
          "national_id_number": null,
          "first_name": "Nghiep",
          "last_name": "Nguyen",
          "email": "nghiep@gmail.com",
          "avatar": null,
          "car_id": "car-001"
        },
        {
          "id": "56ec4129-c0fb-4ce8-aa02-761262b28054",
          "status": "pending-review",
          "personal_id_number": "123456789",
          "license_points": 12,
          "national_id_number": "123456789",
          "first_name": "Trần",
          "last_name": "Thiện",
          "email": "tranthien2805@gmail.com",
          "avatar": null,
          "car_id": "car-002"
        },
        {
          "id": "ea71556e-031d-4da1-ab25-9a7701970949",
          "status": "inactive",
          "personal_id_number": "123456789",
          "license_points": 56,
          "national_id_number": "12312312",
          "first_name": "Pham",
          "last_name": "Minh Pham",
          "email": "minh@gmail.com",
          "avatar": null,
          "car_id": null
        }
      ]);
      setPagination({ total: 3, currentPage: 1, maxPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  const getDriverCar = (driverId: string) => {
    return safeCars.find(car => car?.driver_id === driverId || car?.id === driverId) || null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'pending-review':
        return 'Chờ duyệt';
      case 'inactive':
        return 'Không hoạt động';
      default:
        return status;
    }
  };

  const handleDriverClick = (driver: any, event: React.MouseEvent) => {
    props.onClickDriver?.(event);
  };

  const handleEditClick = (driver: any, event: React.MouseEvent) => {
    event.stopPropagation();
    props.onClickEdit?.(event);
  };

  const handleDeleteClick = (driver: any, event: React.MouseEvent) => {
    event.stopPropagation();
    props.onClickDelete?.(event);
  };

  const handleViewClick = (driver: any, event: React.MouseEvent) => {
    event.stopPropagation();
    props.onClickView?.(event);
  };

  const handleCarClick = (car: any, event: React.MouseEvent) => {
    event.stopPropagation();
    props.onClickCar?.(event);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white ${className ?? ''}`} id={id} style={style}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Danh sách tài xế</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tổng cộng {pagination.total} tài xế
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tài xế
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thông tin liên hệ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Xe được gán
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm bằng lái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CMND/CCCD
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drivers.map((driver) => {
              const assignedCar = getDriverCar(driver?.id ?? '');
              
              return (
                <tr
                  key={driver?.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={(e) => handleDriverClick(driver, e)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        {driver?.avatar ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={driver.avatar}
                            alt=""
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {`${driver?.first_name ?? ''} ${driver?.last_name ?? ''}`.trim() || 'Chưa có tên'}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {driver?.id?.slice(0, 8) ?? 'N/A'}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{driver?.email ?? 'Chưa có email'}</div>
                    <div className="text-sm text-gray-500">
                      CMND: {driver?.personal_id_number ?? 'Chưa có'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignedCar ? (
                      <div 
                        className="cursor-pointer group"
                        onClick={(e) => handleCarClick(assignedCar, e)}
                      >
                        <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800">
                          {assignedCar?.make ?? ''} {assignedCar?.model ?? ''}
                        </div>
                        <div className="text-sm text-gray-500">
                          {assignedCar?.license_plate ?? 'Chưa có biển số'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {assignedCar?.year ?? 'N/A'}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 italic">
                        Chưa được gán xe
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver?.status ?? '')}`}>
                      {getStatusText(driver?.status ?? '')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {driver?.license_points ?? 0}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">điểm</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {driver?.national_id_number ?? 'Chưa có'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={(e) => handleViewClick(driver, e)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Xem chi tiết"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleEditClick(driver, e)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(driver, e)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Xóa"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {drivers.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Không có tài xế nào</h3>
          <p className="mt-1 text-sm text-gray-500">Danh sách tài xế trống</p>
        </div>
      )}

      <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Trang {pagination.currentPage} / {pagination.maxPage} - Tổng cộng {pagination.total} tài xế
        </div>
        <div className="flex space-x-2">
          <button
            disabled={pagination.currentPage <= 1}
            className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <button
            disabled={pagination.currentPage >= pagination.maxPage}
            className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverList;