import { useState, useEffect } from 'react';
import { useCartState } from '../context/cart';
import { commerce } from '../lib/commerce';
import { DetailsForm, PaymentForm } from '.';
import styles from '../styles/Checkout.module.css';
import Spinner from './spinner';

function Checkout() {
    const cart = useCartState();
    const isEmpty = !cart?.line_items.length;

    const [activeStage, setActiveStage] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    const totalPlusShipping = checkoutToken?.live.subtotal.raw + checkoutToken?.shipping_methods[0].price.raw;

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = !isEmpty && (await commerce.checkout.generateToken(cart?.id, { type: 'cart' }));
                token && setCheckoutToken(token);
            } catch (error) {
                // console.log(error);
            }
        };

        generateToken();
    }, [cart]);

    const nextStage = () => setActiveStage(prevStage => prevStage + 1);
    const previousStage = () => setActiveStage(prevStage => prevStage - 1);

    const next = data => {
        setShippingData(data);
        nextStage();
    };

    // console.log(shippingData);

    return (
        <>
            <div className={styles.checkoutContainer}>
                <div className={styles.formContainer}>
                    {activeStage === 0 && <DetailsForm token={checkoutToken} next={next} />}
                    {activeStage === 1 && (
                        <PaymentForm total={totalPlusShipping} token={checkoutToken} goBack={previousStage} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Checkout;
