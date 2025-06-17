import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { TableSelector } from './components/TableSelector';
import { AdminDashboard } from './components/AdminDashboard';
import { KitchenDashboard } from './components/KitchenDashboard';
import { menuItems } from './data/menuItems';
import { useCart } from './hooks/useCart';
import { useOrders } from './hooks/useOrders';

type ViewState = 'table-select' | 'menu' | 'checkout' | 'confirmation';

const TableQRApp: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState<ViewState>('table-select');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const { getTotalItems } = useCart();
  const { addOrder } = useOrders();

  const tableId = searchParams.get('table') || selectedTable;

  // Initialize view based on URL params
  useEffect(() => {
    if (tableId) {
      setSelectedTable(tableId);
      setCurrentView('menu');
    } else {
      setCurrentView('table-select');
    }
  }, [tableId]);

  const handleTableSelect = (table: string) => {
    setSelectedTable(table);
    setSearchParams({ table });
    setCurrentView('menu');
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleOrderPlaced = (order: any) => {
    addOrder(order);
    setCurrentView('confirmation');
  };

  const handleBackToMenuFromConfirmation = () => {
    setCurrentView('menu');
  };

  const handleBackToTableSelect = () => {
    setSearchParams({});
    setSelectedTable('');
    setCurrentView('table-select');
  };

  if (currentView === 'table-select') {
    return <TableSelector onTableSelect={handleTableSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        tableId={tableId} 
        onCartClick={handleCartClick}
        onBackToTableSelect={handleBackToTableSelect}
      />
      
      <main className="pt-16">
        {currentView === 'menu' && (
          <Menu items={menuItems} />
        )}
        
        {currentView === 'checkout' && (
          <Checkout
            tableId={tableId}
            onBack={handleBackToMenu}
            onOrderPlaced={handleOrderPlaced}
          />
        )}
        
        {currentView === 'confirmation' && (
          <OrderConfirmation onBackToMenu={handleBackToMenuFromConfirmation} />
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Floating Cart Button for Mobile */}
      {getTotalItems() > 0 && !isCartOpen && currentView === 'menu' && (
        <button
          onClick={handleCartClick}
          className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 md:hidden"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          </div>
        </button>
      )}
    </div>
  );
};

// Admin Route Component
const AdminRoute: React.FC = () => {
  return <AdminDashboard />;
};

// Kitchen Route Component  
const KitchenRoute: React.FC = () => {
  return <KitchenDashboard />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableQRApp />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/kitchen" element={<KitchenRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;