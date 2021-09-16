import styles from '../styles/Products.module.css';
import Product from './SingleProduct';

const products = [
    { id: 1, name: 'Shoes', price: '3€', description: 'Zapatos locos' },
    { id: 2, name: 'Pizza', price: '3€', description: 'Pizza loca' },
];

const Products = () => {
    return (
        <main>
            <ul className={styles.container}>
                {products.map(product => (
                    <li key={product.id}>
                        <Product product={product} />
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Products;
