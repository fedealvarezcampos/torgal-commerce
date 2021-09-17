import styles from '../styles/NavBar.module.css';

function NavBar({ itemsInCart }) {
    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.logo}>
                    <img src="./images/stairs.png" width="455" height="456" alt="Torgal logo" />
                    <img src="./images/LOGO.svg" width="807" height="296" alt="Torgal logo" />
                </div>
                <div className={styles.cart}>
                    <img src="./images/cart.svg" alt="cart" /> <span>{itemsInCart}</span>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
