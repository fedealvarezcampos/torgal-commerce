import { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import { Products, NavBar, Cart } from '../components';
import { useCartDispatch, useCartState } from '../context/cart';

export async function getStaticProps() {
    const { data: merchandise } = await commerce.products.list();

    return {
        props: {
            merchandise,
        },
    };
}

function App({ merchandise }) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartMenu, setCartMenu] = useState(false);

    const cart = useCartState();
    const { setCart } = useCartDispatch();

    const handleAddProductToCart = async (productId, quantity) => {
        setLoading(true);
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
        setLoading(false);
    };

    // console.log(products);

    useEffect(() => {
        // setLoading(true);
        setProducts(merchandise);
        setLoading(false);
    }, []);

    return (
        <>
            <NavBar itemsInCart={cart?.total_items} setCartMenu={setCartMenu} loading={loading} />
            <Products products={products} loading={loading} addToCart={handleAddProductToCart} />
            <Cart cartMenu={cartMenu} setCartMenu={setCartMenu} />
        </>
    );
}

export default App;
