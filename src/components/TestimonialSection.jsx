import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCard = ({ name, role, company, image, quote }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-xl p-8 mx-4 my-8 relative"
  >
    <div className="flex items-center mb-6">
      <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
      <div>
        <h4 className="text-xl font-semibold">{name}</h4>
        <p className="text-gray-600">{role}, {company}</p>
      </div>
    </div>
    <blockquote className="text-gray-800 italic mb-6">"{quote}"</blockquote>
    <svg className="absolute top-4 right-4 w-12 h-12 text-indigo-100 transform rotate-180" fill="currentColor" viewBox="0 0 32 32">
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  </motion.div>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "This product has revolutionized our workflow. The efficiency gains are remarkable, and our team couldn't be happier!"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "InnovateNow",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "I've tried many solutions, but this one stands out. It's intuitive, powerful, and has greatly improved our productivity."
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignHub",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: "As a designer, I appreciate the attention to detail in this product. It's a joy to use and has streamlined our design process."
    },
    {
      name: "David Thompson",
      role: "CTO",
      company: "FutureTech",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      quote: "The robust features and scalability of this solution have exceeded our expectations. It's a game-changer for our industry."
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="bg-[#E2EDFC] py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          What Our Clients Say
        </motion.h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSection;