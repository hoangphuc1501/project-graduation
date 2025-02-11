
import Offcanvas from 'react-bootstrap/Offcanvas';

function CartModal(props) {
    const {showCart, setShowCart} = props;

    const handleClose = () => setShowCart(false);

    return (
        <>

            <Offcanvas 
            show={showCart} 
            onHide={handleClose} 
            placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Giỏ hàng</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CartModal;