import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import debounce from 'lodash/debounce';
import {Link} from 'react-router-dom';
const Searchbar = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm.length < 2) {
        setResults([]);
        setIsResultsVisible(false);
        return;
      }

      setLoading(true);
      setError(null);
      setIsResultsVisible(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/search`, {
          params: { keyword: searchTerm }
        });
        setResults(response.data.products || []);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(keyword);
  }, [keyword, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search Online courses, AI, Blockchain, IoT, etc"
          value={keyword}
          onChange={handleInputChange}
          onFocus={() => setIsResultsVisible(true)}
          className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
        />
        <CiSearch 
          size="1.5em" 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      
      {isResultsVisible && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {loading && (
            <div className="p-2 text-center text-gray-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
          {error && (
            <div className="p-2 text-center text-red-600 text-xs">
              {error}
            </div>
          )}
          {results.length > 0 && (
            <ul className="max-h-60 overflow-y-auto">
              {results.map((product) => (
                <li key={product._id} className="border-b border-gray-100 last:border-b-0">
                  <Link to={`/product/${product.slug}`}  className="p-2 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.title} className="w-12 h-12 object-cover rounded-sm" />
                    )}
                    <h3 className="text-xm font-semibold text-gray-900 truncate flex-1">{product.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {results.length === 0 && !loading && !error && keyword.length >= 2 && (
            <div className="p-2 text-center text-gray-500 text-xs">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;