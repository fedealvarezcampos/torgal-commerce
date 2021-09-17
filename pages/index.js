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
    const [products, setProducts] = useState([]);

    const cart = useCartState();
    const { setCart } = useCartDispatch();

    const handleAddProductToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    };

    useEffect(() => {
        setProducts(merchandise);
    }, []);

    return (
        <>
            <NavBar itemsInCart={cart?.total_items} />
            <Products products={products} addToCart={handleAddProductToCart} />
            {/* <Cart cart={cart} /> */}
        </>
    );
}

export default App;
