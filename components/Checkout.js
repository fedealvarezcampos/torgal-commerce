import { useState, useEffect } from 'react';
import { useCartDispatch, useCartState } from '../context/cart';
import { commerce } from '../lib/commerce';
import { DetailsForm, PaymentForm } from '.';
import styles from '../styles/Checkout.module.css';

function Checkout() {
    const cart = useCartState();
    const { setCart } = useCartDispatch();
    const isEmpty = !cart?.line_items.length;

    const [activeStage, setActiveStage] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [order, setOrder] = useState({});
    const [error, setError] = useState('');

    const totalPlusShipping = checkoutToken?.live.subtotal.raw + checkoutToken?.shipping_methods[0].price.raw;

    const refreshCart = async () => {
        const freshCart = await commerce.cart.refresh();

        setCart(freshCart);
    };

    const handleCheckout = async (token, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(token, newOrder);
            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            console.log(error);
            // error && setError(error?.data.error.message);
        }
    };

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

    console.log(shippingData);

    return (
        <>
            <div className={styles.checkoutContainer}>
                <div className={styles.formContainer}>
                    {activeStage === 0 && <DetailsForm token={checkoutToken} next={next} />}
                    {activeStage === 1 && (
                        <PaymentForm
                            token={checkoutToken}
                            shippingData={shippingData}
                            handleCheckout={handleCheckout}
                            total={totalPlusShipping}
                            token={checkoutToken}
                            goBack={previousStage}
                            next={next}
                        />
                    )}
                    {activeStage === 2 && <div>CONFIRMADO</div>}
                </div>
            </div>
        </>
    );
}

export default Checkout;
