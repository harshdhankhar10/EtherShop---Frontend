import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { PiStarThin as OutlinedStarIcon } from "react-icons/pi";
import { GoStarFill as SolidStarIcon } from "react-icons/go";
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FacebookShare, LinkedinShare, WhatsappShare, TelegramShare, PinterestShare } from 'react-share-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ViewProduct = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product/${params.slug}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [params.slug]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleToggleCart = () => {
    const isInCart = cartItems.some(item => item._id === product._id);
    if (isInCart) {
      dispatch(removeFromCart(product._id));
      toast.error('Item removed from cart');
    } else {
      dispatch(addToCart(product));
      toast.success('Item added to cart');
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <Navbar />
      <div className="flex flex-col md:flex-row px-4 md:px-20 py-12 gap-10">
        <section className="leftSide md:w-1/2">
          <div className="relative">
            <img
              src={product.imageUrl}
              className="rounded-xl shadow-lg w-full object-cover"
              style={{ height: '40rem' }}
              alt={product.title}
            />
            {product.isFeatured && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Featured
              </div>
            )}
          </div>
        </section>
        <section className="rightSide md:w-1/2">
          <div className="heading flex items-center gap-4">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <button className="px-5 py-2 bg-blue-100 text-blue-600 font-bold rounded-md">
              {product.category}
            </button>
          </div>
          <p className="text-xl text-gray-400 mt-2">{product.subTitle}</p>

          <div className="flex items-center mt-2 py-2">
            <span className="text-xl font-semibold mr-2">Add a Review:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {rating >= value ? <SolidStarIcon className="h-8 w-8" /> : <OutlinedStarIcon className="h-8 w-8" />}
                </button>
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-semibold py-5 text-gray-800">Rs.{product.salesPrice}</h1>
          <p className="line-through text-gray-500">Rs.{product.originalPrice}</p>
          <ul className="features text-lg font-semibold text-gray-700 flex flex-col gap-2 mt-4">
            {product.shortDescription && (
              <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
            )}
          </ul>
          <div className="reviewsImages py-5">
            <div className="images">
              <img
                src="https://hotpot.ai/images/site/ai/image_generator/art_maker/style_catalog/concept_art_7.jpg"
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                alt="user"
              />
              <img
                src="https://hotpot.ai/images/site/ai/image_generator/art_maker/style_catalog/concept_art_7.jpg"
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white -ml-4"
                alt="user"
              />
              <img
                src="https://hotpot.ai/images/site/ai/image_generator/art_maker/style_catalog/concept_art_7.jpg"
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white -ml-4"
                alt="user"
              />
              <span className="ml-2 text-gray-500">1241 sold in the last 24 hours</span>
            </div>
          </div>
          <div className="btn flex gap-4">
            <button className="px-12 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
              Buy it now
            </button>
            <button onClick={handleToggleCart} className="px-12 py-3 bg-blue-100 text-blue-600 font-bold rounded-md hover:bg-blue-200 transition-colors">
              Add to Cart
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <FacebookShare url={product.slug} />
            <LinkedinShare url={product.slug} />
            <WhatsappShare url={product.slug} />
            <TelegramShare url={product.slug} />
            <PinterestShare url={product.slug} />
          </div>
        </section>
      </div>
     
      <div className="flex justify-center mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick('description');
              }}
              className={`${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Description
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick('reviews');
              }}
              className={`${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Reviews
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick('policies');
              }}
              className={`${
                activeTab === 'policies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Policies
            </a>
          </nav>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full px-20">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Description</h3>
              <p dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h3>
              <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-md">
                <div className="flex items-center mb-2">
                  <img
                    src="https://via.placeholder.com/50x50"
                    className="w-8 h-8 rounded-full mr-2"
                    alt="user"
                  />
                  <span className="text-sm font-bold">John Doe</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  This is a great product! I've been using it for a few weeks now and it has exceeded my expectations.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-md">
                <div className="flex items-center mb-2">
                  <img
                    src="https://via.placeholder.com/50x50"
                    className="w-8 h-8 rounded-full mr-2"
                    alt="user"
                  />
                  <span className="text-sm font-bold">Jane Smith</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Amazing quality and fast shipping. I would definitely buy again!
                </p>
              </div>
            </div>
          )}
          {activeTab === 'policies' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Policies</h3>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-700">Shipping Policy:</h4>
                <p>
                  We offer free standard shipping on all orders. Expedited shipping options are available for an additional fee.
                </p>
                <h4 className="text-xl font-semibold mb-2 text-gray-700">Return Policy:</h4>
                <p>
                  You can return any item within 30 days of purchase for a full refund. The item must be in its original condition.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
