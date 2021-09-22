import { useCartState } from '../context/cart';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReviewItems } from '.';
import styles from '../styles/PaymentForm.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

function PaymentForm({ token, goBack, next, total, shippingData, handleCheckout }) {
    const cart = useCartState();
    const isEmpty = !cart?.line_items.length;

    const cardOptions = {
        style: {
            base: {
                iconColor: '#ffffff',
                fontSize: '18px',
                fontFamily: 'Cabin, sans-serif',
                fontWeight: '600',
                lineHeight: '1',
                color: '#E9E9E9',
                '::placeholder': {
                    color: '#CCCCCC',
                },
            },
            invalid: {
                color: '#C35757',
                iconColor: '#C35757',
            },
        },
    };

    const handlePay = async (e, elements, stripe) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log(error);
        } else {
            const orderDetails = {
                line_items: token.live.line_items,
                customer: {
                    firstname: shippingData.name,
                    lastname: shippingData.surname,
                    email: shippingData.email,
                },
                shipping: {
                    name: 'Default',
                    street: shippingData.adress,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubcategory,
                    zip_code: shippingData.postalCode,
                    country: 'ES',
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            // console.log(orderDetails);

            handleCheckout(token.id, orderDetails);

            next();
        }
    };

    return (
        <>
            <div className={styles.paymentContainer}>
                <ReviewItems total={total} token={token} />
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form onSubmit={e => handlePay(e, elements, stripe)}>
                                <CardElement options={cardOptions} />
                                <div className={styles.buttonsContainer}>
                                    <button type="button" onClick={goBack}>
                                        VOLVER ATRÁS
                                    </button>
                                    <button disabled={!stripe}>PAGAR {total}€ </button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </div>
        </>
    );
}

export default PaymentForm;
