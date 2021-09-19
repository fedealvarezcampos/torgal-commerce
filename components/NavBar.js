import styles from '../styles/NavBar.module.css';
import Spinner from './spinner';
import Link from 'next/link';

function NavBar({ cart, loading, handleCartTimeout }) {
    const itemsInCart = cart?.total_items;

    return (
        <>
            <nav className={styles.navBar}>
                <Link href="/">
                    <div className={styles.logo}>
                        <img src="./images/stairs.png" width="455" height="456" alt="Torgal logo" />
                        <img src="./images/LOGO.svg" width="807" height="296" alt="Torgal logo" />
                    </div>
                </Link>
                <div className={styles.cart} onClick={() => handleCartTimeout()}>
                    <img src="./images/cart.svg" alt="cart" />
                    {itemsInCart !== 0 && <span>{(loading && <Spinner />) || itemsInCart}</span>}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
