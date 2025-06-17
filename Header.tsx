import React from 'react';
import { ShoppingCart, User, MapPin, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  tableId: string;
  onCartClick: () => void;
  onBackToTableSelect?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ tableId, onCartClick, onBackToTableSelect }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {onBackToTableSelect && (
              <button
                onClick={onBackToTableSelect}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                TableQR
              </h1>
              <p className="text-xs text-gray-500">Professional Dining</p>
            </div>
          </div>

          {/* Table Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Table <span className="font-bold text-emerald-600">{tableId}</span>
              </span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};