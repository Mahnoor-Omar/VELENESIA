import React, { useContext } from 'react';
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';


const OrderSuccess = () => {
    
    
    const { currency } = useContext(ShopContext);

    

    return (
        <div className='border-t pt-14 min-h-[80vh] flex flex-col items-center justify-center text-center px-4'>
            
            {/* Start 3D Card Container */}
            {/* Applied shadow-2xl for 3D effect and transition for modern feel */}
            <div className='max-w-xl w-full mx-auto p-8 sm:p-10 border rounded-xl shadow-2xl shadow-green-300/50 bg-white transform transition-all duration-300'>
                
                {/* Black Tick Emoji - Large size and styled container for visual pop */}
                <div className='relative w-24 h-24 flex items-center justify-center bg-green-50 rounded-full mx-auto mb-6 
                                shadow-inner shadow-green-200/50 border-4 border-green-200'>
                    {/* ✅ Black Tick Emoji */}
                    <span className='text-5xl'>✔️</span> 
                </div>

                <div className='text-3xl sm:text-4xl mb-4'>
                    <Title text1={'ORDER'} text2={'PLACED!'} />
                </div>

                <p className='text-lg text-gray-700 mb-8 max-w-xl mx-auto'>
                    Thank you for your purchase. Your order has been successfully placed and is now being processed.
                </p>

                {/* Optional info card for better UX */}
                <div className='bg-green-50 p-4 rounded-lg border border-green-200 mb-8 text-center'>
                     <p className='text-sm font-medium text-green-700'>
                        Delivery is expected within 3-5 business days.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link to="/" className='bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-colors rounded'>
                        CONTINUE SHOPPING
                    </Link>
                    <Link to="/orders" className='bg-white border border-gray-400 text-gray-700 text-sm px-8 py-3 hover:bg-gray-100 transition-colors rounded'>
                        VIEW MY ORDERS
                    </Link>
                </div>

            </div>
            {/* End 3D Card Container */}

        </div>
    );
};

export default OrderSuccess;