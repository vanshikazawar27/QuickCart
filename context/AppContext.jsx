'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
// import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // ✅
import toast from "react-hot-toast";
// import { Token } from "@clerk/nextjs/dist/types/server";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const { user, isSignedIn } = useUser()
    const { getToken } = useAuth()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})

    const fetchProductData = async () => {
        try {
            const { data } = await axios.get('/api/Product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserData = async () => {
       try {
         if (user.publicMetadata.role === 'seller'){
            setIsSeller(true)
        }

        const token = await getToken()
        const {data} = await axios.get('/api/user/data', { headers: { Authorization: `Bearer ${token}` } })

        if (data.success) {
            setUserData(data.user)
            setCartItems(data.user.cartItems || {})
        }else {
            toast.error(data.message)
        }

       } catch (error) {
        toast.error(error.message)
       }
    }

    const fetchCart = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/user/data', { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setCartItems(data.user.cartItems || {})
            }else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const addToCart = async (itemId) => {
        try {
            // Check if user is signed in
            if (!isSignedIn) {
                toast.error("Please sign in to add items to cart");
                router.push('/sign-in');
                return;
            }

            // Get the token for authentication
            const token = await getToken();
            if (!token) {
                throw new Error("Authentication failed");
            }
            
            // Update local state optimistically
            const updatedCart = { ...cartItems };
            updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
            setCartItems(updatedCart);

            // Update server
            const response = await axios.post(
                '/api/cart/update',
                { cartData: updatedCart },
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                toast.success('Item added to cart');
            } else {
                throw new Error('Failed to update cart');
            }
        } catch (error) {
            console.error('Add to cart error:', error);
            toast.error(error.response?.data?.message || 'Failed to add item to cart');
            // Revert to server state on error
            fetchCart();
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        if (user) {
            try {
                const token = await getToken()
                await axios.post('/api/cart/update', { cartData }, { headers: { Authorization: `Bearer ${token}` } })
                toast.success('Cart Updated')
            }catch (error) {
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if(user) {
            fetchUserData()
        }
        
    }, [user])

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}