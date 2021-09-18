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
    const [show, setShow] = useState(false);

    const cart = useCartState();
    const { setCart } = useCartDispatch();

    const handleAddProductToCart = async (productId, quantity) => {
        setLoading(true);

        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
        setLoading(false);
    };

    const handleProductQuantity = async (productId, quantity) => {
        setLoading(true);

        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
        setLoading(false);
    };

    const handleRemoveProduct = async productId => {
        setLoading(true);

        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
        setLoading(false);
    };

    const handleEmptyCart = async () => {
        setLoading(true);

        const { cart } = await commerce.cart.empty();

        setCart(cart);
        setLoading(false);
    };

    const handleCartTimeout = () => {
        if (cartMenu) {
            setShow(true);
            setTimeout(() => {
                setCartMenu(false);
                setShow(false);
            }, 320);
        } else {
            setCartMenu(true);
        }
    };

    useEffect(() => {
        setProducts(merchandise);
        setLoading(false);
    }, []);

    return (
        <>
            <NavBar itemsInCart={cart?.total_items} loading={loading} handleCartTimeout={handleCartTimeout} />
            <Products products={products} loading={loading} addToCart={handleAddProductToCart} />
            <Cart
                handleProductQuantity={handleProductQuantity}
                handleRemoveProduct={handleRemoveProduct}
                handleEmptyCart={handleEmptyCart}
                show={show}
                cartMenu={cartMenu}
                handleCartTimeout={handleCartTimeout}
            />
        </>
    );
}

export default App;
