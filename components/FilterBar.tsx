
import React from 'react';
import { FilterState } from '../types';
import { SearchIcon } from './icons';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  priceRange: { min: number; max: number };
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, priceRange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name === 'minPrice' || name === 'maxPrice' ? parseInt(value) : value }));
  };
  
  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-2xl mb-8 space-y-4">
      <div className="relative">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search by city, address, or title..."
          value={filters.searchTerm}
          onChange={handleInputChange}
          className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-6 h-6"/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type Filter */}
        <select
          name="type"
          value={filters.type}
          onChange={handleInputChange}
          className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none"
        >
          <option value="all">For Sale or Rent</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        
        {/* Bedrooms Filter */}
        <select
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleInputChange}
          className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none"
        >
          <option value="any">Any Bedrooms</option>
          <option value="1">1+ Bedrooms</option>
          <option value="2">2+ Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>
        
        {/* Price Range Filters */}
        <div className="md:col-span-2 lg:col-span-2 space-y-2">
            <label className="text-sm text-gray-400">Price Range: ${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}</label>
            <div className="flex items-center space-x-2">
                 <input
                    type="range"
                    name="minPrice"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.minPrice}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                 <input
                    type="range"
                    name="maxPrice"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
