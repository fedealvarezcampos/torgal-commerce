import { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import { Products } from '../components';
import { useCartDispatch } from '../context/cart';

export async function getStaticProps() {
    const { data: merchandise } = await commerce.products.list();

    return {
        props: {
            merchandise,
        },
    };
}

function Index({ merchandise, loading, setLoading, setCartMenu }) {
    const [products, setProducts] = useState([]);

    const { setCart } = useCartDispatch();

    const handleAddProductToCart = async (productId, quantity) => {
        setLoading(true);

        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
        setLoading(false);
    };

    useEffect(() => {
        setProducts(merchandise);
        setLoading(false);
    }, []);

    return (
        <>
            <Products
                products={products}
                loading={loading}
                addToCart={handleAddProductToCart}
                setCartMenu={setCartMenu}
            />
        </>
    );
}

export default Index;
