import { useState } from 'react';
import { useCartState } from '../context/cart';
import Image from 'next/image';
import styles from '../styles/Cart.module.css';

const loader = ({ src, width, quality }) => {
    return `https://cdn.chec.io/${src}?w=${width}&q=${quality}`;
};

function Cart({ cartMenu, setCartMenu }) {
    const cart = useCartState();
    const isEmpty = !cart?.line_items.length;

    const SavedCart = () =>
        cartMenu && (
            <>
                <div className={styles.cartContainer}>
                    <ul>
                        {cart?.line_items.map(product => (
                            <li className={styles.cartItemContainer} key={product.id}>
                                <div className={styles.productImage}>
                                    <Image
                                        loader={loader}
                                        src={product?.media?.source}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={80}
                                        alt="product image"
                                    />
                                </div>
                                <div className={styles.cartDetailsContainer}>
                                    <p className={styles.productTitle}>{product?.name}</p>
                                    <p className={styles.productPrice}>
                                        {product?.line_total?.formatted_with_symbol}
                                    </p>
                                    <p>{product?.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>{cart.subtotal.formatted_with_symbol}</p>
                    <div className={styles.buttonsContainer}>
                        <button>CHECKOUT</button>
                        <button>VACIAR CARRO</button>
                    </div>
                </div>
                <div className={styles.cartBG} onClick={() => setCartMenu(false)} />
            </>
        );

    return <div>{isEmpty ? <div>No items</div> : <SavedCart />}</div>;
}

export default Cart;
