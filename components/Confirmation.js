import Link from 'next/link';
import { Spinner2 } from './spinner';
import styles from '../styles/Confirmation.module.css';

const Confirmation = ({ order }) => {
    return (
        <>
            {order?.customer ? (
                <div className={styles.confirmationContainer}>
                    <div>¡Gracias por tu compra, {order.customer.firstname}!</div>
                    <div>Tu número de referencia es:</div>
                    <div>{order.customer_reference}</div>
                    <Link href="/">
                        <button>VOLVER A INICIO</button>
                    </Link>
                </div>
            ) : (
                <div className={styles.loadingContainer}>
                    <span>Finalizando compra...</span>
                    <span>( No salgas de esta página )</span>
                    <Spinner2 />
                </div>
            )}
        </>
    );
};

export default Confirmation;
