import { Leaf, TrendingUp, BarChart3 } from 'lucide-react';
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
  Cell,
  Legend
} from 'recharts';

interface PortfolioItem {
  id: string;
  project: string;
  type: string;
  credits: number;
  avgPrice: number;
  currentPrice: number;
  gain: number;
  gainPercent: number;
}

const portfolio: PortfolioItem[] = [
  {
    id: '1',
    project: 'Amazon Rainforest Conservation',
    type: 'Forestry & Land Use',
    credits: 250,
    avgPrice: 11.80,
    currentPrice: 12.50,
    gain: 175,
    gainPercent: 5.9
  },
  {
    id: '2',
    project: 'Wind Farm - Gujarat',
    type: 'Renewable Energy',
    credits: 500,
    avgPrice: 8.25,
    currentPrice: 8.75,
    gain: 250,
    gainPercent: 6.1
  },
  {
    id: '3',
    project: 'Mangrove Restoration Project',
    type: 'Blue Carbon',
    credits: 150,
    avgPrice: 14.20,
    currentPrice: 15.00,
    gain: 120,
    gainPercent: 5.6
  }
];

const impactData = [
  { month: 'Jan', credits: 150 },
  { month: 'Feb', credits: 280 },
  { month: 'Mar', credits: 420 },
  { month: 'Apr', credits: 600 },
  { month: 'May', credits: 750 },
  { month: 'Jun', credits: 900 }
];

const typeDistribution = [
  { name: 'Renewable Energy', value: 500, color: '#10b981' },
  { name: 'Forestry & Land Use', value: 250, color: '#22c55e' },
  { name: 'Blue Carbon', value: 150, color: '#14b8a6' }
];

export function PortfolioPage() {
  const totalCredits = portfolio.reduce((sum, item) => sum + item.credits, 0);
  const totalValue = portfolio.reduce((sum, item) => sum + (item.credits * item.currentPrice), 0);
  const totalGain = portfolio.reduce((sum, item) => sum + item.gain, 0);
  const avgGainPercent = totalGain / portfolio.reduce((sum, item) => sum + (item.credits * item.avgPrice), 0) * 100;

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Total Credits</p>
          <p className="text-gray-900 mt-1">{totalCredits.toLocaleString()}</p>
          <p className="text-green-600 text-sm mt-2">Active</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Portfolio Value</p>
          <p className="text-gray-900 mt-1">
            ${totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>{avgGainPercent.toFixed(1)}%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Total Gain</p>
          <p className="text-gray-900 mt-1">
            ${totalGain.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <p className="text-gray-500 text-sm mt-2">All positions</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Carbon Offset</p>
          <p className="text-gray-900 mt-1">{totalCredits} tCO₂e</p>
          <p className="text-gray-500 text-sm mt-2">Lifetime impact</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Credit Accumulation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={impactData}>
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
              <Bar dataKey="credits" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Portfolio Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeDistribution.map((entry, index) => (
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
      </div>

      {/* Holdings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Holdings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Project</th>
                <th className="px-6 py-3 text-left text-gray-700">Type</th>
                <th className="px-6 py-3 text-right text-gray-700">Credits</th>
                <th className="px-6 py-3 text-right text-gray-700">Avg Price</th>
                <th className="px-6 py-3 text-right text-gray-700">Current Price</th>
                <th className="px-6 py-3 text-right text-gray-700">Total Value</th>
                <th className="px-6 py-3 text-right text-gray-700">Gain/Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {portfolio.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-900">{item.project}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    {item.credits.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    ${item.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    ${item.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    ${(item.credits * item.currentPrice).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">
                        ${item.gain.toFixed(2)} ({item.gainPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-2">Environmental Impact</h3>
            <p className="text-green-50 mb-4">
              Your portfolio of {totalCredits} carbon credits represents {totalCredits} tonnes of CO₂ equivalent offset.
              This is equivalent to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-2xl text-white mb-1">
                  {Math.round(totalCredits * 2.5).toLocaleString()}
                </p>
                <p className="text-sm text-green-50">Miles driven by car</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-2xl text-white mb-1">
                  {Math.round(totalCredits * 0.12).toLocaleString()}
                </p>
                <p className="text-sm text-green-50">Homes powered for 1 year</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-2xl text-white mb-1">
                  {Math.round(totalCredits * 42).toLocaleString()}
                </p>
                <p className="text-sm text-green-50">Tree seedlings grown</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
