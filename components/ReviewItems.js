import styles from '../styles/ReviewItems.module.css';

function ReviewItems({ token, total }) {
    return (
        <>
            <div className={styles.reviewContainer}>
                <ul className={styles.itemContainer}>
                    {token?.live.line_items.map(item => (
                        <li key={item.name}>
                            <span>
                                {item.name} ( x {item.quantity} )
                            </span>
                            <span>{item.line_total.formatted_with_symbol}</span>
                        </li>
                    ))}
                </ul>
                <div className={styles.totalContainer}>
                    <div>
                        <span>Envío:</span>
                        <span>
                            {token.shipping_methods[0].description} -{' '}
                            {token.shipping_methods[0].price.formatted_with_symbol}
                        </span>
                    </div>
                    <div>
                        <span>Total:</span>
                        <span>{total} €</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReviewItems;
