import React from 'react';
import { Helmet } from 'react-helmet';
import { Clock, Zap, Tag, Gift, Truck, Package, Star, Archive, UserPlus } from 'lucide-react';

const OfferSection = ({ title, icon: Icon, items }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 mr-2 text-indigo-600" />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
          <img src={`/api/placeholder/${300}/${200}`} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-indigo-600">${item.price}</span>
            <button className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition-colors duration-300">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OfferPageHome = () => {
  const offerSections = [
    {
      title: "Limited Time Deals",
      icon: Clock,
      items: [
        { name: "Smart Watch", description: "50% off - 24 hours only!", price: 99.99 },
        { name: "Wireless Earbuds", description: "Buy in the next 2 hours", price: 59.99 },
        { name: "4K TV", description: "Flash deal - 30% off", price: 499.99 },
      ]
    },
    {
      title: "Flash Sales",
      icon: Zap,
      items: [
        { name: "Gaming Laptop", description: "Lightning deal - 4 hours left", price: 899.99 },
        { name: "Smartphone", description: "Flash sale - 20% off", price: 399.99 },
        { name: "Bluetooth Speaker", description: "Quick deal - 40% off", price: 79.99 },
      ]
    },
    {
      title: "Discounted Products",
      icon: Tag,
      items: [
        { name: "Running Shoes", description: "25% off all sizes", price: 89.99 },
        { name: "Coffee Maker", description: "15% discount applied", price: 69.99 },
        { name: "Backpack", description: "Buy now and save 30%", price: 49.99 },
      ]
    },
    {
      title: "Seasonal Offers",
      icon: Gift,
      items: [
        { name: "Winter Jacket", description: "End of season sale", price: 129.99 },
        { name: "Beach Umbrella", description: "Summer special", price: 39.99 },
        { name: "Christmas Decorations", description: "Early bird discount", price: 29.99 },
      ]
    },
    {
      title: "Buy One Get One (BOGO)",
      icon: Package,
      items: [
        { name: "T-Shirts Pack", description: "Buy one, get one free", price: 24.99 },
        { name: "Socks Bundle", description: "BOGO - Mix and match", price: 12.99 },
        { name: "Book Set", description: "Second book 50% off", price: 34.99 },
      ]
    },
    {
      title: "Free Shipping Offers",
      icon: Truck,
      items: [
        { name: "Furniture Set", description: "Free shipping on orders over $500", price: 599.99 },
        { name: "Home Decor", description: "Free shipping, no minimum", price: 79.99 },
        { name: "Kitchenware", description: "Free shipping on $100+ orders", price: 129.99 },
      ]
    },
    {
      title: "Bulk Purchase Discounts",
      icon: Package,
      items: [
        { name: "Office Supplies", description: "10% off on orders of 5+", price: 49.99 },
        { name: "Snack Packs", description: "15% off when you buy 10", price: 19.99 },
        { name: "Water Bottles", description: "Buy 3, get 1 free", price: 14.99 },
      ]
    },
    {
      title: "Loyalty Program Offers",
      icon: Star,
      items: [
        { name: "Premium Membership", description: "2x points this week", price: 9.99 },
        { name: "Exclusive Products", description: "Members only access", price: 39.99 },
        { name: "Birthday Discount", description: "25% off during your birth month", price: 0 },
      ]
    },
    {
      title: "Clearance Sale",
      icon: Archive,
      items: [
        { name: "Last Season's Fashion", description: "Up to 70% off", price: 29.99 },
        { name: "Discontinued Electronics", description: "Clearance prices", price: 149.99 },
        { name: "Overstocked Items", description: "Everything must go!", price: 9.99 },
      ]
    },
    {
      title: "New Customer Discounts",
      icon: UserPlus,
      items: [
        { name: "Welcome Package", description: "15% off your first order", price: 0 },
        { name: "Starter Kit", description: "50% off for new sign-ups", price: 19.99 },
        { name: "Trial Subscription", description: "First month free", price: 0 },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Amazing Offers - EtherShop</title>
        <meta name="description" content="Discover incredible deals and discounts on EtherShop's offer page. Limited time deals, flash sales, seasonal offers, and more!" />
      </Helmet>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-indigo-600 text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Amazing Offers</h1>
            <p className="mt-2">Discover incredible deals and save big on your favorite products!</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {offerSections.map((section, index) => (
            <OfferSection key={index} {...section} />
          ))}
        </main>
      </div>
    </>
  );
};

export default OfferPageHome;