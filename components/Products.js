import { useState } from 'react';
import SingleProduct from './SingleProduct';
import ProductModal from './ProductModal';
import styles from '../styles/Products.module.css';
import { AnimatePresence } from 'framer-motion';

const Products = ({ products, addToCart, setCartMenu }) => {
    const [selectedID, setSelectedID] = useState();
    const [modalData, setModalData] = useState([]);

    const handleModal = (data, id) => {
        setModalData(data);
        setSelectedID(id);
    };

    return (
        <>
            <ul
                className={styles.container}
                style={{ backgroundImage: `url(./images/wallpaperFeather.webp)` }}
            >
                {products.map(product => (
                    <SingleProduct
                        key={product?.id}
                        product={product}
                        addToCart={addToCart}
                        setCartMenu={setCartMenu}
                        handleModal={handleModal}
                    />
                ))}
            </ul>
            <AnimatePresence>
                {selectedID && <ProductModal key={selectedID} product={modalData} setID={setSelectedID} />}
            </AnimatePresence>
        </>
    );
};

export default Products;
