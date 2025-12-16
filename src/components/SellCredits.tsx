import { useState } from 'react';
import { TrendingUp, Info, AlertCircle, Award, ShieldCheck, Package, DollarSign } from 'lucide-react';
import { PortfolioItem, SellOrder } from '../App';
import { projects } from '../data/projects';
import { toast } from 'sonner@2.0.3';

interface SellCreditsProps {
  portfolio: PortfolioItem[];
  onCreateSellOrder: (order: Omit<SellOrder, 'id' | 'sellerId' | 'sellerName' | 'status' | 'createdAt'>) => void;
}

export function SellCredits({ portfolio, onCreateSellOrder }: SellCreditsProps) {
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [pricePerTon, setPricePerTon] = useState(800);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const ownedCredits = portfolio.filter(item => item.status === 'owned');
  const listedCredits = portfolio.filter(item => item.status === 'listed');
  const selectedCredit = ownedCredits.find(item => item.projectId === selectedProjectId);
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  // Calculate totals
  const totalOwnedCredits = ownedCredits.reduce((sum, item) => sum + item.tons, 0);
  const totalListedCredits = listedCredits.reduce((sum, item) => sum + item.tons, 0);
  const totalAvailableAfterListing = totalOwnedCredits - (selectedCredit ? quantity : 0);
  const portfolioValue = ownedCredits.reduce((sum, item) => sum + (item.tons * item.pricePerTon), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCredit) {
      toast.error('Please select a project');
      return;
    }

    if (quantity > selectedCredit.tons) {
      toast.error('Quantity exceeds available credits');
      return;
    }

    onCreateSellOrder({
      projectId: selectedCredit.projectId,
      projectName: selectedCredit.projectName,
      projectType: selectedCredit.projectType,
      tons: quantity,
      pricePerTon,
      visibility
    });

    toast.success('Sell order created successfully');
    setSelectedProjectId('');
    setQuantity(10);
    setPricePerTon(800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Sell Carbon Credits</h1>
        <p className="text-lg text-gray-600">
          List your carbon credits for sale in the marketplace
        </p>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 opacity-80" />
            <p className="text-sm text-green-50">Available to Sell</p>
          </div>
          <p className="text-3xl text-white mb-1">{totalOwnedCredits.toLocaleString()}</p>
          <p className="text-sm text-green-50">tons CO₂</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 opacity-80" />
            <p className="text-sm text-blue-50">Currently Listed</p>
          </div>
          <p className="text-3xl text-white mb-1">{totalListedCredits.toLocaleString()}</p>
          <p className="text-sm text-blue-50">tons CO₂</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 opacity-80" />
            <p className="text-sm text-purple-50">Portfolio Value</p>
          </div>
          <p className="text-3xl text-white mb-1">₹{portfolioValue.toLocaleString()}</p>
          <p className="text-sm text-purple-50">at purchase price</p>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 opacity-80" />
            <p className="text-sm text-gray-300">After Listing</p>
          </div>
          <p className="text-3xl text-white mb-1">{totalAvailableAfterListing.toLocaleString()}</p>
          <p className="text-sm text-gray-300">tons remaining</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-900 mb-1">List your verified credits for sale</p>
            <p className="text-sm text-gray-600">
              All credits in your portfolio include certification details. Select credits to list, set your price, 
              and make them available to buyers in the marketplace.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Credits with Certifications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Credits Available to Sell</h3>
            
            {ownedCredits.length > 0 ? (
              <div className="space-y-4">
                {ownedCredits.map((credit) => {
                  const projectInfo = projects.find(p => p.id === credit.projectId);
                  return (
                    <div
                      key={credit.id}
                      className={`border rounded-lg p-4 hover:border-green-300 transition-all cursor-pointer ${
                        selectedProjectId === credit.projectId
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedProjectId(credit.projectId)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{credit.projectName}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                              {credit.projectType}
                            </span>
                            {projectInfo?.verified && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                <ShieldCheck className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl text-gray-900">{credit.tons.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">tons</p>
                        </div>
                      </div>

                      {/* Certification Details */}
                      {projectInfo?.certification && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <Award className="w-4 h-4 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-600 mb-1">Certification</p>
                              <p className="text-sm text-gray-900">{projectInfo.certification}</p>
                              <p className="text-xs text-gray-600 mt-1">{projectInfo.certificationBody}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Purchase Price</p>
                          <p className="text-gray-900">₹{credit.pricePerTon}/ton</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Value</p>
                          <p className="text-gray-900">₹{(credit.tons * credit.pricePerTon).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-1">No credits available to sell</p>
                <p className="text-sm text-gray-500">
                  Purchase credits first to list them for sale
                </p>
              </div>
            )}
          </div>

          {/* Create Sell Order Form */}
          {ownedCredits.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Create Sell Order</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2">Select Credit to Sell</label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Choose a credit...</option>
                    {ownedCredits.map((credit) => (
                      <option key={credit.id} value={credit.projectId}>
                        {credit.projectName} ({credit.tons} tons available)
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCredit && selectedProject && (
                  <>
                    {/* Certification Display */}
                    {selectedProject.certification && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-1">
                              Certification: <span className="text-blue-700">{selectedProject.certification}</span>
                            </p>
                            <p className="text-xs text-gray-600">{selectedProject.certificationBody}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-gray-700 mb-2">Quantity to Sell (tons)</label>
                      <input
                        type="number"
                        min="1"
                        max={selectedCredit.tons}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(selectedCredit.tons, parseInt(e.target.value) || 1)))}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Maximum: {selectedCredit.tons} tons available
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Selling Price per Ton (₹)</label>
                      <input
                        type="number"
                        min="1"
                        value={pricePerTon}
                        onChange={(e) => setPricePerTon(Math.max(1, parseInt(e.target.value) || 1))}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-gray-500">Your purchase price: ₹{selectedCredit.pricePerTon}/ton</span>
                        <span className={pricePerTon > selectedCredit.pricePerTon ? 'text-green-600' : 'text-red-600'}>
                          {pricePerTon > selectedCredit.pricePerTon ? '▲' : '▼'} 
                          {' '}₹{Math.abs(pricePerTon - selectedCredit.pricePerTon)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Listing Visibility</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={visibility === 'public'}
                            onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                          />
                          <div>
                            <p className="text-sm text-gray-900">Public</p>
                            <p className="text-xs text-gray-500">Visible to all marketplace users</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={visibility === 'private'}
                            onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                          />
                          <div>
                            <p className="text-sm text-gray-900">Private</p>
                            <p className="text-xs text-gray-500">Only visible to selected buyers</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={!selectedProjectId}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Post Sell Order
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Order Summary & Impact Dashboard */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Preview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-gray-900 mb-4">Order Preview</h3>
            
            {selectedCredit && selectedProject ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Project</p>
                  <p className="text-gray-900">{selectedCredit.projectName}</p>
                </div>

                {selectedProject.certification && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-gray-600" />
                      <p className="text-xs text-gray-600">Certification</p>
                    </div>
                    <p className="text-sm text-gray-900">{selectedProject.certification}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Quantity</p>
                  <p className="text-gray-900">{quantity} tons</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Selling Price</p>
                  <p className="text-gray-900">₹{pricePerTon}/ton</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Value</p>
                  <p className="text-2xl text-gray-900">
                    ₹{(quantity * pricePerTon).toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Potential Profit/Loss</p>
                  <p className={`${
                    pricePerTon > selectedCredit.pricePerTon ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ₹{((pricePerTon - selectedCredit.pricePerTon) * quantity).toLocaleString()}
                    {' '}
                    ({pricePerTon > selectedCredit.pricePerTon ? '+' : ''}
                    {(((pricePerTon - selectedCredit.pricePerTon) / selectedCredit.pricePerTon) * 100).toFixed(1)}%)
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-gray-700 mb-1">After Listing</p>
                  <p className="text-sm text-gray-900">
                    {(selectedCredit.tons - quantity).toLocaleString()} tons remaining in portfolio
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Select a credit to see order preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
