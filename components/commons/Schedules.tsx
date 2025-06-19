/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect, MouseEventHandler } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  onClickSchedule?: MouseEventHandler<HTMLElement> | undefined;
  onClickView?: MouseEventHandler<HTMLElement> | undefined;
  onClickEdit?: MouseEventHandler<HTMLElement> | undefined;
  onClickDelete?: MouseEventHandler<HTMLElement> | undefined;
  onClickRefresh?: MouseEventHandler<HTMLElement> | undefined;
}

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Đang xử lý';
      case 'waiting':
        return 'Chờ xử lý';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
};

// Schedule Card Component
const ScheduleCard: React.FC<{
  schedule: any;
  onClickView?: MouseEventHandler<HTMLElement>;
  onClickEdit?: MouseEventHandler<HTMLElement>;
  onClickDelete?: MouseEventHandler<HTMLElement>;
}> = ({ schedule, onClickView, onClickEdit, onClickDelete }) => {
  const safeSchedule = schedule ?? {};
  const id = _.get(safeSchedule, 'id', '');
  const status = _.get(safeSchedule, 'status', '');
  const startDate = _.get(safeSchedule, 'start_date', '');
  const endDate = _.get(safeSchedule, 'end_date', '');
  const totalDays = _.get(safeSchedule, 'total_days', '0');
  const vehicleName = _.get(safeSchedule, 'vehicle.name', 'N/A');
  const driverOption = _.get(safeSchedule, 'driver_option', '');
  const driverName = _.get(safeSchedule, 'driver.full_name', 'Chưa phân công');

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getDriverOptionText = (option: string) => {
    return option === 'with_driver' ? 'Có tài xế' : 'Tự lái';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Lịch trình</h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-gray-500">ID: {id.substring(0, 8)}...</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClickView}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Xem chi tiết"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={onClickEdit}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Chỉnh sửa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onClickDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Xóa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Ngày bắt đầu</p>
            <p className="text-sm text-gray-900">{formatDate(startDate)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ngày kết thúc</p>
            <p className="text-sm text-gray-900">{formatDate(endDate)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng số ngày</p>
            <p className="text-sm text-gray-900">{totalDays} ngày</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phương tiện</p>
            <p className="text-sm text-gray-900">{vehicleName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Tùy chọn lái xe</p>
            <p className="text-sm text-gray-900">{getDriverOptionText(driverOption)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tài xế</p>
            <p className="text-sm text-gray-900">{driverName || 'Chưa phân công'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const ScheduleHeader: React.FC<{
  total: number;
  currentPage: number;
  onClickRefresh?: MouseEventHandler<HTMLElement>;
}> = ({ total, currentPage, onClickRefresh }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch trình</h1>
          <p className="text-gray-500 mt-1">
            Hiển thị {total} lịch trình - Trang {currentPage}
          </p>
        </div>
        <button
          onClick={onClickRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Làm mới
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

// Empty State Component
const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Không có lịch trình nào</h3>
      <p className="mt-2 text-gray-500">Chưa có lịch trình nào được tạo.</p>
    </div>
  );
};

// Main Component
const ScheduleManagement: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  ...props
}) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const safeData = data ?? {};
  const initialSchedules = _.get(safeData, 'data', []);
  const total = _.get(safeData, 'total', 0);
  const currentPage = _.get(safeData, 'currentPage', 1);
  const maxPage = _.get(safeData, 'maxPage', 1);

  useEffect(() => {
    if (_.isArray(initialSchedules) && initialSchedules.length > 0) {
      setSchedules(initialSchedules);
      setLoading(false);
    } else {
      fetchSchedules();
    }
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://car.blocktrend.xyz/api/schedule/list');
      
      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }
      
      const result = await response.json();
      const scheduleData = _.get(result, 'data', []);
      
      if (_.isArray(scheduleData)) {
        setSchedules(scheduleData);
      }
    } catch (err) {
      setError('Không thể tải danh sách lịch trình');
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleAction = (scheduleId: string, actionType: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(`${actionType} schedule:`, scheduleId);
    
    // Call appropriate prop function based on action
    switch (actionType) {
      case 'view':
        props.onClickView?.(event);
        break;
      case 'edit':
        props.onClickEdit?.(event);
        break;
      case 'delete':
        props.onClickDelete?.(event);
        break;
      default:
        props.onClickSchedule?.(event);
    }
  };

  const handleRefresh = (event: React.MouseEvent) => {
    event.preventDefault();
    fetchSchedules();
    props.onClickRefresh?.(event);
  };

  if (loading) {
    return (
      <div id={id} style={style} className={`container mx-auto p-6 ${className ?? ''}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div id={id} style={style} className={`container mx-auto p-6 ${className ?? ''}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={id} style={style} className={`container mx-auto p-6 ${className ?? ''}`}>
      <ScheduleHeader
        total={total || schedules.length}
        currentPage={currentPage}
        onClickRefresh={handleRefresh}
      />

      {schedules.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => {
            const scheduleId = _.get(schedule, 'id', '');
            return (
              <ScheduleCard
                key={scheduleId}
                schedule={schedule}
                onClickView={handleScheduleAction(scheduleId, 'view')}
                onClickEdit={handleScheduleAction(scheduleId, 'edit')}
                onClickDelete={handleScheduleAction(scheduleId, 'delete')}
              />
            );
          })}
        </div>
      )}

      {maxPage > 1 && (
        <div className="flex justify-center mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">
              Trang {currentPage} / {maxPage} - Tổng {total} lịch trình
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;