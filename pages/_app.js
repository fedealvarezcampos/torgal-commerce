import '../styles/globals.css';
import { CartProvider } from '../context/cart';
import { useState } from 'react';
import { Layout } from '../components';

function TorgalCommerce({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    const [cartMenu, setCartMenu] = useState(false);
    const [show, setShow] = useState(false);

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

    return (
        <CartProvider>
            <Layout
                show={show}
                loading={loading}
                setLoading={setLoading}
                cartMenu={cartMenu}
                handleCartTimeout={handleCartTimeout}
            >
                <Component
                    {...pageProps}
                    show={show}
                    setShow={setShow}
                    loading={loading}
                    setLoading={setLoading}
                    cartMenu={cartMenu}
                    setCartMenu={setCartMenu}
                    handleCartTimeout={handleCartTimeout}
                />
            </Layout>
        </CartProvider>
    );
}

export default TorgalCommerce;
