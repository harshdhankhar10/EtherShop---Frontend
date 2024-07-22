import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import axios from 'axios';
import { FiSearch, FiSliders, FiStar, FiGrid, FiList } from 'react-icons/fi';

const ProductsHome = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: [0, 1000],
    inStock: false,
    isFeatured: false,
    rating: 0,
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/all`)
      .then((res) => {
        setProducts(res.data.data);
        setFilteredProducts(res.data.data);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, products]);

  const applyFilters = () => {
    let result = products;

    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== 'All') {
      result = result.filter(product => product.category === filters.category);
    }

    result = result.filter(product => 
      product.salesPrice >= filters.priceRange[0] && 
      product.salesPrice <= filters.priceRange[1]
    );

    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    if (filters.isFeatured) {
      result = result.filter(product => product.isFeatured);
    }

    if (filters.rating > 0) {
      result = result.filter(product => product.rating >= filters.rating);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'priceLowToHigh':
        result.sort((a, b) => a.salesPrice - b.salesPrice);
        break;
      case 'priceHighToLow':
        result.sort((a, b) => b.salesPrice - a.salesPrice);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Our Products</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-98 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
           
                <FiList />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="md:w-1/4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden text-blue-500 focus:outline-none"
                >
                  <FiSliders />
                </button>
              </div>
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters({...filters, priceRange: [Number(e.target.value), filters.priceRange[1]]})}
                      className="w-1/2 p-2 border rounded"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], Number(e.target.value)]})}
                      className="w-1/2 p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Minimum Rating</h3>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-center">{filters.rating} stars</div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sort By</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="newest">Newest</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                      className="form-checkbox"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.isFeatured}
                      onChange={(e) => setFilters({...filters, isFeatured: e.target.checked})}
                      className="form-checkbox"
                    />
                    <span>Featured Products</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-3/4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      {product.isFeatured && (
                        <span className="absolute top-0 right-0 bg-yellow-400 text-gray-800 px-2 py-1 m-2 rounded-full text-xs font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                      <p className="text-gray-600 mb-2">{product.subTitle}</p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                        <span className="text-lg font-bold text-blue-600">${product.salesPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className={`px-2 py-1 rounded ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <span className="text-gray-600">{product.category}</span>
                      </div>
                      <StarRating rating={product.rating} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-1/4 h-40 object-cover"
                      />
                      <div className="p-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                            <p className="text-gray-600 mb-2">{product.subTitle}</p>
                          </div>
                          {product.isFeatured && (
                            <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="text-gray-500 line-through mr-2">${product.originalPrice.toFixed(2)}</span>
                            <span className="text-lg font-bold text-blue-600">${product.salesPrice.toFixed(2)}</span>
                          </div>
                          <StarRating rating={product.rating} />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className={`px-2 py-1 rounded ${
                            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                          <span className="text-gray-600">{product.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsHome;