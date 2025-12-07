import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem'; 

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const tops = products.filter(product => product.subCategory === 'Top');
            const dresses = products.filter(product => product.subCategory === 'Dresses');
            setLatestProducts([...tops.slice(0, 4), ...dresses.slice(0, 4)]);
        }
    }, [products]);

    return (
        <div className="my-10">
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Your destination for chic, unique, and elegant styles
                </p>
            </div>

            {/*Rendering Products*/}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))}
            </div>
        </div>
    )
}

export default LatestCollection;
