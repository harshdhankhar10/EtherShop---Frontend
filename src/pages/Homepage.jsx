import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import { useAuth } from '../context/AuthContext'
import { Helmet } from 'react-helmet'


// Products Realted Routes
import FeaturedProduct from '../components/Products/FeaturedProduct'
import CategorySection from '../components/Products/CategorySection'
import HomeAllProducts from '../components/Products/HomeAllProducts'
import HomePromotion from '../components/HomePromotion'
import TestimonialSection from '../components/TestimonialSection'
import FlashSaleCountdown from '../components/SalesCountdown'
import Footer from '../components/Footer'


const Homepage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <>
     <Helmet>
        <title>EtherShop | Home</title>
        <meta name="description" content="Ecommerce Website Homepage" />
        
      </Helmet>
        <Navbar />
        <Carousel/>
        <FeaturedProduct/>
        <CategorySection/>
        <HomeAllProducts/>
        <FlashSaleCountdown/>
        <TestimonialSection/>
        <HomePromotion/>
        <Footer/>
      
       
    </>
  )
}

export default Homepage