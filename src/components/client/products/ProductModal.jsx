import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ImageSlider from "../../../components/client/productDetail/imageSlider";
import ProductInfo from "../../../components/client/productDetail/ProductInfo";
import ProductOptions from "../../../components/client/productDetail/ProductOptions";
import PromotionBox from "../../../components/client/productDetail/PromotionBox";
import AddToCartForm from "../../../components/client/productDetail/AddToCartForm";
import Description from "../../../components/client/productDetail/description";
import Rating from "../../../components/client/productDetail/rating";
import CommentProduct from "../../../components/client/productDetail/comment";


const ProductModal = (props) => {

    const {show, setShow} = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal 
            show={show} 
            onHide={handleClose}
            keyboard={false}
            size='xl'
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <div className="py-[60px] product-detail">
            <div className="container mx-auto px-[16px]">
                <div className="flex justify-between gap-[20px]">
                    <div className="w-[100%]">
                        <div className="flex justify-between w-full">
                            <div className="w-[45%] h-[605px]">
                                <ImageSlider/>
                            </div>
                            <div className="w-[53%] px-[10px]">
                                <ProductInfo/>
                                <ProductOptions/>
                                <PromotionBox/>
                                <AddToCartForm/>
                            </div>
                        </div>
                        <div className="w-full mt-[60px] border">
                            <Description/>
                        </div>
                        <Rating/>
                        <CommentProduct/>
                    </div>
                </div>
            </div>
        </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductModal;