import { useState } from 'react';
import { useCartState } from '../context/cart';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { RiCloseCircleFill } from 'react-icons/ri';
import { BsCaretLeftFill, BsCaretRightFill, BsTrashFill } from 'react-icons/bs';
import { Spinner2 } from './spinner';
import styles from '../styles/Cart.module.css';

const loader = ({ src, width, quality }) => {
    return `https://cdn.chec.io/${src}?w=${width}&q=${quality}`;
};

function Cart({
    cartMenu,
    show,
    handleCartTimeout,
    handleProductQuantity,
    handleRemoveProduct,
    handleEmptyCart,
    loading,
}) {
    const cart = useCartState();
    const isEmpty = !cart?.line_items.length;

    const [emptyCartLabel, setEmptyCartLabel] = useState('VACIAR CARRO');

    const handleCartEmptying = async () => {
        setEmptyCartLabel('VACIANDO...');
        await handleEmptyCart();
        setEmptyCartLabel(emptyCartLabel);
    };

    return (
        cartMenu && (
            <>
                <div
                    className={`${styles.cartContainer} ${
                        (show && 'transitionOut') || (cartMenu && 'transitionIn')
                    }`}
                >
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
                                    <div className={styles.cartButtonsContainer}>
                                        <span className={styles.productQuantity}>
                                            <BsCaretLeftFill
                                                onClick={() =>
                                                    handleProductQuantity(product?.id, product?.quantity - 1)
                                                }
                                            />
                                            <p>{product?.quantity}</p>
                                            <BsCaretRightFill
                                                onClick={() =>
                                                    handleProductQuantity(product?.id, product?.quantity + 1)
                                                }
                                            />
                                        </span>
                                        <RiCloseCircleFill onClick={() => handleRemoveProduct(product?.id)} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isEmpty && (
                        <div className={styles.noItems}>
                            <span>Aquí no hay nada.</span>
                            <div className={styles.travolta} />
                        </div>
                    )}
                    {!isEmpty && (
                        <>
                            <p className={styles.cartTotalPrice}>
                                <span>Total:</span>
                                <span>{cart.subtotal.formatted_with_symbol}</span>
                            </p>
                            <div className={styles.checkoutButtonsContainer}>
                                <Link href="/checkout">
                                    <button onClick={() => handleCartTimeout()}>
                                        <FaShoppingCart /> CHECKOUT
                                    </button>
                                </Link>
                                <button onClick={() => handleCartEmptying()}>
                                    <BsTrashFill /> {emptyCartLabel}
                                </button>
                            </div>
                            {loading && (
                                <div className={`${styles.cartSpinner} fadeIn2`}>
                                    CARGANDO
                                    <Spinner2 />
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div
                    className={`${styles.cartBG} ${(show && 'fadeOut') || (cartMenu && 'fadeIn')}`}
                    onClick={() => handleCartTimeout()}
                />
            </>
        )
    );
}

export default Cart;
