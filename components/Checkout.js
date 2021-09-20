import { useState, useEffect } from 'react';
import { useCartState } from '../context/cart';
import { commerce } from '../lib/commerce';
import DetailsForm from './DetailsForm';
import styles from '../styles/Checkout.module.css';
import Spinner from './spinner';

function Checkout() {
    const cart = useCartState();
    const isEmpty = !cart?.line_items.length;

    const [activeStage, setActiveStage] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = !isEmpty && (await commerce.checkout.generateToken(cart?.id, { type: 'cart' }));
                token && setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        };

        generateToken();
    }, [cart]);

    return (
        <>
            <DetailsForm token={checkoutToken} />
        </>
    );
}

export default Checkout;
