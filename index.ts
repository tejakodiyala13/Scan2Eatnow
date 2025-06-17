export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isVeg: boolean;
  isSpicy: boolean;
  isPopular: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  specifications: string;
  cartId: string;
}

export interface TableInfo {
  id: string;
  name: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
}

export interface Order {
  id: string;
  tableId: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'completed';
  timestamp: Date;
  customerNotes: string;
  estimatedTime: number;
}

export interface OrderUpdate {
  orderId: string;
  status: Order['status'];
  timestamp: Date;
}