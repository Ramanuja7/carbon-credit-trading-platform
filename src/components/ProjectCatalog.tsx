import { useState } from 'react';
import { Search, MapPin, BadgeCheck, Filter } from 'lucide-react';
import { Project } from '../App';
import { projects } from '../data/projects';
import { projectImages } from '../utils/images';

interface ProjectCatalogProps {
  onProjectSelect: (project: Project) => void;
}

export function ProjectCatalog({ onProjectSelect }: ProjectCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const projectTypes = ['all', 'Reforestation', 'Renewable Energy', 'Energy Efficiency', 'Ocean Conservation'];
  const regions = ['all', 'Asia', 'Africa', 'Europe', 'South America'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || project.type === selectedType;
    const matchesRegion = selectedRegion === 'all' || project.region === selectedRegion;
    
    let matchesPrice = true;
    if (priceRange === 'low') {
      matchesPrice = project.pricePerTon < 700;
    } else if (priceRange === 'medium') {
      matchesPrice = project.pricePerTon >= 700 && project.pricePerTon < 900;
    } else if (priceRange === 'high') {
      matchesPrice = project.pricePerTon >= 900;
    }
    
    return matchesSearch && matchesType && matchesRegion && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Carbon Offset Projects</h1>
        <p className="text-lg text-gray-600">
          Browse verified projects and purchase carbon credits to offset your emissions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by name, country, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Project Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {projectTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="low">Under ₹700/ton</option>
              <option value="medium">₹700 - ₹900/ton</option>
              <option value="high">Above ₹900/ton</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </p>
          {(searchQuery || selectedType !== 'all' || selectedRegion !== 'all' || priceRange !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedRegion('all');
                setPriceRange('all');
              }}
              className="text-sm text-green-600 hover:text-green-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onProjectSelect(project)}
          >
            <div className="relative h-48">
              <img
                src={projectImages[project.image]}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              {project.verified && (
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-900">Verified</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{project.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{project.country}</span>
                  </div>
                </div>
              </div>

              <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm mb-3">
                {project.type}
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Price per ton</p>
                  <p className="text-gray-900">₹{project.pricePerTon}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="text-gray-900">{project.availableCredits.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedRegion('all');
              setPriceRange('all');
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
