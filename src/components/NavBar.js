import styles from '../styles/NavBar.module.css';

function NavBar({ itemsInCart }) {
    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.logo}>LOGO</div>
                <div className={styles.cart}>CARRO {itemsInCart}</div>
            </nav>
        </>
    );
}

export default NavBar;
