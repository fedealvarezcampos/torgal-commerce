import { useState, useEffect } from 'react';
import styles from '../styles/DetailsForm.module.css';
import { commerce } from '../lib/commerce';

function DetailsForm({ token }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [adress, setAdress] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [shippingSubcategories, setShippingSubcategories] = useState([]);
    const [shippingSubcategory, setShippingSubcategory] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const provinces = Object.entries(shippingSubcategories).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    const options = shippingOptions?.map(shipOpt => ({
        id: shipOpt?.id,
        label: `${shipOpt?.description} - (${shipOpt?.price.formatted_with_symbol})`,
    }));

    // console.log(options);

    const [completed, setCompleted] = useState(false);

    const fetchShippigsSubs = async () => {
        const { subdivisions } = await commerce.services.localeListSubdivisions('ES');

        console.log(subdivisions);

        setShippingSubcategories(subdivisions);
        subdivisions && setShippingSubcategory(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (token, country, region = null) => {
        const options = token && (await commerce.checkout.getShippingOptions(token, { country, region }));

        options && token && setShippingOptions(options);
        options && token && setShippingOption(options[0]?.id);
    };

    console.log(shippingSubcategory);

    useEffect(() => {
        fetchShippigsSubs();
    }, []);

    useEffect(() => {
        provinces && fetchShippingOptions(token?.id, 'ES', shippingSubcategory);
    }, [shippingSubcategory]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await 'cosas';
            setCompleted(true);
        } catch (error) {
            console.log(error);
        }
    };

    if (completed) {
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nombre</span>
                    <br />
                    <input
                        required
                        placeholder="Nombre"
                        autoFocus
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Apellido</span>
                    <br />
                    <input
                        required
                        placeholder="Apellido"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                </label>
                <label>
                    <span>Dirección</span>
                    <br />
                    <input
                        required
                        placeholder="Dirección"
                        value={adress}
                        onChange={e => setAdress(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-Mail</span>
                    <br />
                    <input
                        required
                        placeholder="email@email.com"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Código postal</span>
                    <br />
                    <input
                        minLength="5"
                        maxLength="5"
                        placeholder="Código postal (5 cifras)"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                    />
                </label>
                <label>
                    <span>Provincia</span>
                    <br />
                    <select
                        value={shippingSubcategory}
                        onChange={e => setShippingSubcategory(e.target.value)}
                    >
                        {provinces.map(province => (
                            <option key={province?.id} value={province?.id}>
                                {province?.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Ciudad</span>
                    <br />
                    <input
                        required
                        placeholder="Ciudad"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
                <label>
                    <span>Provincia</span>
                    <br />
                    <select value={shippingOption} onChange={e => setShippingOption(e.target.value)}>
                        {options?.map(option => (
                            <option key={option?.id} value={option?.id}>
                                {option?.label}
                            </option>
                        ))}
                    </select>
                </label>
                <button>
                    <p>ENVIAR</p>
                </button>
            </form>
        </div>
    );
}

export default DetailsForm;
