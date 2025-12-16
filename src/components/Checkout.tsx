import { ArrowLeft, CreditCard, Building2, Smartphone } from 'lucide-react';
import { TradeData } from '../App';
import { projectImages } from '../utils/images';

interface CheckoutProps {
  tradeData: TradeData;
  onConfirm: () => void;
  onBack: () => void;
}

export function Checkout({ tradeData, onConfirm, onBack }: CheckoutProps) {
  const { type, project, sellOrder, tons, pricePerTon, totalCost, retire } = tradeData;
  
  const projectName = project?.name || sellOrder?.projectName || '';
  const projectType = project?.type || sellOrder?.projectType || '';
  const projectCountry = project?.country || '';
  const projectImage = project?.image;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-gray-900 mb-8">
        {type === 'buy' ? 'Checkout' : 'Confirm Sale'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-gray-900 mb-6">Payment Method</h2>
            
            <p className="text-sm text-gray-600 mb-6">
              This is a simulation platform. No actual payment will be processed.
            </p>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-4 border-2 border-green-500 rounded-lg cursor-pointer bg-green-50">
                <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-green-600" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-gray-900">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                <input type="radio" name="payment" className="w-4 h-4 text-green-600" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-gray-900">Net Banking</p>
                    <p className="text-sm text-gray-500">All major banks</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                <input type="radio" name="payment" className="w-4 h-4 text-green-600" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-gray-900">UPI</p>
                    <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="text-gray-900">Note:</span> This is a simulation environment. 
                In a production system, secure payment processing would be handled by verified payment gateways 
                with encryption and compliance with financial regulations.
              </p>
            </div>
          </div>

          <button
            onClick={onConfirm}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Confirm {type === 'buy' ? 'Purchase' : 'Sale'}
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-gray-900 mb-6">Order Summary</h3>

            <div className="mb-6">
              {projectImage && (
                <div className="flex gap-3 mb-4">
                  <img
                    src={projectImages[projectImage]}
                    alt={projectName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">{projectName}</p>
                    {projectCountry && (
                      <p className="text-sm text-gray-600">{projectCountry}</p>
                    )}
                  </div>
                </div>
              )}

              {!projectImage && (
                <div className="mb-4">
                  <p className="text-gray-900 mb-1">{projectName}</p>
                  {sellOrder && (
                    <p className="text-sm text-gray-600">Seller: {sellOrder.sellerName}</p>
                  )}
                </div>
              )}

              <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                {projectType}
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-b border-gray-200 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per ton:</span>
                <span className="text-gray-900">₹{pricePerTon}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900">{tons} tons CO₂</span>
              </div>
              {retire && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Action:</span>
                  <span className="text-blue-600">Retire immediately</span>
                </div>
              )}
              {sellOrder && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Source:</span>
                  <span className="text-gray-900">Marketplace</span>
                </div>
              )}
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-gray-900">Total Amount:</span>
              <span className="text-2xl text-gray-900">₹{totalCost.toLocaleString()}</span>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 mb-2">Environmental Impact</p>
              <p className="text-sm text-gray-600">
                You are offsetting <span className="text-green-700">{tons} tons of CO₂</span> emissions, 
                equivalent to:
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• {(tons * 2500).toLocaleString()} miles driven</li>
                <li>• {(tons * 0.12).toFixed(1)} homes powered for 1 year</li>
                <li>• {(tons * 42).toLocaleString()} tree seedlings grown</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
