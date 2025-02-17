
import Offcanvas from 'react-bootstrap/Offcanvas';
import WishListModalItem from './wishListModalItem';
import { WishListButtonViewAll } from './wishListButton';

const WishListModal = (props) => {

    const {showWishList, setShowWishList} = props;

    const handleClose = () => setShowWishList(false);

    return (
        <>
            <Offcanvas 
            show={showWishList} 
            onHide={handleClose} 
            placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='font-[700] text-[26px] text-[#000000]'>Danh sách yêu thích</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <WishListModalItem/>
                    <WishListModalItem/>
                    <WishListModalItem/>
                    <WishListModalItem/>

                    <WishListButtonViewAll/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default WishListModal;