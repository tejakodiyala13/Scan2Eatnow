import React, { useState } from 'react';
import { Plus, Leaf, Flame, Star, Clock } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { useCart } from '../hooks/useCart';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [specifications, setSpecifications] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    const cartItem: CartItem = {
      ...item,
      quantity,
      specifications: specifications.trim(),
      cartId: `${item.id}-${Date.now()}-${Math.random()}`
    };

    addToCart(cartItem);
    
    // Reset form
    setSpecifications('');
    setQuantity(1);
    
    // Simulate loading state
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {item.isPopular && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>Popular</span>
            </span>
          )}
          {item.isVeg && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Leaf className="w-3 h-3" />
              <span>Veg</span>
            </span>
          )}
          {item.isSpicy && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Flame className="w-3 h-3" />
              <span>Spicy</span>
            </span>
          )}
        </div>

        {/* Category */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {item.name}
          </h3>
          <div className="text-right">
            <p className="text-xl font-bold text-emerald-600">₹{item.price}</p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <span>10-15 min</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Specifications */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value.slice(0, 150))}
            placeholder="Any special requests? (e.g., less spicy, extra garnish)"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm"
            rows={2}
            maxLength={150}
          />
          <p className="text-xs text-gray-500 mt-1">
            {specifications.length}/150 characters
          </p>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Qty:</label>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="px-3 py-1 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 ${
              isAdding
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};