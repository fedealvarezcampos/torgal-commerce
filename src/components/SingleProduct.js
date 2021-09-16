import styles from '../styles/SingleProduct.module.css';

const SingleProduct = ({ product }) => {
    return (
        <>
            <div className={styles.container}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <span>{product.description}</span>
            </div>
            <div>
                <button>Añadir al carro</button>
            </div>
        </>
    );
};

export default SingleProduct;
