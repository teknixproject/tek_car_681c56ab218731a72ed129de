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
  onClickVehicle?: MouseEventHandler<HTMLElement> | undefined;
  onClickFilter?: MouseEventHandler<HTMLElement> | undefined;
  onClickRefresh?: MouseEventHandler<HTMLElement> | undefined;
}

// Vehicle Card Component
const VehicleCard: React.FC<{
  vehicle: any;
  onClickVehicle?: MouseEventHandler<HTMLElement>;
}> = ({ vehicle, onClickVehicle }) => {
  const safeVehicle = vehicle ?? {};
  const name = _.get(safeVehicle, 'name', 'Unknown Vehicle');
  const licensePlate = _.get(safeVehicle, 'license_plate', 'N/A');
  const vehicleType = _.get(safeVehicle, 'vehicle_type', 'N/A');
  const status = _.get(safeVehicle, 'status', 'unknown');
  const thumbnail = _.get(safeVehicle, 'thumbnail', null);
  const fuelTypes = _.get(safeVehicle, 'fuel_type', []);
  const drivetrain = _.get(safeVehicle, 'drivetrain.label', 'N/A');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'in-use':
        return 'bg-blue-100 text-blue-800';
      case 'under-maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border"
      onClick={onClickVehicle}
    >
      {/* Vehicle Image */}
      <div className="mb-4 h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {thumbnail ? (
          <img 
            src={`https://car.blocktrend.xyz/api/file/${thumbnail}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Vehicle Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
            {formatStatus(status)}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="font-medium">License Plate:</span>
            <span>{licensePlate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <span>{vehicleType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Drivetrain:</span>
            <span>{drivetrain}</span>
          </div>
        </div>

        {/* Fuel Types */}
        <div className="pt-2">
          <span className="text-xs font-medium text-gray-500 block mb-1">Fuel Types:</span>
          <div className="flex flex-wrap gap-1">
            {_.isArray(fuelTypes) && fuelTypes.map((fuel, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
              >
                {_.get(fuel, 'label', 'Unknown')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Component
const VehicleFilters: React.FC<{
  onFilterChange?: (filters: any) => void;
}> = ({ onFilterChange }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    onFilterChange?.({ status: status === 'all' ? '' : status, type: typeFilter === 'all' ? '' : typeFilter });
  };

  const handleTypeChange = (type: string) => {
    setTypeFilter(type);
    onFilterChange?.({ status: statusFilter === 'all' ? '' : statusFilter, type: type === 'all' ? '' : type });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select 
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="ready">Ready</option>
            <option value="in-use">In Use</option>
            <option value="under-maintenance">Under Maintenance</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
          <select 
            value={typeFilter}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="2-seater">2-Seater</option>
            <option value="4-seater">4-Seater</option>
            <option value="5-seater">5-Seater</option>
            <option value="7-seater">7-Seater</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Header Component
const VehicleHeader: React.FC<{
  total: number;
  currentPage: number;
  maxPage: number;
  onClickRefresh?: MouseEventHandler<HTMLElement>;
}> = ({ total, currentPage, maxPage, onClickRefresh }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600 mt-2">
            Showing {total} vehicles • Page {currentPage} of {maxPage}
          </p>
        </div>
        <button
          onClick={onClickRefresh}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Main Vehicle Management Component
const VehicleManagement: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickVehicle,
  onClickFilter,
  onClickRefresh,
  ...props
}) => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    maxPage: 1
  });

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found in localStorage');
      }

      const response = await fetch('https://car.blocktrend.xyz/api/vehicle/list', {
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
      const safeData = _.get(result, 'data', []);
      const total = _.get(result, 'total', 0);
      const currentPage = _.get(result, 'currentPage', 1);
      const maxPage = _.get(result, 'maxPage', 1);

      setVehicles(safeData);
      setFilteredVehicles(safeData);
      setPagination({ total, currentPage, maxPage });
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
      
      // Use fallback data if available
      const fallbackData = _.get(data, 'data', []);
      if (_.isArray(fallbackData) && fallbackData.length > 0) {
        setVehicles(fallbackData);
        setFilteredVehicles(fallbackData);
        setPagination({
          total: _.get(data, 'total', fallbackData.length),
          currentPage: _.get(data, 'currentPage', 1),
          maxPage: _.get(data, 'maxPage', 1)
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleFilterChange = (filters: any) => {
    const { status, type } = filters ?? {};
    let filtered = vehicles;

    if (status) {
      filtered = filtered.filter(vehicle => 
        _.get(vehicle, 'status', '').toLowerCase() === status.toLowerCase()
      );
    }

    if (type) {
      filtered = filtered.filter(vehicle => {
        const vehicleType = _.get(vehicle, 'vehicle_type', '').toLowerCase();
        return vehicleType.includes(type.toLowerCase());
      });
    }

    setFilteredVehicles(filtered);
    onClickFilter?.(new Event('filter') as any);
  };

  const handleVehicleClick = (vehicle: any) => (event: React.MouseEvent) => {
    console.log('Selected vehicle:', vehicle);
    onClickVehicle?.(event);
  };

  const handleRefresh = (event: React.MouseEvent) => {
    fetchVehicles();
    onClickRefresh?.(event);
  };

  if (loading) {
    return (
      <div id={id} style={style} className={`min-h-screen bg-gray-50 p-6 ${className ?? ''}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error && filteredVehicles.length === 0) {
    return (
      <div id={id} style={style} className={`min-h-screen bg-gray-50 p-6 ${className ?? ''}`}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div id={id} style={style} className={`min-h-screen bg-gray-50 p-6 ${className ?? ''}`}>
      <div className="max-w-7xl mx-auto">
        <VehicleHeader 
          total={pagination.total}
          currentPage={pagination.currentPage}
          maxPage={pagination.maxPage}
          onClickRefresh={handleRefresh}
        />
        
        <VehicleFilters onFilterChange={handleFilterChange} />

        {filteredVehicles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={_.get(vehicle, 'id', Math.random())}
                vehicle={vehicle}
                onClickVehicle={handleVehicleClick(vehicle)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;