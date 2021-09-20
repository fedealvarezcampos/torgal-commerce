import { useState, useEffect } from 'react';
import { useCartState } from '../context/cart';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { commerce } from '../lib/commerce';
import { ReviewItems } from '.';
import styles from '../styles/PaymentForm.module.css';
import Spinner from './spinner';

const stripePromise = loadStripe('...');

function PaymentForm({ token, goBack, total }) {
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

    return (
        <>
            <div className={styles.paymentContainer}>
                <ReviewItems total={total} token={token} />
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form>
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
