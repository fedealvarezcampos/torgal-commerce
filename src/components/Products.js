import styles from '../styles/Products.module.css';
import Product from './SingleProduct';

const products = [
    { id: 1, name: 'Shoes', price: '3€', description: 'Zapatos locos' },
    { id: 2, name: 'Pizza', price: '3€', description: 'Pizza loca' },
];

const Products = ({ products, addToCart }) => {
    return (
        <main>
            <ul className={styles.container}>
                {products.map(product => (
                    <Product key={product?.id} product={product} addToCart={addToCart} />
                ))}
            </ul>
        </main>
    );
};

export default Products;
