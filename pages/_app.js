import '../styles/globals.css';
import { CartProvider } from '../context/cart';

function MyApp({ Component, pageProps }) {
    return (
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
    );
}

export default MyApp;
