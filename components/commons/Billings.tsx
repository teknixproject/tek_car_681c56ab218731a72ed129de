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
  onClickRefresh?: MouseEventHandler<HTMLElement> | undefined;
  onClickView?: MouseEventHandler<HTMLElement> | undefined;
  onClickEdit?: MouseEventHandler<HTMLElement> | undefined;
  onClickDelete?: MouseEventHandler<HTMLElement> | undefined;
}

// Status badge component
const StatusBadge: React.FC<{ status: any }> = ({ status }) => {
  const safeStatus = status ?? {};
  const value = _.get(safeStatus, 'value', '');
  const text = _.get(safeStatus, 'text', 'Unknown');
  
  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending-payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
      {text}
    </span>
  );
};

// Billing item row component
const BillingRow: React.FC<{
  item: any;
  onClickView?: MouseEventHandler<HTMLElement>;
  onClickEdit?: MouseEventHandler<HTMLElement>;
  onClickDelete?: MouseEventHandler<HTMLElement>;
}> = ({ item, onClickView, onClickEdit, onClickDelete }) => {
  const safeItem = item ?? {};
  const id = _.get(safeItem, 'id', '');
  const status = _.get(safeItem, 'status', {});
  const billingTotal = _.get(safeItem, 'billing_total', '0');
  const billingSubtotal = _.get(safeItem, 'billing_subtotal', '0');
  const billingPhone = _.get(safeItem, 'billing_phone', '');
  const createdAt = _.get(safeItem, 'created_at', '');
  const schedule = _.get(safeItem, 'schedule', null);

  const formatAmount = (amount: string) => {
    const num = parseInt(amount || '0');
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-900 font-mono">
        {id.slice(0, 8)}...
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={status} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
        {formatAmount(billingTotal)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {formatAmount(billingSubtotal)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {billingPhone}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {formatDate(createdAt)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {schedule || 'N/A'}
      </td>
      <td className="px-4 py-3">
        <div className="flex space-x-2">
          <button
            onClick={onClickView}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View
          </button>
          <button
            onClick={onClickEdit}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={onClickDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

// Pagination component
const Pagination: React.FC<{
  currentPage: number;
  maxPage: number;
  total: number;
  onPageChange?: (page: number) => void;
}> = ({ currentPage, maxPage, total, onPageChange }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange?.(Math.min(maxPage, currentPage + 1))}
          disabled={currentPage >= maxPage}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{Math.min(10, total)}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: maxPage }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange?.(Math.min(maxPage, currentPage + 1))}
              disabled={currentPage >= maxPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

// Loading component
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

// Error component
const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">
        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
      <p className="text-gray-500 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

// Main billing list component
const BillingList: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data: propData,
  items: propItems,
  onClickRefresh,
  onClickView,
  onClickEdit,
  onClickDelete,
  ...props
}) => {
  const [billingData, setBillingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBillingData = async (page: number = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found in localStorage');
      }

      const response = await fetch(`https://car.blocktrend.xyz/api/billing/list?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setBillingData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Use prop data if available, otherwise fetch from API
    if (propData && _.isArray(propItems)) {
      setBillingData({
        data: propItems,
        total: propItems.length,
        currentPage: 1,
        maxPage: 1
      });
      setLoading(false);
    } else {
      fetchBillingData();
    }
  }, [propData, propItems]);

  const handleRefresh = () => {
    onClickRefresh?.(event as any);
    fetchBillingData(currentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBillingData(page);
  };

  const safeData = billingData?.data ?? [];
  const total = billingData?.total ?? 0;
  const maxPage = billingData?.maxPage ?? 1;
  const pageNumber = billingData?.currentPage ?? currentPage;

  if (loading) {
    return (
      <div id={id} style={style} className={`bg-white rounded-lg shadow ${className ?? ''}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div id={id} style={style} className={`bg-white rounded-lg shadow ${className ?? ''}`}>
        <ErrorMessage message={error} onRetry={() => fetchBillingData(currentPage)} />
      </div>
    );
  }

  return (
    <div id={id} style={style} className={`bg-white rounded-lg shadow overflow-hidden ${className ?? ''}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Billing List</h2>
            <p className="text-sm text-gray-500 mt-1">
              Total {total} billing records
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {safeData.length > 0 ? (
              safeData.map((item: any, index: number) => (
                <BillingRow
                  key={_.get(item, 'id', index)}
                  item={item}
                  onClickView={onClickView}
                  onClickEdit={onClickEdit}
                  onClickDelete={onClickDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No billing records found</p>
                    <p className="text-sm">Get started by creating a new billing record.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {maxPage > 1 && (
        <Pagination
          currentPage={pageNumber}
          maxPage={maxPage}
          total={total}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BillingList;