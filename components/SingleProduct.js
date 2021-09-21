import styles from '../styles/SingleProduct.module.css';
import Image from 'next/image';
import { useRef, useState } from 'react';

const loader = ({ src, width, quality }) => {
    return `https://cdn.chec.io/${src}?w=${width}&q=${quality}`;
};

const SingleProduct = ({ product, addToCart, setCartMenu }) => {
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
                    <div className={styles.productImage}>
                        <Image
                            loader={loader}
                            src={product?.media?.source}
                            layout="intrinsic"
                            objectFit="cover"
                            width="400"
                            height="400"
                            quality={80}
                            alt="product image"
                        />
                    </div>
                    <p className={styles.productTitle}>{product?.name}</p>
                    <p className={styles.productPrice}>{product?.price?.formatted_with_symbol}</p>
                    <span
                        className={styles.productDescription}
                        dangerouslySetInnerHTML={{ __html: product?.description }}
                    ></span>
                    <button onClick={() => handleAddToCart(product.id)}>{buttonLabel}</button>
                </div>
            </li>
        </>
    );
};

export default SingleProduct;
