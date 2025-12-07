import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { initialProducts } from '../assets/initialProducts'; 

export const ShopContext = createContext();

const getLocalState = (key, defaultValue) => {
    const localData = localStorage.getItem(key);
   
    if (key === "velenesia_products" && localData) {
        try {
            const parsedData = JSON.parse(localData);
            if (Array.isArray(parsedData) && parsedData.length < 5) {
                return defaultValue; 
            }
        } catch (e) {
            console.error("Failed to parse local storage data:", e);
            return defaultValue;
        }
    } 
    return localData ? JSON.parse(localData) : defaultValue;
};

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState(getLocalState("velenesia_products", initialProducts));
    const [cartItems, setCartItems] = useState(getLocalState("velenesia_cart", {}));
    const [orders, setOrders] = useState(getLocalState("velenesia_orders", [])); 
    useEffect(() => {
        localStorage.setItem("velenesia_products", JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem("velenesia_cart", JSON.stringify(cartItems));
    }, [cartItems]);
    
    useEffect(() => {
        localStorage.setItem("velenesia_orders", JSON.stringify(orders));
    }, [orders]);
 
    const addProduct = (productData) => {
        const newProduct = {
            ...productData,
            _id: Date.now().toString(), 
            price: Number(productData.price),
            image: Array.isArray(productData.image) ? productData.image : productData.image.split(',').map(s => s.trim()).filter(s => s),
            sizes: Array.isArray(productData.available_sizes) ? productData.available_sizes : productData.available_sizes.split(',').map(s => s.trim()).filter(s => s)
        };
        setProducts(prev => [...prev, newProduct]);
        toast.success(`Product ${newProduct.name} added!`);
    };

    const deleteProduct = (productId) => {
        setProducts(prev => prev.filter(p => p._id !== productId));
        setCartItems(prevCart => {
            const newCart = structuredClone(prevCart);
            delete newCart[productId];
            return newCart;
        });
        toast.warn("Product deleted successfully!");
    };
    
    const placeOrder = (customerData, items, totalAmount) => {
        const newOrder = {
            id: Date.now().toString(), 
            customer: customerData.name || 'Guest',
            amount: totalAmount,
            status: "Processing",
            items: items, 
            date: new Date().toLocaleString(),
            ...customerData, 
        };
        setOrders(prev => [...prev, newOrder]);
        setCartItems({}); 
        toast.success("Order placed successfully! Check My Orders page for status.");
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        toast.info(`Order #${orderId} status updated to ${newStatus}`);
    };

    
    const addToCart = async (itemId, size) => {
 
        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
        toast.success("Item added to cart!");

    }

    const updateQuantity = async (itemId, size, quantity) => {
        if (quantity < 1) {
            setCartItems(prevCart => {
                const newCart = structuredClone(prevCart);
                delete newCart[itemId][size];
                if (Object.keys(newCart[itemId]).length === 0) {
                    delete newCart[itemId];
                }
                toast.info("Item removed from cart.");
                return newCart;
            });
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;
            
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalAmount;
    }


    const value = {
        currency, delivery_fee,
        products, 
        orders, 
        addProduct, deleteProduct, 
        placeOrder, updateOrderStatus, 
        navigate,
        search, setSearch,
        showSearch, setShowSearch,
        addToCart, updateQuantity,
        cartItems,
        getCartCount, getCartAmount

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
