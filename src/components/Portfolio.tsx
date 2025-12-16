import { Leaf, TrendingUp, Award, ShoppingBag, DollarSign } from 'lucide-react';
import { User, PortfolioItem, Transaction, Page } from '../App';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface PortfolioProps {
  user: User;
  portfolio: PortfolioItem[];
  transactions: Transaction[];
  onNavigate: (page: Page) => void;
}

export function Portfolio({ user, portfolio, transactions, onNavigate }: PortfolioProps) {
  const ownedCredits = portfolio.filter(item => item.status === 'owned' || item.status === 'listed');
  const retiredCredits = portfolio.filter(item => item.status === 'retired');
  const listedCredits = portfolio.filter(item => item.status === 'listed');

  const totalOwned = ownedCredits.reduce((sum, item) => sum + item.tons, 0);
  const totalRetired = retiredCredits.reduce((sum, item) => sum + item.tons, 0);
  const totalListed = listedCredits.reduce((sum, item) => sum + item.tons, 0);
  const totalSpent = transactions
    .filter(t => t.type === 'buy')
    .reduce((sum, t) => sum + t.totalValue, 0);

  // Chart data
  const statusData = [
    { name: 'Retired', value: totalRetired, color: '#10b981' },
    { name: 'Owned', value: totalOwned - totalListed, color: '#3b82f6' },
    { name: 'Listed', value: totalListed, color: '#f59e0b' }
  ].filter(d => d.value > 0);

  const monthlyData = transactions.reduce((acc: any[], item) => {
    const date = new Date(item.date);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(d => d.month === month);
    if (existing) {
      if (item.type === 'buy') existing.bought += item.tons;
      if (item.type === 'sell') existing.sold += item.tons;
    } else {
      acc.push({
        month,
        bought: item.type === 'buy' ? item.tons : 0,
        sold: item.type === 'sell' ? item.tons : 0
      });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Portfolio</h1>
          <p className="text-lg text-gray-600">Track your carbon credits and trading activity</p>
        </div>
        <button
          onClick={() => onNavigate('projects')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Buy More Credits
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Total Credits Owned</p>
          </div>
          <p className="text-3xl text-gray-900">{totalOwned.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">tons CO₂</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Credits Retired</p>
          </div>
          <p className="text-3xl text-gray-900">{totalRetired.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">tons CO₂ offset</p>
        </div>

        {user.userType === 'organization' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-sm text-gray-600">Listed for Sale</p>
            </div>
            <p className="text-3xl text-gray-900">{totalListed.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">tons</p>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">Total Invested</p>
          </div>
          <p className="text-3xl text-gray-900">₹{totalSpent.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">All purchases</p>
        </div>
      </div>

      {portfolio.length > 0 ? (
        <>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {monthlyData.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Trading Activity</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="bought" fill="#10b981" name="Bought" radius={[8, 8, 0, 0]} />
                    {user.userType === 'organization' && (
                      <Bar dataKey="sold" fill="#3b82f6" name="Sold" radius={[8, 8, 0, 0]} />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {statusData.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Portfolio Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Environmental Impact */}
          {totalRetired > 0 && (
            <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-lg p-8 text-white mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-3">Your Environmental Impact</h3>
                  <p className="text-green-50 mb-6">
                    By offsetting {totalRetired} tons of CO₂, you've made a positive impact equivalent to:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <p className="text-3xl text-white mb-1">
                        {(totalRetired * 2500).toLocaleString()}
                      </p>
                      <p className="text-sm text-green-50">Miles not driven by car</p>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <p className="text-3xl text-white mb-1">
                        {(totalRetired * 0.12).toFixed(1)}
                      </p>
                      <p className="text-sm text-green-50">Homes powered for 1 year</p>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <p className="text-3xl text-white mb-1">
                        {(totalRetired * 42).toLocaleString()}
                      </p>
                      <p className="text-sm text-green-50">Tree seedlings grown for 10 years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Holdings */}
          {ownedCredits.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 mb-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900">Holdings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm text-gray-700">Project</th>
                      <th className="px-6 py-3 text-left text-sm text-gray-700">Type</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-700">Tons</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-700">Avg Price</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-700">Value</th>
                      <th className="px-6 py-3 text-left text-sm text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ownedCredits.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.projectName}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                            {item.projectType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          {item.tons.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          ₹{item.pricePerTon}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          ₹{(item.tons * item.pricePerTon).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                            item.status === 'listed'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {item.status === 'listed' ? 'Listed' : 'Owned'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transaction History */}
          {transactions.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900">Transaction History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm text-gray-700">Type</th>
                      <th className="px-6 py-3 text-left text-sm text-gray-700">Project</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-700">Tons</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-700">Price/Ton</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-700">Total</th>
                      {user.userType === 'organization' && (
                        <th className="px-6 py-3 text-left text-sm text-gray-700">Counterparty</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                            transaction.type === 'buy'
                              ? 'bg-green-50 text-green-700'
                              : transaction.type === 'sell'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-gray-50 text-gray-700'
                          }`}>
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{transaction.projectName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          {transaction.tons.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          ₹{transaction.pricePerTon}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          ₹{transaction.totalValue.toLocaleString()}
                        </td>
                        {user.userType === 'organization' && (
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {transaction.counterparty || '-'}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">No Credits Yet</h3>
          <p className="text-gray-600 mb-6">
            Start your climate action journey by purchasing carbon credits from verified projects.
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
