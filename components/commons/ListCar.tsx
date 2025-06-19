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
  drivers?: any[];
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
  drivers,
  ...props
}) => {
  const [driversList, setDriversList] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    maxPage: 1
  });

  useEffect(() => {
    Promise.all([fetchDrivers(), fetchCars()]);
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://car.blocktrend.xyz/api/driver/list', {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      setDriversList(_.get(result, 'data', []));
      setPagination({
        total: _.get(result, 'total', 0),
        currentPage: _.get(result, 'currentPage', 1),
        maxPage: _.get(result, 'maxPage', 1)
      });
    } catch (error) {
      console.error('Error fetching drivers:', error);
      // Fallback to sample data
      setDriversList([
        {
          "id": "0cd4816a-3fd8-44fd-a550-af21ceb271c9",
          "status": "active",
          "personal_id_number": "1234567489",
          "license_points": 12,
          "national_id_number": null,
          "first_name": "Nghiep",
          "last_name": "Nguyen",
          "email": "nghiep@gmail.com",
          "avatar": null
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
          "avatar": null
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
          "avatar": null
        }
      ]);
      setPagination({ total: 3, currentPage: 1, maxPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch('https://car.blocktrend.xyz/api/vehicle/list', {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setCars(_.get(result, 'data', []));
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Fallback to sample data
      setCars([
        {
          "id": "10795c70-f845-42a0-9422-a6b4724d627d",
          "status": "ready",
          "name": "Ford Ranger Raptor",
          "thumbnail": "c02527f6-98ce-45ec-b078-42e7dd19f555",
          "license_plate": "NDUSJ-1324",
          "vehicle_type": "7-seater",
          "fuel_type": [{"value": "diesel", "label": "Diesel"}],
          "drivetrain": {"value": "automatic", "label": "Automatic"}
        },
        {
          "id": "6a956095-2026-4db5-adc5-8634c57788db",
          "status": "ready",
          "name": "Nissan GT-R R35 Nismo",
          "thumbnail": "f5629d4d-d180-4a03-91f4-cda96fb7703d",
          "license_plate": "QBJD-QDK12-E11",
          "vehicle_type": "2-Sear Car",
          "fuel_type": [{"value": "gasoline", "label": "Gasoline"}],
          "drivetrain": {"value": "manual", "label": "Manual"}
        }
      ]);
    }
  };

  const getDriverCar = (driverId: string) => {
    // Randomly assign cars to drivers for demo purposes
    const availableCars = cars.filter(car => car?.status === 'ready');
    if (availableCars.length === 0) return null;
    
    const hash = driverId?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) ?? 0;
    const carIndex = hash % availableCars.length;
    return availableCars[carIndex] || null;
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

  const getCarStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'in-use':
        return 'bg-blue-100 text-blue-700';
      case 'under-maintenance':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCarStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Sẵn sàng';
      case 'in-use':
        return 'Đang sử dụng';
      case 'under-maintenance':
        return 'Bảo trì';
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
    <div className={`bg-white shadow-lg rounded-lg ${className ?? ''}`} id={id} style={style}>
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
        <h2 className="text-2xl font-bold text-white">🚗 Danh sách tài xế</h2>
        <p className="mt-2 text-sm text-blue-100">
          Tổng cộng {pagination.total} tài xế • {cars.length} xe có sẵn
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                👤 Tài xế
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                📧 Thông tin liên hệ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                🚙 Xe được gán
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                🟢 Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                🎯 Điểm bằng lái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                🆔 CMND/CCCD
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ⚙️ Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {driversList.map((driver, index) => {
              const assignedCar = getDriverCar(driver?.id ?? '');
              
              return (
                <tr
                  key={driver?.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 transform hover:scale-[1.01]"
                  onClick={(e) => handleDriverClick(driver, e)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 relative">
                        {driver?.avatar ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover border-2 border-blue-200"
                            src={driver.avatar}
                            alt=""
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {`${driver?.first_name ?? ''} ${driver?.last_name ?? ''}`.trim() || '👤 Chưa có tên'}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          🆔 {driver?.id?.slice(0, 8) ?? 'N/A'}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      📧 {driver?.email ?? 'Chưa có email'}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      🏷️ {driver?.personal_id_number ?? 'Chưa có'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignedCar ? (
                      <div 
                        className="cursor-pointer group p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 hover:border-green-400 transition-all duration-200"
                        onClick={(e) => handleCarClick(assignedCar, e)}
                      >
                        <div className="text-sm font-semibold text-green-800 group-hover:text-green-900">
                          🚗 {assignedCar?.name ?? 'Chưa có tên'}
                        </div>
                        <div className="text-xs text-green-600 font-mono">
                          🔢 {assignedCar?.license_plate ?? 'Chưa có biển số'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCarStatusColor(assignedCar?.status ?? '')}`}>
                            {getCarStatusText(assignedCar?.status ?? '')}
                          </span>
                          <span>
                            👥 {assignedCar?.vehicle_type ?? 'N/A'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 italic p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        🚫 Chưa được gán xe
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver?.status ?? '')}`}>
                      {getStatusText(driver?.status ?? '')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-white font-bold text-lg">
                        {driver?.license_points ?? 0}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">điểm</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                    🪪 {driver?.national_id_number ?? 'Chưa có'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={(e) => handleViewClick(driver, e)}
                        className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-all duration-200 transform hover:scale-110"
                        title="👁️ Xem chi tiết"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleEditClick(driver, e)}
                        className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-full transition-all duration-200 transform hover:scale-110"
                        title="✏️ Chỉnh sửa"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(driver, e)}
                        className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-all duration-200 transform hover:scale-110"
                        title="🗑️ Xóa"
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

      {driversList.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="text-6xl mb-4">🚗💨</div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">Không có tài xế nào</h3>
          <p className="mt-1 text-sm text-gray-500">Danh sách tài xế đang trống, hãy thêm tài xế mới!</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm text-gray-700 font-medium">
          📄 Trang {pagination.currentPage} / {pagination.maxPage} • 
          📊 Tổng cộng {pagination.total} tài xế • 
          🚗 {cars.length} xe
        </div>
        <div className="flex space-x-3">
          <button
            disabled={pagination.currentPage <= 1}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            ⬅️ Trước
          </button>
          <button
            disabled={pagination.currentPage >= pagination.maxPage}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            Sau ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverList;