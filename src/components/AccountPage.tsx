import { User as UserIcon, Mail, LogOut, Building2, UserCircle } from 'lucide-react';
import { User } from '../App';

interface AccountPageProps {
  user: User;
  onLogout: () => void;
}

export function AccountPage({ user, onLogout }: AccountPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Account Settings</h1>
        <p className="text-lg text-gray-600">Manage your profile and account preferences</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-3xl">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-3">{user.email}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              {user.userType === 'organization' ? (
                <Building2 className="w-4 h-4 text-green-600" />
              ) : (
                <UserCircle className="w-4 h-4 text-green-600" />
              )}
              <span className="text-sm text-green-700 capitalize">{user.userType} Account</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Account Type</label>
            <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 capitalize">
              {user.userType}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Account type cannot be changed after registration
            </p>
          </div>
        </div>
      </div>

      {/* Account Features */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <h3 className="text-gray-900 mb-6">Account Features</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <div className="flex-1">
              <p className="text-gray-900 mb-1">Browse and purchase carbon credits</p>
              <p className="text-sm text-gray-600">
                Access our marketplace of verified carbon offset projects
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <div className="flex-1">
              <p className="text-gray-900 mb-1">Portfolio management</p>
              <p className="text-sm text-gray-600">
                Track your carbon credits and environmental impact
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <div className="flex-1">
              <p className="text-gray-900 mb-1">Retire credits to offset emissions</p>
              <p className="text-sm text-gray-600">
                Permanently offset your carbon footprint
              </p>
            </div>
          </div>

          {user.userType === 'organization' && (
            <>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">Sell carbon credits</p>
                  <p className="text-sm text-gray-600">
                    List surplus credits for sale in the marketplace
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">Trade in the marketplace</p>
                  <p className="text-sm text-gray-600">
                    Buy and sell credits with other organizations
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Simulation Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-gray-900 mb-3">Simulation Platform Notice</h3>
        <p className="text-gray-700 mb-2">
          This is a simulation environment for educational purposes. No real financial transactions occur, 
          and no actual carbon credits are traded through this platform.
        </p>
        <p className="text-sm text-gray-600">
          The platform demonstrates how carbon credit marketplaces function and provides educational 
          insights into climate action and carbon offsetting.
        </p>
      </div>

      {/* Sign Out */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2">Sign Out</h3>
            <p className="text-gray-600">
              Sign out of your account. You can sign back in anytime with your credentials.
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-4"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
