import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, User, Phone, MessageSquare } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Order } from '../types';

interface CheckoutProps {
  tableId: string;
  onBack: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ tableId, onBack, onOrderPlaced }) => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsPlacingOrder(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order object
    const order: Order = {
      id: `ORDER-${Date.now()}`,
      tableId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerNotes: customerNotes.trim(),
      items: cart,
      total: getTotalPrice(),
      timestamp: new Date(),
      status: 'confirmed',
      estimatedTime: 15 + (cart.length * 3)
    };

    console.log('Order placed:', order);
    
    clearCart();
    setIsPlacingOrder(false);
    onOrderPlaced(order);
  };

  const estimatedTime = 15 + (cart.length * 3);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Order Summary</h1>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Order</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Est. {estimatedTime} mins</span>
          </div>
        </div>

        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.cartId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                {item.specifications && (
                  <p className="text-sm text-gray-600 italic">"{item.specifications}"</p>
                )}
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between text-lg font-bold text-gray-900">
            <span>Total Amount:</span>
            <span className="text-emerald-600">₹{getTotalPrice()}</span>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Special Instructions (Optional)
            </label>
            <textarea
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Any special requests for the kitchen?"
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder || !customerName.trim()}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
          isPlacingOrder || !customerName.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isPlacingOrder ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Placing Order...</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Place Order - ₹{getTotalPrice()}</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By placing this order, you confirm that all details are correct.
        Payment will be processed at the table.
      </p>
    </div>
  );
};