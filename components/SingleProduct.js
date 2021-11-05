import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/SingleProduct.module.css';

const SingleProduct = ({ product, addToCart, setCartMenu, handleModal }) => {
    const [buttonLabel, setButtonLabel] = useState('AÑADIR AL CARRO');

    const handleAddToCart = async product => {
        setButtonLabel('AÑADIENDO...');
        await addToCart(product);
        setCartMenu(true);
        setButtonLabel(buttonLabel);
    };

    return (
        <>
            <li>
                <div className={styles.container}>
                    <motion.div
                        className={styles.productImage}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleModal(product, product?.id)}
                    >
                        <Image
                            // loader={loader}
                            src={product?.media?.source}
                            layout="intrinsic"
                            objectFit="cover"
                            width="400"
                            height="400"
                            quality={80}
                            alt="product image"
                        />
                    </motion.div>
                    <motion.p
                        whileHover={{ scale: 1.03, color: 'var(--light-green)' }}
                        className={styles.productTitle}
                        onClick={() => handleModal(product, product?.id)}
                    >
                        {product?.name}
                    </motion.p>
                    <p className={styles.productPrice}>{product?.price?.formatted_with_symbol}</p>
                    <span
                        className={styles.productDescription}
                        dangerouslySetInnerHTML={{ __html: product?.description }}
                    />
                    <button onClick={() => handleAddToCart(product.id)}>{buttonLabel}</button>
                </div>
            </li>
        </>
    );
};

export default SingleProduct;
