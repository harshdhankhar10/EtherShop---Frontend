import React, { useState } from 'react';
import { TrashIcon, ShoppingCartIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
const Wishlist = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');

  // Static wishlist data
  const wishlistItems = [
    { id: 1, name: 'Wireless Headphones', price: 129.99, image: 'https://placekitten.com/100/100', category: 'Electronics', dateAdded: '2024-07-15', rating: 4.5, inStock: true, discount: 10 },
    { id: 2, name: 'Smart Watch', price: 249.99, image: 'https://placekitten.com/101/101', category: 'Wearables', dateAdded: '2024-07-14', rating: 4.2, inStock: true, discount: 0 },
    { id: 3, name: 'Laptop Stand', price: 39.99, image: 'https://placekitten.com/102/102', category: 'Accessories', dateAdded: '2024-07-13', rating: 4.8, inStock: false, discount: 5 },
    { id: 4, name: 'Mechanical Keyboard', price: 89.99, image: 'https://placekitten.com/103/103', category: 'Electronics', dateAdded: '2024-07-12', rating: 4.7, inStock: true, discount: 0 },
  ];

  const filteredItems = wishlistItems.filter(item => 
    filter === 'all' || 
    (filter === 'inStock' && item.inStock) || 
    (filter === 'onSale' && item.discount > 0)
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  const totalValue = sortedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
    <Helmet>
        <title>My Wishlist - EtherShop</title>
        
    </Helmet>
    <Navbar/>

         <div className="container mx-auto px-4 py-8">
    
    <h1 className="text-3xl font-bold mb-8 text-gray-800">My Wishlist</h1>
    
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <select 
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Items</option>
          <option value="inStock">In Stock</option>
          <option value="onSale">On Sale</option>
        </select>
        <select 
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dateAdded">Sort by Date Added</option>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      <div className="text-gray-600">
        Total Items: {sortedItems.length} | Total Value: ${totalValue.toFixed(2)}
      </div>
    </div>

    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Product</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-center">Price</th>
            <th className="py-3 px-6 text-center">Rating</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Date Added</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sortedItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img className="w-16 h-16 rounded-lg object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <span className="font-medium">{item.name}</span>
                    {item.discount > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        {item.discount}% OFF
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                  {item.category}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <span className="font-bold">${item.price.toFixed(2)}</span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>{item.rating}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                {item.inStock ? (
                  <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">In Stock</span>
                ) : (
                  <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Out of Stock</span>
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {item.dateAdded}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white mr-2 transform hover:scale-110 transition duration-300">
                    <ShoppingCartIcon className="h-5 w-5 m-auto" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white transform hover:scale-110 transition duration-300">
                    <TrashIcon className="h-5 w-5 m-auto" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {wishlistItems.length === 0 && (
      <div className="text-center py-12 bg-white shadow-md rounded-lg mt-8">
        <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500">Start adding items to your wishlist!</p>
      </div>
    )}
  </div>
    </>
  );
};

export default Wishlist;