import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import { Helmet } from 'react-helmet';
const CategoryBasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/category/${params.slug}`);
        setProducts(response.data.products);
        setCategory(response.data.category);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryAndProducts();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
    <Helmet>
      <title>{category.name} Category - EtherShop</title>
      <meta name="description" content={category.description} />
    </Helmet>
      <Navbar />
      <div className="w-full mx-auto py-12 px-4 sm:px-6 lg:px-4">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-12">
          <div className="md:flex">
          
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">Category</div>
              <h1 className="mt-1 text-4xl font-extrabold text-gray-900 leading-tight">
                {category.name}
              </h1>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                {category.description}
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {products.length} Products
                </span>
              </div>
            </div>
             <div className='w-full flex flex-col items-center justify-center px-6'>
             {category.image && (
              <div className="md:flex-shrink-0">
                <img className="h-full w-full  object-cover md:w-64" src={category.image} alt={category.name} />
              </div>
            )}
             </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white shadow-md rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group">
                <div className="relative w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-center object-cover group-hover:opacity-75 transition duration-300 ease-in-out"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-0 left-0 m-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    </div>
                  )}
                  {product.salesPrice < product.originalPrice && (
                    <div className="absolute top-0 right-0 m-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Sale
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{product.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.subTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">${product.salesPrice}</p>
                    {product.salesPrice < product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                    Add to Cart
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition duration-300 ease-in-out">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBasedProducts;