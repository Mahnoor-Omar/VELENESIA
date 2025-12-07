import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Orders = () => {

  const { orders, currency } = useContext(ShopContext); 

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      {orders.length === 0 ? (
        <p className='text-lg text-gray-500 mt-10'>You have no placed orders yet.</p>
      ) : (
        <div>
          {/* Reverse the array to show newest orders first */}
          {orders.slice().reverse().map((order, index) => ( 
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm '>
                {/* Map over the items for THIS specific order */}
                {order.items.map((item, i) => (
                    <div key={i} className='flex items-center gap-4 py-2'>
                        <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                        <div>
                            <p className='sm:text-base font-medium'>{item.name}</p>
                            <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                <p className='text-lg'>{currency}{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Size: {item.size}</p>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
              <div className='md:w-1/2 flex justify-between flex-col sm:flex-row'>
                <div className='flex items-center gap-2'>
                    <p className='font-medium'>Order Status:</p>
                    <p className={`min-w-2 h-2 rounded-full 
                        ${order.status === 'Processing' ? 'bg-orange-500' : 
                          order.status === 'Shipped' ? 'bg-blue-500' : 
                          'bg-green-600'}`}></p>
                    <p>{order.status}</p>
                </div>
                <div>
                    <p className='mt-2'>Date: <span className='text-gray-400'>{order.date}</span></p>
                    <p className='mt-2 font-bold'>Total: <span className='text-black'>{currency}{order.amount}.00</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders;