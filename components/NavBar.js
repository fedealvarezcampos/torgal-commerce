import styles from '../styles/NavBar.module.css';
import Spinner from './spinner';

function NavBar({ itemsInCart, loading, handleCartTimeout }) {
    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.logo}>
                    <img src="./images/stairs.png" width="455" height="456" alt="Torgal logo" />
                    <img src="./images/LOGO.svg" width="807" height="296" alt="Torgal logo" />
                </div>
                <div className={styles.cart} onClick={() => handleCartTimeout()}>
                    <img src="./images/cart.svg" alt="cart" />
                    {itemsInCart !== 0 && <span>{(loading && <Spinner />) || itemsInCart}</span>}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
