import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Timer,
  Flame,
  Leaf
} from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { Order } from '../types';

export const KitchenDashboard: React.FC = () => {
  const { orders, updateOrderStatus, getPendingOrders } = useOrders();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const activeOrders = orders.filter(order => 
    ['confirmed', 'preparing'].includes(order.status)
  );

  const readyOrders = orders.filter(order => order.status === 'ready');

  const getOrderAge = (timestamp: Date) => {
    const diff = currentTime.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes;
  };

  const getUrgencyColor = (minutes: number) => {
    if (minutes > 20) return 'text-red-600 bg-red-50 border-red-200';
    if (minutes > 10) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <ChefHat className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Kitchen Dashboard</h1>
          </div>
          <p className="text-gray-600">
            {currentTime.toLocaleTimeString()} • {activeOrders.length} active orders
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold text-orange-600">{activeOrders.length}</p>
              </div>
              <Timer className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready to Serve</p>
                <p className="text-2xl font-bold text-green-600">{readyOrders.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Prep Time</p>
                <p className="text-2xl font-bold text-blue-600">12 min</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Orders */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Active Orders ({activeOrders.length})
          </h2>
          
          {activeOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No active orders</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeOrders.map((order) => {
                const orderAge = getOrderAge(order.timestamp);
                return (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Table {order.tableId}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            order.status === 'confirmed' 
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-orange-50 text-orange-700 border-orange-200'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Order #{order.id.slice(-6)}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>

                      <div className={`px-3 py-1 rounded-lg border text-sm font-medium ${getUrgencyColor(orderAge)}`}>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{orderAge} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium">
                              {item.quantity}x
                            </span>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{item.name}</span>
                                {item.isVeg && <Leaf className="w-4 h-4 text-green-500" />}
                                {item.isSpicy && <Flame className="w-4 h-4 text-red-500" />}
                              </div>
                              {item.specifications && (
                                <p className="text-sm text-gray-600 italic">"{item.specifications}"</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.customerNotes && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Special Instructions</p>
                            <p className="text-sm text-yellow-700">"{order.customerNotes}"</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                        >
                          Start Preparing
                        </button>
                      )}
                      
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'ready')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                        >
                          Mark as Ready
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ready Orders */}
        {readyOrders.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Serve ({readyOrders.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {readyOrders.map((order) => (
                <div key={order.id} className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-green-900">Table {order.tableId}</h3>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-green-700 mb-2">Order #{order.id.slice(-6)}</p>
                  <p className="text-sm text-green-700 mb-3">{order.customerName}</p>
                  
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'delivered')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Mark as Delivered
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};