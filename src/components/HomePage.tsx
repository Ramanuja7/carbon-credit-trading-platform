import { ArrowRight, Leaf, TrendingUp, ShoppingBag, Award, DollarSign } from 'lucide-react';
import { User, PortfolioItem, Transaction, SellOrder, Page } from '../App';

interface HomePageProps {
  user: User;
  portfolio: PortfolioItem[];
  transactions: Transaction[];
  sellOrders: SellOrder[];
  onNavigate: (page: Page) => void;
}

export function HomePage({ user, portfolio, transactions, sellOrders, onNavigate }: HomePageProps) {
  const totalCredits = portfolio
    .filter(item => item.status === 'owned' || item.status === 'listed')
    .reduce((sum, item) => sum + item.tons, 0);
  
  const totalRetired = portfolio
    .filter(item => item.status === 'retired')
    .reduce((sum, item) => sum + item.tons, 0);
  
  const creditsListed = sellOrders
    .filter(order => order.status === 'open' && order.sellerId === user.email)
    .reduce((sum, order) => sum + order.tons, 0);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Welcome back, {user.name}</h1>
        <p className="text-lg text-gray-600">
          {user.userType === 'organization'
            ? 'Manage your carbon credits and trade in the marketplace'
            : 'Track your carbon offset journey and browse new projects'}
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg mt-3">
          <span className="text-sm text-gray-600">Account Type:</span>
          <span className="text-sm text-green-700 capitalize">{user.userType}</span>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">CO₂ Offset</p>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{totalRetired.toLocaleString()}</p>
          <p className="text-sm text-gray-500">tons retired</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Credits Owned</p>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{totalCredits.toLocaleString()}</p>
          <p className="text-sm text-gray-500">in portfolio</p>
        </div>

        {user.userType === 'organization' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Available for Sale</p>
            </div>
            <p className="text-3xl text-gray-900 mb-1">{creditsListed.toLocaleString()}</p>
            <p className="text-sm text-gray-500">tons listed</p>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">Total Transactions</p>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{transactions.length}</p>
          <p className="text-sm text-gray-500">all time</p>
        </div>
      </div>

      {/* Primary CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => onNavigate('projects')}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white hover:from-green-600 hover:to-green-700 transition-all text-left group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <ArrowRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </div>
          <h2 className="text-white mb-2">Buy Credits</h2>
          <p className="text-green-50">
            Browse verified carbon offset projects and purchase credits to offset your emissions
          </p>
        </button>

        {user.userType === 'organization' ? (
          <button
            onClick={() => onNavigate('sell')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white hover:from-blue-600 hover:to-blue-700 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <ArrowRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-white mb-2">Sell Credits</h2>
            <p className="text-blue-50">
              List your surplus carbon credits for sale in the marketplace
            </p>
          </button>
        ) : (
          <button
            onClick={() => onNavigate('marketplace')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white hover:from-blue-600 hover:to-blue-700 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <ArrowRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-white mb-2">Browse Marketplace</h2>
            <p className="text-blue-50">
              Discover credits available for purchase from other organizations
            </p>
          </button>
        )}
      </div>

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-gray-900">Recent Activity</h3>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-sm text-green-600 hover:text-green-700"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'buy'
                      ? 'bg-green-100'
                      : transaction.type === 'sell'
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}>
                    {transaction.type === 'buy' ? (
                      <ShoppingBag className="w-5 h-5 text-green-600" />
                    ) : transaction.type === 'sell' ? (
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Award className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1">
                      {transaction.type === 'buy' ? 'Purchased' : transaction.type === 'sell' ? 'Sold' : 'Retired'} {transaction.tons} tons
                    </p>
                    <p className="text-sm text-gray-500">{transaction.projectName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 mb-1">
                    ₹{transaction.totalValue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">No Activity Yet</h3>
          <p className="text-gray-600 mb-6">
            Start your climate action journey by purchasing carbon credits
          </p>
          <button
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Projects
          </button>
        </div>
      )}
    </div>
  );
}