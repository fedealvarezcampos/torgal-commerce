import styles from '../styles/SingleProduct.module.css';

const SingleProduct = ({ product, addToCart }) => {
    return (
        <>
            <li>
                <div className={styles.container}>
                    <div
                        className={styles.productImage}
                        style={{ backgroundImage: `url(${product?.media?.source})` }}
                    />
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
