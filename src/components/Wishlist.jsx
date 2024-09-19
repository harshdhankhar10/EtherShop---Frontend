import React, { useEffect, useState } from 'react';
import { TrashIcon, ShoppingCartIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { Link,useParams } from 'react-router-dom';


const Wishlist = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const params = useParams();

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const filteredItems = wishlistItems.filter(item =>
    filter === 'all' ||
    (filter === 'inStock' && item.inStock) ||
    (filter === 'onSale' && item.discount > 0)
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price') return a.salesPrice - b.salesPrice;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  const totalValue = sortedItems.reduce((sum, item) => sum + item.salesPrice, 0);
  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const addTocart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item._id));
    toast.success('Item added to cart and removed from wishlist');
  }

  const removeFromWishList = (id) => {
    dispatch(removeFromWishlist(id));
    toast.error('Item removed from wishlist');
  }

  return (
    <>
      <Helmet>
        <title>My Wishlist - EtherShop</title>
      </Helmet>
      <Navbar />

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
            Total Items: {sortedItems.length} | Total Value: ₹{totalValue.toFixed(2)}
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
                        <Link to={`/product/${item.slug}`}>
                          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md" />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span className="font-bold">₹{item.salesPrice.toFixed(2)}</span>
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
                  <td className="py-3 px-6 text-center font-semibold text-gray-500">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <button
                        className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white mr-2 transform hover:scale-110 transition duration-300"
                        onClick={() => addTocart(item)}
                      >
                        <ShoppingCartIcon className="h-5 w-5 m-auto" />
                      </button>
                      <button
                        className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white transform hover:scale-110 transition duration-300"
                        onClick={() => removeFromWishList(item._id)}
                      >
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
