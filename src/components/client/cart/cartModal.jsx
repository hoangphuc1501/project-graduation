
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartModalItem } from './cartModalItem';
import { ButtonCartPayment, ButtonViewCart } from './buttonCartModal';

function CartModal(props) {
    const {showCart, setShowCart} = props;

    const handleClose = () => setShowCart(false);

    return (
        <>
            <Offcanvas
            show={showCart} 
            onHide={handleClose} 
            placement="end"
            className="w-[500px]" 
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Giỏ hàng</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CartModalItem/>

                    <div className='flex items-center justify-between'>
                        <ButtonViewCart/>
                        <ButtonCartPayment/>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CartModal;