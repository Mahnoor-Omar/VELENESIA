import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>VELENESIA was born from a feeling — a deep desire to create something that spoke to women who have always felt bold inside, even when the world tried to quiet them. It started as a vision, stitched together by imagination, late nights, fabric swatches, and a belief that clothing is not just worn, it is felt. Every idea, every sketch, every texture came from moments of self-discovery, from watching strong women around us, and from a quiet promise to design pieces that don’t just follow trends, but carry stories, emotion, and identity.</p>
          <p>What began as a dream slowly transformed into a space where elegance meets fearlessness.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at VELENESIA is to empower women through fashion that celebrates confidence, self-expression, and timeless elegance. We strive to create high-quality, thoughtfully designed pieces that inspire strength, authenticity, and beauty in every form. By blending luxury with purpose, our goal is to help every woman feel seen, powerful, and unforgettable — not just in what she wears, but in who she is.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
