function Cart() {
    const isEmpty = true;

    const FilledCart = () => {
        <>
            <div></div>
        </>;
    };

    return <div>{isEmpty ? <div>No items</div> : <div>Items</div>}</div>;
}

export default Cart;
