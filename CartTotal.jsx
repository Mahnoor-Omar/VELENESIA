import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    const cartAmount = getCartAmount();
    const totalAmount = cartAmount + delivery_fee;

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    {/* Use .toFixed(2) for consistent currency formatting */}
                    <p>{currency} {cartAmount.toFixed(2)}</p> 
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee.toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    {/* Use totalAmount and .toFixed(2) for calculation and formatting */}
                    <b>{currency} {cartAmount === 0 ? (0).toFixed(2) : totalAmount.toFixed(2)}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal