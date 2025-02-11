
import Offcanvas from 'react-bootstrap/Offcanvas';

const WishListModal = (props) => {

    const {showWishList, setShowWishList} = props;

    const handleClose = () => setShowWishList(false);

    return (
        <>
            <Offcanvas 
            show={showWishList} 
            onHide={handleClose} 
            placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Yêu thích</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default WishListModal;