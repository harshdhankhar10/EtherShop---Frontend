import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const PromoBanner = ({ title, subtitle, buttonText, bgColor, textColor }) => (
  <div className={`${bgColor} ${textColor} p-8 rounded-lg shadow-lg flex flex-col justify-between h-full`}>
    <div>
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <p className="text-lg mb-6">{subtitle}</p>
    </div>
    <button className={`${textColor === 'text-white' ? 'bg-white text-black' : 'bg-black text-white'} font-semibold py-2 px-6 rounded-full hover:opacity-80 transition-opacity duration-300 self-start`}>
      {buttonText}
    </button>
  </div>
);

const HomePromotion = () => {
  const [email, setEmail] = useState("");

  const handleSubmitEmail = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/newslettermail`,{email});
      setEmail(response.data.data);
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email.");
    }
  };

  

  return (
    <section className="bg-[#E2EDFC] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16">Elevate Your Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PromoBanner 
            title="Exclusive Offers"
            subtitle="Members get access to special deals and early releases."
            buttonText="Join Now"
            bgColor="bg-indigo-600"
            textColor="text-white"
          />
          <PromoBanner 
            title="New Collection"
            subtitle="Discover our latest styles, crafted for the modern you."
            buttonText="Explore"
            bgColor="bg-amber-100"
            textColor="text-gray-800"
          />
          <PromoBanner 
            title="Sustainable Fashion"
            subtitle="Shop eco-friendly options that look good and feel good."
            buttonText="Learn More"
            bgColor="bg-emerald-600"
            textColor="text-white"
          />
        </div>
        <div className="mt-16 text-center">
          <a href="#" className="inline-block bg-black text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300">
            View All Promotions
          </a>
        </div>
      </div>
      <div className="mt-24 bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-4xl font-bold mb-4">Stay Connected</h3>
              <p className="text-xl">Be the first to know about new releases and exclusive offers.</p>
            </div>
            <div className="flex">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-full focus:outline-none"
              />
              <button onClick={handleSubmitEmail} className="bg-white text-black font-semibold px-6 py-2 rounded-r-full hover:bg-opacity-90 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePromotion;
