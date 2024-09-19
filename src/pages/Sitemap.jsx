import React from 'react';
import { ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {Helmet} from "react-helmet";

const sitemapData = [
  { title: 'Home', url: '/' },
  { title: 'Shop', url: '/shop' },
  { title: 'Product Categories', url: '/categories' },
  { title: 'Product Details', url: '/product' },
  { title: 'Cart', url: '/cart' },
  { title: 'Checkout', url: '/checkout' },
  { title: 'Order Confirmation', url: '/order-confirmation' },
  { title: 'Wishlist', url: '/wishlist' },
  { title: 'Blog', url: '/blog' },
  { title: 'About Us', url: '/about' },
  { title: 'Contact Us', url: '/contact' },
  { title: 'FAQs', url: '/faqs' },
  { title: 'Support', url: '/support' },
  { title: 'My Account', url: '/account' },
  { title: 'Login/Register', url: '/login' },
  { title: 'Privacy Policy', url: '/privacy' },
  { title: 'Terms of Service', url: '/terms' },
  { title: 'Vendor Dashboard', url: '/vendor' },
  { title: 'Offers/Discounts', url: '/offers' },
];

const Sitemap = () => {
  return (
<>
<Helmet>
        <title>EtherShop | Sitemap</title>
        
</Helmet>
<Navbar />
<div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-indigo-600">EtherShop Sitemap</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapData.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between"
            >
              <span className="text-lg font-semibold text-gray-800">{item.title}</span>
              <ChevronRight className="text-indigo-500" size={24} />
            </a>
          ))}
        </div>
      </div>
    </div>
    <Footer />
</>
  );
};

export default Sitemap;