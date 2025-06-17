import { useState, useEffect } from 'react';
import { Order } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedOrders = localStorage.getItem('tableqr-orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // Convert timestamp strings back to Date objects
        const ordersWithDates = parsedOrders.map((order: any) => ({
          ...order,
          timestamp: new Date(order.timestamp)
        }));
        setOrders(ordersWithDates);
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('tableqr-orders', JSON.stringify(orders));
    }
  }, [orders, isLoading]);

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrdersByTable = (tableId: string) => {
    return orders.filter(order => order.tableId === tableId);
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const getPendingOrders = () => {
    return orders.filter(order => 
      ['pending', 'confirmed', 'preparing'].includes(order.status)
    );
  };

  const getCompletedOrders = () => {
    return orders.filter(order => 
      ['delivered', 'completed'].includes(order.status)
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  const clearCompletedOrders = () => {
    setOrders(prevOrders => 
      prevOrders.filter(order => !['delivered', 'completed'].includes(order.status))
    );
  };

  return {
    orders,
    addOrder,
    updateOrderStatus,
    getOrdersByTable,
    getOrdersByStatus,
    getPendingOrders,
    getCompletedOrders,
    deleteOrder,
    clearCompletedOrders,
    isLoading
  };
};