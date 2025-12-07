import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify'; 

const Cart = () => {

  const { products, currency, navigate, cartItems, updateQuantity } = useContext(ShopContext); 

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    
    const tempData = []
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  const handleUpdateQuantity = (itemId, size, value) => {
    const quantity = Number(value);
    
    updateQuantity(itemId, size, quantity);
  }

  const handleRemoveItem = (itemId, size) => {
      
      updateQuantity(itemId, size, 0);
  }


  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
          <div className='text-center py-20 text-gray-500 text-lg'>
              Your VELENESIA cart is empty.
              <button onClick={() => navigate('/collection')} className='block mx-auto mt-6 bg-black text-white text-sm px-6 py-3'>
                START SHOPPING
              </button>
          </div>
      ) : (
          <>
              <div>
                {cartData.map((item, index) => {

                  const productData = products.find((product) => product._id === item._id);

                  // Only render if product data is found
                  if (!productData) return null; 

                  return (
                    <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                      <div className='flex items-start gap-6'>
                        {/* Use product image or a placeholder */}
                        <img className='w-16 sm:w-20' src={productData.image && productData.image[0] ? productData.image[0] : assets.placeholder_image} alt={productData.name} /> 
                        <div>
                          <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                          <div className='flex items-center gap-5 mt-2'>
                            <p>{currency}{productData.price}</p>
                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                          </div>
                        </div>
                      </div>
                      <input 
                        onChange={(e) => handleUpdateQuantity(item._id, item.size, e.target.value)} 
                        className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                        type="number" 
                        min={1} 
                        defaultValue={item.quantity} 
                      />
                      {/* Button to remove item (sets quantity to 0) */}
                      <img onClick={() => handleRemoveItem(item._id, item.size)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="Remove" />
                    </div>
                  )

                })}
              </div>

              <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                  <CartTotal /> 
                  <div className='w-full text-end'>
                    <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
                  </div>
                </div>
              </div>
          </>
      )}


    </div>
  )
}

export default Cart