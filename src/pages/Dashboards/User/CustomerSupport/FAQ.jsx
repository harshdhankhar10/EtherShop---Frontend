import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 text-gray-600 bg-white">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
    const faqs = [
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. For certain regions, we also offer payment options like Google Pay and local bank transfers."
        },
        {
          question: "How long does shipping take?",
          answer: "Shipping times vary depending on your location and the shipping method chosen. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days. Expedited shipping options are available at checkout for faster delivery."
        },
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Products must be in their original condition, unworn, and with all tags attached. Some items, such as intimate apparel or personalized products, may not be eligible for return. Please refer to our detailed return policy page for more information."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Please note that customers are responsible for any customs fees or import taxes that may apply to their order."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or directly through the carrier's tracking portal. For registered users, order tracking is also available in your account dashboard."
        },
        {
          question: "Are your products authentic?",
          answer: "Absolutely. We guarantee that all products sold on our website are 100% authentic. We source our items directly from authorized manufacturers and distributors to ensure the highest quality and authenticity for our customers."
        },
        {
          question: "What should I do if I receive a damaged or incorrect item?",
          answer: "If you receive a damaged or incorrect item, please contact our customer service team within 48 hours of delivery. Provide your order number and photos of the item, and we'll arrange for a replacement or refund as quickly as possible. We cover return shipping costs for damaged or incorrectly sent items."
        },
        {
          question: "Do you offer gift wrapping services?",
          answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout. We use high-quality wrapping paper and include a personalized gift message of your choice."
        },
        {
          question: "How do I apply a promotional code to my order?",
          answer: "To apply a promotional code, enter the code in the designated field during the checkout process, before finalizing your payment. If the code is valid, the discount will be automatically applied to your order total. Please note that some promotional codes may have specific terms and conditions."
        },
        {
          question: "What is your price match policy?",
          answer: "We offer a price match guarantee on identical items found at a lower price from an authorized retailer. To request a price match, contact our customer service team with a link to the competitor's listing. Price matches are subject to verification and certain conditions may apply."
        }
      ];
    

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;