import styles from '../styles/Products.module.css';
import Product from './SingleProduct';

const Products = ({ products, addToCart, loading }) => {
    return (
        <main>
            <ul
                className={styles.container}
                style={{ backgroundImage: `url(./images/wallpaperFeather.webp)` }}
            >
                {products.map(product => (
                    <Product key={product?.id} loading={loading} product={product} addToCart={addToCart} />
                ))}
            </ul>
        </main>
    );
};

export default Products;
