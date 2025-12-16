import { useState } from 'react';
import { ArrowLeft, MapPin, BadgeCheck, TrendingUp, Info } from 'lucide-react';
import { Project } from '../App';
import { projectImages } from '../utils/images';

interface ProjectDetailProps {
  project: Project;
  onBuyCredits: (project: Project, tons: number, totalCost: number, retire: boolean) => void;
  onBack: () => void;
}

export function ProjectDetail({ project, onBuyCredits, onBack }: ProjectDetailProps) {
  const [tons, setTons] = useState(10);
  const totalCost = tons * project.pricePerTon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Projects
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative h-96">
              <img
                src={projectImages[project.image]}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              {project.verified && (
                <div className="absolute top-6 right-6 bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
                  <BadgeCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-900">Verified Project</span>
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-gray-900 mb-2">{project.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-5 h-5" />
                    <span>{project.country}</span>
                  </div>
                  <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full">
                    {project.type}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-gray-900 mb-3">About This Project</h2>
                <p className="text-gray-600 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Price per Ton</p>
                  <p className="text-2xl text-gray-900">₹{project.pricePerTon}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Available Credits</p>
                  <p className="text-2xl text-gray-900">{project.availableCredits.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Region</p>
                  <p className="text-2xl text-gray-900">{project.region}</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">Environmental Impact</h3>
                    <p className="text-gray-600">
                      This project is expected to avoid <span className="text-green-700">{project.impactPerYear.toLocaleString()} tons of CO₂</span> emissions 
                      per year, contributing to climate change mitigation and supporting sustainable development.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-gray-900 mb-3">Verification Information</h3>
                <div className="flex items-start gap-3 text-gray-600">
                  <BadgeCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-2">
                      This project has been independently verified and meets international carbon offset standards. 
                      All credits are registered and tracked to ensure transparency and prevent double-counting.
                    </p>
                    {project.certification && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                        <p className="text-sm text-gray-900 mb-1">
                          <span className="text-gray-600">Certification ID:</span> {project.certification}
                        </p>
                        <p className="text-sm text-gray-600">
                          Verified by: {project.certificationBody}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Buy Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-gray-900 mb-6">Buy Carbon Credits</h3>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Tons of CO₂ to offset
              </label>
              <input
                type="number"
                min="1"
                max={project.availableCredits}
                value={tons}
                onChange={(e) => setTons(Math.max(1, Math.min(project.availableCredits, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Maximum: {project.availableCredits.toLocaleString()} tons available
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per ton:</span>
                <span className="text-gray-900">₹{project.pricePerTon}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900">{tons} tons</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-900">Total Cost:</span>
                <span className="text-2xl text-gray-900">₹{totalCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => onBuyCredits(project, tons, totalCost, false)}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Buy Credits
              </button>
              <button
                onClick={() => onBuyCredits(project, tons, totalCost, true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buy & Retire Now
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">About Retiring Credits</p>
                  <p className="text-sm text-gray-600">
                    Retiring credits means they are permanently removed from circulation and cannot be resold. 
                    This directly offsets your carbon emissions and represents your climate action commitment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}