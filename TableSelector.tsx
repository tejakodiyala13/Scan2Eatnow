import React, { useState } from 'react';
import { MapPin, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { TableInfo } from '../types';

interface TableSelectorProps {
  onTableSelect: (tableId: string) => void;
}

const tables: TableInfo[] = [
  { id: '1', name: 'Table 1', capacity: 2, status: 'available' },
  { id: '2', name: 'Table 2', capacity: 4, status: 'occupied' },
  { id: '3', name: 'Table 3', capacity: 6, status: 'available' },
  { id: '4', name: 'Table 4', capacity: 4, status: 'reserved' },
  { id: '5', name: 'Table 5', capacity: 8, status: 'available' },
  { id: '6', name: 'Table 6', capacity: 2, status: 'available' },
  { id: '7', name: 'Table 7', capacity: 4, status: 'available' },
  { id: '8', name: 'Table 8', capacity: 6, status: 'occupied' },
];

export const TableSelector: React.FC<TableSelectorProps> = ({ onTableSelect }) => {
  const [selectedTable, setSelectedTable] = useState<string>('');

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
  };

  const handleContinue = () => {
    if (selectedTable) {
      onTableSelect(selectedTable);
    }
  };

  const getStatusIcon = (status: TableInfo['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'occupied':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'reserved':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: TableInfo['status']) => {
    switch (status) {
      case 'available':
        return 'border-green-200 hover:border-green-300 bg-green-50';
      case 'occupied':
        return 'border-orange-200 bg-orange-50 opacity-60 cursor-not-allowed';
      case 'reserved':
        return 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Welcome to TableQR
          </h1>
          <p className="text-gray-600">Select your table to start ordering</p>
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => table.status === 'available' && handleTableSelect(table.id)}
              disabled={table.status !== 'available'}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedTable === table.id
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                  : getStatusColor(table.status)
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{table.name}</span>
                {getStatusIcon(table.status)}
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{table.capacity} seats</span>
              </div>
              
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  table.status === 'available' 
                    ? 'bg-green-100 text-green-700'
                    : table.status === 'occupied'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedTable}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
              selectedTable
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Menu
          </button>
          
          {selectedTable && (
            <p className="text-sm text-gray-600 mt-2">
              You selected {tables.find(t => t.id === selectedTable)?.name}
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span>Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};