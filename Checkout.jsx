import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { toast } from 'react-toastify';

const Checkout = () => {

   
    const { getCartAmount, delivery_fee, cartItems, products, placeOrder, navigate, currency, getCartCount } = useContext(ShopContext);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    
    const cartAmount = getCartAmount();
    const totalAmount = cartAmount + delivery_fee;

   
    if (getCartCount() === 0) {
        toast.warn("Your cart is empty. Add items to proceed to checkout.");
       
        navigate('/order-success');
        return null; 
    }
    
    const getOrderItems = () => {
        const orderItems = [];
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (product) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        orderItems.push({
                            _id: itemId,
                            name: product.name,
                            price: product.price,
                            size: size,
                            quantity: cartItems[itemId][size],
                            image: product.image
                        });
                    }
                }
            }
        }
        return orderItems;
    }


    const handlePlaceOrder = (e) => {
        e.preventDefault();

        // Checks if essential fields are filled
        if (!deliveryInfo.name || !deliveryInfo.email || !deliveryInfo.phone || !deliveryInfo.address) {
            toast.error("Please fill in all delivery information fields.");
            return;
        }

        const itemsToOrder = getOrderItems();

        if (itemsToOrder.length === 0) {
            toast.error("Cart is empty. Please add items.");
            navigate('/cart');
            return;
        }

        // Calls the context function to place the order
        placeOrder({ ...deliveryInfo, payment: paymentMethod }, itemsToOrder, totalAmount);
        
        // Navigates to the orders page after successful order placement
        navigate('/orders');
    }

    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo(prev => ({ ...prev, [name]: value }));
    };


    // Helper function to get items for the Order Summary count
    const items = getOrderItems();

    return (
        <div className='border-t pt-14'>

            <div className='text-2xl mb-3'>
                <Title text1={'ORDER'} text2={'CHECKOUT'} />
            </div>

            <form onSubmit={handlePlaceOrder} className='flex flex-col md:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh]'>

                {/* Delivery Information (Left Side) */}
                <div className='flex flex-col gap-4 w-full md:w-2/3'>

                    <h3 className='text-xl font-semibold mb-3 border-b pb-3'>Delivery Information</h3>
                    
                    <div className='flex gap-3'>
                        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="name" onChange={handleDeliveryChange} value={deliveryInfo.name} placeholder='Full Name' required />
                    </div>
                    
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" name="email" onChange={handleDeliveryChange} value={deliveryInfo.email} placeholder='Email address' required />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="tel" name="phone" onChange={handleDeliveryChange} value={deliveryInfo.phone} placeholder='Phone number' required />
                    <textarea className='border border-gray-300 rounded py-1.5 px-3.5 w-full resize-none' name="address" onChange={handleDeliveryChange} value={deliveryInfo.address} rows="3" placeholder='Delivery Address' required></textarea>

                    <h3 className='text-xl font-semibold my-3 border-b pb-3'>Payment Method</h3>

                    <div className='flex flex-col gap-3'>
                        
                        {/* COD Option */}
                        <div onClick={() => setPaymentMethod('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'COD' ? 'bg-green-400' : ''}`}></p>
                            <p className=' text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                        
                        {/* Card/Stripe Option */}
                        <div onClick={() => setPaymentMethod('Stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'Stripe' ? 'bg-green-400' : ''}`}></p>
                            <p className=' text-gray-500 text-sm font-medium mx-4'>CARD (Stripe/Paypal)</p>
                        </div>

                    </div>
                    
                    {/* Placeholder for payment integration if not COD */}
                    {paymentMethod !== 'COD' && (
                        <div className='mt-4 p-4 border border-blue-200 bg-blue-50 rounded text-sm text-blue-800'>
                            Payment gateway integration would go here. For now, only COD is fully functional.
                        </div>
                    )}


                </div>

                {/* Order Summary (Right Side) */}
                <div className='md:w-1/3 p-6 border rounded-lg shadow-md h-fit'>
                    <h3 className='text-xl font-semibold mb-6 border-b pb-3'>Order Summary</h3>
                    
                    <div className='text-gray-700 space-y-3'>
                        <div className='flex justify-between'>
                            <p>Subtotal ({items.length} unique items)</p>
                            {/* Use toFixed(2) for clean currency display */}
                            <p>{currency}{cartAmount.toFixed(2)}</p> 
                        </div>
                        <div className='flex justify-between border-b pb-3'>
                            <p>Delivery Fee</p>
                            <p>{currency}{delivery_fee.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between text-lg font-bold pt-2'>
                            <p>Total</p>
                            <p>{currency}{totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <button type="submit" className='w-full bg-black hover:bg-gray-800 transition-colors text-white text-sm my-8 px-8 py-3 rounded'>
                        PLACE ORDER NOW
                    </button>
                    
                    <p className='text-xs text-gray-500 text-center'>By placing an order, you agree to VELENESIA's terms and conditions.</p>
                </div>
            </form>
        </div>
    );
};

export default Checkout;