import { ShoppingCart, TrendingDown, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  project: string;
  credits: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending';
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    project: 'Wind Farm - Gujarat',
    credits: 500,
    price: 8.25,
    total: 4125,
    date: '2024-06-15',
    status: 'completed'
  },
  {
    id: '2',
    type: 'buy',
    project: 'Amazon Rainforest Conservation',
    credits: 250,
    price: 11.80,
    total: 2950,
    date: '2024-06-10',
    status: 'completed'
  },
  {
    id: '3',
    type: 'buy',
    project: 'Mangrove Restoration Project',
    credits: 150,
    price: 14.20,
    total: 2130,
    date: '2024-06-05',
    status: 'completed'
  },
  {
    id: '4',
    type: 'sell',
    project: 'Solar Power Initiative',
    credits: 200,
    price: 9.50,
    total: 1900,
    date: '2024-05-28',
    status: 'completed'
  },
  {
    id: '5',
    type: 'buy',
    project: 'Cookstove Distribution',
    credits: 300,
    price: 6.25,
    total: 1875,
    date: '2024-05-20',
    status: 'completed'
  },
  {
    id: '6',
    type: 'sell',
    project: 'Geothermal Energy Plant',
    credits: 150,
    price: 10.80,
    total: 1620,
    date: '2024-05-15',
    status: 'completed'
  },
  {
    id: '7',
    type: 'buy',
    project: 'Wind Farm - Gujarat',
    credits: 400,
    price: 8.10,
    total: 3240,
    date: '2024-05-10',
    status: 'completed'
  },
  {
    id: '8',
    type: 'buy',
    project: 'Amazon Rainforest Conservation',
    credits: 100,
    price: 11.50,
    total: 1150,
    date: '2024-05-05',
    status: 'completed'
  }
];

export function TransactionsPage() {
  const totalBought = transactions
    .filter(t => t.type === 'buy')
    .reduce((sum, t) => sum + t.total, 0);
  
  const totalSold = transactions
    .filter(t => t.type === 'sell')
    .reduce((sum, t) => sum + t.total, 0);
  
  const creditsBought = transactions
    .filter(t => t.type === 'buy')
    .reduce((sum, t) => sum + t.credits, 0);
  
  const creditsSold = transactions
    .filter(t => t.type === 'sell')
    .reduce((sum, t) => sum + t.credits, 0);

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Total Purchased</span>
          </div>
          <p className="text-gray-900">
            ${totalBought.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <p className="text-sm text-gray-500 mt-2">{creditsBought.toLocaleString()} credits</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingDown className="w-4 h-4" />
            <span>Total Sold</span>
          </div>
          <p className="text-gray-900">
            ${totalSold.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <p className="text-sm text-gray-500 mt-2">{creditsSold.toLocaleString()} credits</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>Total Transactions</span>
          </div>
          <p className="text-gray-900">{transactions.length}</p>
          <p className="text-sm text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <span>Net Position</span>
          </div>
          <p className="text-gray-900">
            ${(totalSold - totalBought).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {creditsBought - creditsSold} credits held
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-gray-700">Project</th>
                <th className="px-6 py-3 text-right text-gray-700">Credits</th>
                <th className="px-6 py-3 text-right text-gray-700">Price</th>
                <th className="px-6 py-3 text-right text-gray-700">Total</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {transaction.type === 'buy' ? (
                        <>
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <ArrowDownRight className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-green-600">Buy</span>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-blue-600">Sell</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {transaction.project}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    {transaction.credits.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    ${transaction.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    ${transaction.total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      transaction.status === 'completed'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Recent Purchases</h3>
          <div className="space-y-3">
            {transactions
              .filter(t => t.type === 'buy')
              .slice(0, 3)
              .map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-gray-900">{transaction.project}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">{transaction.credits} credits</p>
                    <p className="text-sm text-gray-500">${transaction.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-3">
            {transactions
              .filter(t => t.type === 'sell')
              .slice(0, 3)
              .map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-gray-900">{transaction.project}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">{transaction.credits} credits</p>
                    <p className="text-sm text-gray-500">${transaction.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
