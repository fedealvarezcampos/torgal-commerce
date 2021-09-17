import styles from '../styles/SingleProduct.module.css';
import Image from 'next/image';

const loader = ({ src, width, quality }) => {
    return `https://cdn.chec.io/${src}?w=${width}&q=${quality}`;
};

const SingleProduct = ({ product, addToCart }) => {
    return (
        <>
            <li>
                <div className={styles.container}>
                    <div className={styles.productImage}>
                        <Image
                            loader={loader}
                            src={product?.media?.source}
                            layout="fill"
                            objectFit="cover"
                            quality={80}
                            alt="y la bamba"
                        />
                    </div>
                    <p className={styles.productTitle}>{product?.name}</p>
                    <p className={styles.productPrice}>{product?.price?.formatted_with_symbol}</p>
                    <span
                        className={styles.productDescription}
                        dangerouslySetInnerHTML={{ __html: product?.description }}
                    ></span>
                    <button onClick={() => addToCart(product.id, 1)}>AÑADIR AL CARRO</button>
                </div>
            </li>
        </>
    );
};

export default SingleProduct;
