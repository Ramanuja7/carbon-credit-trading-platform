import { Leaf, Shield, TrendingUp, Users, Globe, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
          <Leaf className="w-4 h-4" />
          <span className="text-sm">About CarbonX Sim</span>
        </div>
        <h1 className="text-gray-900 mb-4">Making Climate Action Accessible</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A simulation platform demonstrating how carbon credit trading can enable individuals and 
          organizations to offset their emissions and support verified climate projects worldwide.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gray-900 mb-4 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 text-center">
            CarbonX Sim is an educational simulation that demonstrates how carbon credit marketplaces 
            work. We aim to make the process of carbon offsetting transparent, accessible, and 
            impactful by connecting people with verified climate projects around the world.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-900 mb-3">Verified Projects</h3>
          <p className="text-gray-600">
            All projects in our simulation are based on real verification standards like VCS, 
            Gold Standard, and others that ensure genuine environmental impact.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-900 mb-3">Transparent Pricing</h3>
          <p className="text-gray-600">
            See exactly where your money goes. Each credit has a clear price and the environmental 
            impact is calculated and displayed.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-900 mb-3">Global Impact</h3>
          <p className="text-gray-600">
            Support projects across multiple continents, from reforestation in Asia to renewable 
            energy in Africa and ocean conservation worldwide.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
        <h2 className="text-gray-900 mb-8 text-center">How Carbon Credits Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-gray-900 mb-2">Projects Reduce Emissions</h3>
            <p className="text-sm text-gray-600">
              Climate projects reduce, avoid, or remove greenhouse gas emissions
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-gray-900 mb-2">Credits Are Generated</h3>
            <p className="text-sm text-gray-600">
              Each credit represents one ton of CO₂ equivalent reduced or removed
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-gray-900 mb-2">You Purchase Credits</h3>
            <p className="text-sm text-gray-600">
              Buy credits to support projects and offset your own emissions
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              4
            </div>
            <h3 className="text-gray-900 mb-2">Credits Are Retired</h3>
            <p className="text-sm text-gray-600">
              Retired credits permanently offset your carbon footprint
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="text-gray-900 mb-3">Important Notice</h3>
        <p className="text-gray-700">
          CarbonX Sim is a <span className="text-gray-900">simulation platform for educational purposes</span>. 
          No real carbon credits are traded, no actual financial transactions occur, and no real carbon 
          offsets are generated through this platform. This simulation is designed to demonstrate how 
          carbon credit marketplaces function and to educate users about climate action opportunities.
        </p>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-white mb-4">Ready to Learn More?</h2>
        <p className="text-green-50 mb-6 max-w-2xl mx-auto">
          Explore our project catalog to see how carbon offset programs work and understand 
          the impact of climate action initiatives worldwide.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>24+ Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>12 Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>Educational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
