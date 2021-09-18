import { FaShoppingCart } from 'react-icons/fa';
import { BsCaretLeftFill, BsCaretRightFill, BsTrashFill } from 'react-icons/bs';
import { useCartState } from '../context/cart';
import Image from 'next/image';
import styles from '../styles/Cart.module.css';

const loader = ({ src, width, quality }) => {
    return `https://cdn.chec.io/${src}?w=${width}&q=${quality}`;
};

function Cart({ cartMenu, setCartMenu, handleProductQuantity, handleRemoveProduct, handleEmptyCart }) {
    const cart = useCartState();
    const isEmpty = !cart?.line_items.length;

    return (
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
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isEmpty && <div className={styles.noItems}>¡No hay nada en el carro!</div>}
                    <p className={styles.cartTotalPrice}>
                        <span>Total:</span>
                        <span>{cart.subtotal.formatted_with_symbol}</span>
                    </p>
                    <div className={styles.buttonsContainer}>
                        <button>
                            <FaShoppingCart /> CHECKOUT
                        </button>
                        <button onClick={() => handleEmptyCart()}>
                            <BsTrashFill /> VACIAR CARRO
                        </button>
                    </div>
                </div>
                <div className={styles.cartBG} onClick={() => setCartMenu(false)} />
            </>
        )
    );
}

export default Cart;
