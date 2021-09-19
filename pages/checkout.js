import { commerce } from '../lib/commerce';
import { useCartDispatch, useCartState } from '../context/cart';
import { Checkout } from '../components';

function CheckoutPage() {
    // const cart = useCartState();
    // const { setCart } = useCartDispatch();

    return (
        <>
            <Checkout />
        </>
    );
}

export default CheckoutPage;
