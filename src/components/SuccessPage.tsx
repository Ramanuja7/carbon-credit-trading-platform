import { CheckCircle, ArrowRight, Leaf } from 'lucide-react';
import { TradeData } from '../App';

interface SuccessPageProps {
  tradeData: TradeData;
  onGoToPortfolio: () => void;
  onGoToMarketplace: () => void;
}

export function SuccessPage({ tradeData, onGoToPortfolio, onGoToMarketplace }: SuccessPageProps) {
  const { type, project, sellOrder, tons, pricePerTon, totalCost, retire } = tradeData;
  
  const projectName = project?.name || sellOrder?.projectName || '';
  const projectType = project?.type || sellOrder?.projectType || '';
  const projectCountry = project?.country || '';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-gray-900 mb-3">
          {type === 'buy'
            ? retire
              ? 'Credits Retired Successfully!'
              : 'Purchase Complete!'
            : 'Sale Confirmed!'}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {type === 'buy'
            ? retire
              ? 'Your carbon credits have been purchased and retired. Thank you for taking climate action!'
              : sellOrder
              ? 'Your carbon credits have been purchased from the marketplace and added to your portfolio.'
              : 'Your carbon credits have been added to your portfolio.'
            : 'Your credits have been successfully sold.'}
        </p>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="text-gray-900 mb-4">
            {type === 'buy' ? 'Purchase' : 'Sale'} Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Project:</span>
              <span className="text-gray-900">{projectName}</span>
            </div>
            {projectCountry && (
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-900">{projectCountry}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="text-gray-900">{projectType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Credits:</span>
              <span className="text-gray-900">{tons} tons CO₂</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price per ton:</span>
              <span className="text-gray-900">₹{pricePerTon}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="text-gray-900">
                Total {type === 'buy' ? 'Paid' : 'Received'}:
              </span>
              <span className="text-xl text-gray-900">₹{totalCost.toLocaleString()}</span>
            </div>
            {type === 'buy' && (
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={retire ? 'text-green-600' : 'text-blue-600'}>
                  {retire ? 'Retired' : 'Owned'}
                </span>
              </div>
            )}
            {sellOrder && (
              <div className="flex justify-between">
                <span className="text-gray-600">Purchased from:</span>
                <span className="text-gray-900">{sellOrder.sellerName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Environmental Impact (for buy transactions) */}
        {type === 'buy' && (
          <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-lg p-6 text-white mb-8 text-left">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Environmental Impact</h3>
                <p className="text-green-50 text-sm mb-4">
                  Your contribution of {tons} tons CO₂ offset is equivalent to:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <p className="text-xl text-white mb-1">
                      {(tons * 2500).toLocaleString()}
                    </p>
                    <p className="text-xs text-green-50">Miles not driven</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <p className="text-xl text-white mb-1">
                      {(tons * 0.12).toFixed(1)}
                    </p>
                    <p className="text-xs text-green-50">Homes for 1 year</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <p className="text-xl text-white mb-1">
                      {(tons * 42).toLocaleString()}
                    </p>
                    <p className="text-xs text-green-50">Tree seedlings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onGoToPortfolio}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Portfolio
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onGoToMarketplace}
            className="flex-1 px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {type === 'buy' ? 'Back to Marketplace' : 'View Marketplace'}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          A confirmation has been recorded in your transaction history.
        </p>
      </div>
    </div>
  );
}
