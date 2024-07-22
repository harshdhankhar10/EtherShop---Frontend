import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            {/* <img className="h-12 w-auto" src="/path-to-your-logo.svg" alt="Company logo" /> */}
            <span className='text-3xl font-bold'>EtherShop</span>
            <p className="text-sm leading-6 text-gray-400">
              Redefining excellence through innovation. Join us in creating tomorrow's solutions, today.
            </p>
            <div className="flex space-x-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-[#2563EB] transition-all duration-300 transform hover:scale-110">
                  <span className="sr-only">Social Media</span>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Company Information
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#2563EB] rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">About Us<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Careers<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Press Releases<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Blog<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Our Team<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Sustainability<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Investor Relations<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Customer Service
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#2563EB] rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Contact Us<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">FAQs<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Shipping & Delivery<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Returns & Refunds<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Order Tracking<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Size Guide<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Payment Methods<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Warranty Policy<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Account Information
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#2563EB] rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">My Account<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Order History<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Wish List<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Newsletter Subscription<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Login/Register<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Address Book<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300 relative group">Rewards Program<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; 2024 EtherShop. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group">Privacy Policy<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group">Terms & Conditions<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group">Site Map<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group">Accessibility<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group">Affiliate Program<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group">Cookie Policy<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer