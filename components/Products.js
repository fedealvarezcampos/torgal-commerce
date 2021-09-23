import SingleProduct from './SingleProduct';
import styles from '../styles/Products.module.css';

const Products = ({ products, addToCart, loading, setCartMenu }) => {
    return (
        <ul className={styles.container} style={{ backgroundImage: `url(./images/wallpaperFeather.webp)` }}>
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
    );
};

export default Products;
