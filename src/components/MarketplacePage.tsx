import { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Calendar, Award } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CarbonListing {
  id: string;
  project: string;
  type: string;
  location: string;
  price: number;
  available: number;
  vintage: string;
  certification: string;
  trend: 'up' | 'down';
  trendPercent: number;
}

const listings: CarbonListing[] = [
  {
    id: '1',
    project: 'Amazon Rainforest Conservation',
    type: 'Forestry & Land Use',
    location: 'Brazil',
    price: 12.50,
    available: 5000,
    vintage: '2024',
    certification: 'Verified Carbon Standard',
    trend: 'up',
    trendPercent: 5.2
  },
  {
    id: '2',
    project: 'Wind Farm - Gujarat',
    type: 'Renewable Energy',
    location: 'India',
    price: 8.75,
    available: 10000,
    vintage: '2024',
    certification: 'Gold Standard',
    trend: 'up',
    trendPercent: 2.8
  },
  {
    id: '3',
    project: 'Solar Power Initiative',
    type: 'Renewable Energy',
    location: 'Kenya',
    price: 9.25,
    available: 7500,
    vintage: '2023',
    certification: 'Verified Carbon Standard',
    trend: 'down',
    trendPercent: 1.5
  },
  {
    id: '4',
    project: 'Mangrove Restoration Project',
    type: 'Blue Carbon',
    location: 'Indonesia',
    price: 15.00,
    available: 3000,
    vintage: '2024',
    certification: 'Plan Vivo',
    trend: 'up',
    trendPercent: 7.3
  },
  {
    id: '5',
    project: 'Cookstove Distribution',
    type: 'Energy Efficiency',
    location: 'Uganda',
    price: 6.50,
    available: 12000,
    vintage: '2023',
    certification: 'Gold Standard',
    trend: 'up',
    trendPercent: 3.1
  },
  {
    id: '6',
    project: 'Geothermal Energy Plant',
    type: 'Renewable Energy',
    location: 'Iceland',
    price: 11.00,
    available: 4500,
    vintage: '2024',
    certification: 'ISO 14064',
    trend: 'down',
    trendPercent: 0.8
  }
];

interface MarketplacePageProps {
  balance: number;
  setBalance: (balance: number) => void;
}

export function MarketplacePage({ balance, setBalance }: MarketplacePageProps) {
  const [selectedListing, setSelectedListing] = useState<CarbonListing | null>(null);
  const [quantity, setQuantity] = useState(100);

  const handleBuy = (listing: CarbonListing) => {
    const totalCost = listing.price * quantity;
    
    if (totalCost > balance) {
      toast.error('Insufficient balance');
      return;
    }
    
    if (quantity > listing.available) {
      toast.error('Quantity exceeds available credits');
      return;
    }
    
    setBalance(balance - totalCost);
    toast.success(`Successfully purchased ${quantity} carbon credits from ${listing.project}`);
    setSelectedListing(null);
    setQuantity(100);
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Market Volume (24h)</p>
          <p className="text-gray-900 mt-1">$2.4M</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>12.5%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Avg. Price</p>
          <p className="text-gray-900 mt-1">$10.25/credit</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>3.2%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Active Listings</p>
          <p className="text-gray-900 mt-1">156</p>
          <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
            <span>+8 today</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Total Credits Available</p>
          <p className="text-gray-900 mt-1">42,000</p>
          <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
            <span>Multiple projects</span>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{listing.project}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location}</span>
                </div>
                <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  {listing.type}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-900 mb-1">${listing.price}</div>
                <div className={`flex items-center gap-1 text-sm ${
                  listing.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {listing.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{listing.trendPercent}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-100">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Vintage</span>
                </div>
                <p className="text-gray-900">{listing.vintage}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Award className="w-4 h-4" />
                  <span>Certification</span>
                </div>
                <p className="text-gray-900 text-sm">{listing.certification}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-gray-900">{listing.available.toLocaleString()} credits</p>
              </div>
              <button
                onClick={() => {
                  setSelectedListing(listing);
                  setQuantity(100);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Buy Credits
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-4">Purchase Carbon Credits</h2>
            
            <div className="mb-6">
              <p className="text-gray-900 mb-2">{selectedListing.project}</p>
              <p className="text-sm text-gray-500">
                {selectedListing.location} • {selectedListing.type}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Quantity (credits)
              </label>
              <input
                type="number"
                min="1"
                max={selectedListing.available}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Max: {selectedListing.available.toLocaleString()} credits
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per credit:</span>
                <span className="text-gray-900">${selectedListing.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900">{quantity}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">
                  ${(selectedListing.price * quantity).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedListing(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBuy(selectedListing)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
