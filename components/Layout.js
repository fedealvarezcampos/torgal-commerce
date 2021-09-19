import styles from '../styles/layout.module.css';
import Head from 'next/head';
import { commerce } from '../lib/commerce';
import { useCartDispatch, useCartState } from '../context/cart';
import { NavBar, Cart } from '.';

export default function Layout({ children, loading, setLoading, handleCartTimeout, show, cartMenu }) {
    const cart = useCartState();
    const { setCart } = useCartDispatch();

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

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>Café & Pop Torgal - Tienda</title>
                <meta property="og:title" content="Café & Pop Torgal - Tienda" key="title" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://torgal.vercel.app/images/ogimage.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <NavBar cart={cart} loading={loading} handleCartTimeout={handleCartTimeout} />
            <Cart
                handleProductQuantity={handleProductQuantity}
                handleRemoveProduct={handleRemoveProduct}
                handleEmptyCart={handleEmptyCart}
                cartMenu={cartMenu}
                show={show}
                handleCartTimeout={handleCartTimeout}
            />
            {children}
        </div>
    );
}