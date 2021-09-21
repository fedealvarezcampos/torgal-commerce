import styles from '../styles/Products.module.css';
import SingleProduct from './SingleProduct';

const Products = ({ products, addToCart, loading, setCartMenu }) => {
    return (
        <main>
            <ul
                className={styles.container}
                style={{ backgroundImage: `url(./images/wallpaperFeather.webp)` }}
            >
                {products.map(product => (
                    <SingleProduct
                        key={product?.id}
                        loading={loading}
                        product={product}
                        addToCart={addToCart}
                        setCartMenu={setCartMenu}
                    />
                ))}
            </ul>
        </main>
    );
};

export default Products;
