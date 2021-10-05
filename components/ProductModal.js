import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/ProductModal.module.css';

const loader = ({ src, width, quality }) => {
    return `https://cdn.chec.io/${src}?w=${width}&q=${quality}`;
};

const ProductModal = ({ product, setID }) => {
    return (
        <>
            <motion.div
                layoutId={product?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.productModalContainer}`}
            >
                <div className={styles.productModalInnerContainer}>
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
                    <div className={styles.productDescription}>
                        <span>{product?.name}</span>
                        <span>{product?.price?.formatted_with_symbol}</span>
                        <span dangerouslySetInnerHTML={{ __html: product?.description }} />
                    </div>
                </div>
                <div className={styles.productModalBG} onClick={() => setID(null)}></div>
            </motion.div>
        </>
    );
};

export default ProductModal;
