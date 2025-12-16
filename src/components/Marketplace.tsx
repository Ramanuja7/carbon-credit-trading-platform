import { useState } from 'react';
import { TrendingUp, Building2, X, ShoppingCart } from 'lucide-react';
import { User, SellOrder } from '../App';
import { toast } from 'sonner@2.0.3';

interface MarketplaceProps {
  user: User;
  sellOrders: SellOrder[];
  onBuyFromListing: (order: SellOrder, tons: number) => void;
  onCancelOrder: (orderId: string) => void;
}

export function Marketplace({ user, sellOrders, onBuyFromListing, onCancelOrder }: MarketplaceProps) {
  const [selectedOrder, setSelectedOrder] = useState<SellOrder | null>(null);
  const [buyQuantity, setBuyQuantity] = useState(10);

  const openOrders = sellOrders.filter(order => order.status === 'open');
  const myOrders = openOrders.filter(order => order.sellerId === user.email);
  const otherOrders = openOrders.filter(order => order.sellerId !== user.email);

  const handleBuy = () => {
    if (!selectedOrder) return;
    
    if (buyQuantity > selectedOrder.tons) {
      toast.error('Quantity exceeds available credits');
      return;
    }

    onBuyFromListing(selectedOrder, buyQuantity);
    setSelectedOrder(null);
    setBuyQuantity(10);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Marketplace</h1>
        <p className="text-lg text-gray-600">
          Browse and trade carbon credits with other marketplace participants
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Active Listings</p>
          <p className="text-2xl text-gray-900">{openOrders.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Credits Available</p>
          <p className="text-2xl text-gray-900">
            {openOrders.reduce((sum, order) => sum + order.tons, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Average Price</p>
          <p className="text-2xl text-gray-900">
            ₹{openOrders.length > 0 
              ? Math.round(openOrders.reduce((sum, order) => sum + order.pricePerTon, 0) / openOrders.length)
              : 0}
          </p>
        </div>
        {user.userType === 'organization' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">My Active Listings</p>
            <p className="text-2xl text-gray-900">{myOrders.length}</p>
          </div>
        )}
      </div>

      {/* My Sell Orders (Organizations only) */}
      {user.userType === 'organization' && myOrders.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">My Sell Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Project</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Type</th>
                  <th className="px-6 py-3 text-right text-sm text-gray-700">Tons Available</th>
                  <th className="px-6 py-3 text-right text-sm text-gray-700">Price/Ton</th>
                  <th className="px-6 py-3 text-right text-sm text-gray-700">Total Value</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{order.projectName}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                        {order.projectType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                      {order.tons.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                      ₹{order.pricePerTon}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                      ₹{(order.tons * order.pricePerTon).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                        Open
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          onCancelOrder(order.id);
                          toast.success('Order cancelled');
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Buy Orders */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Available Listings</h3>
        </div>
        
        {otherOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Project</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Seller</th>
                  <th className="px-6 py-3 text-right text-sm text-gray-700">Tons Available</th>
                  <th className="px-6 py-3 text-right text-sm text-gray-700">Price/Ton</th>
                  <th className="px-6 py-3 text-right text-sm text-gray-700">Total Value</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {otherOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{order.projectName}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                        {order.projectType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{order.sellerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                      {order.tons.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                      ₹{order.pricePerTon}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                      ₹{(order.tons * order.pricePerTon).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setBuyQuantity(Math.min(10, order.tons));
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Listings Available</h3>
            <p className="text-gray-600">
              {user.userType === 'organization'
                ? 'No other organizations have listed credits for sale yet'
                : 'No credits are currently available in the marketplace'}
            </p>
          </div>
        )}
      </div>

      {/* Buy Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Buy Carbon Credits</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-900 mb-1">{selectedOrder.projectName}</p>
              <p className="text-sm text-gray-500">Seller: {selectedOrder.sellerName}</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Quantity (tons)</label>
              <input
                type="number"
                min="1"
                max={selectedOrder.tons}
                value={buyQuantity}
                onChange={(e) => setBuyQuantity(Math.max(1, Math.min(selectedOrder.tons, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum: {selectedOrder.tons} tons available
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per ton:</span>
                <span className="text-gray-900">₹{selectedOrder.pricePerTon}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900">{buyQuantity} tons</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total:</span>
                <span className="text-2xl text-gray-900">
                  ₹{(selectedOrder.pricePerTon * buyQuantity).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Credits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
