import { useState, useEffect } from 'react';
import { commerce } from '../src/lib/commerce';
import { Products, NavBar, Cart } from '../src/components';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProds = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddProductToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    };

    console.log(cart);

    useEffect(() => {
        fetchProds();
        fetchCart();
    }, []);

    return (
        <>
            <NavBar itemsInCart={cart?.total_items} />
            <Products products={products} addToCart={handleAddProductToCart} />
            <Cart cart={cart} />
        </>
    );
}

export default App;
