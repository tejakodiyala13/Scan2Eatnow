import React from 'react';
import { CheckCircle, Clock, Utensils, Home } from 'lucide-react';

interface OrderConfirmationProps {
  onBackToMenu: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onBackToMenu }) => {
  const orderNumber = `TQR-${Date.now().toString().slice(-6)}`;
  const estimatedTime = 15 + Math.floor(Math.random() * 10);

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your delicious meal is being prepared.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Order Number</span>
            <span className="font-bold text-emerald-600">{orderNumber}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Estimated delivery: {estimatedTime} minutes</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-full">
            <Utensils className="w-4 h-4" />
            <span className="text-sm font-medium">Being Prepared</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onBackToMenu}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Home className="w-5 h-5" />
          <span>Back to Menu</span>
        </button>

        <p className="text-xs text-gray-500 mt-4">
          Your order will be served at your table. 
          Payment can be made after your meal.
        </p>
      </div>
    </div>
  );
};