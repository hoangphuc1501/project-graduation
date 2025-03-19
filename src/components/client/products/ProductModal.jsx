
import Modal from 'react-bootstrap/Modal';
import ImageSlider from "../../../components/client/productDetail/imageSlider";
import ProductInfo from "../../../components/client/productDetail/ProductInfo";
import ProductOptions from "../../../components/client/productDetail/ProductOptions";
import PromotionBox from "../../../components/client/productDetail/PromotionBox";
import AddToCartForm from "../../../components/client/productDetail/AddToCartForm";
import Description from "../../../components/client/productDetail/description";
import CommentProduct from "../../../components/client/productDetail/comment";
import { nodeAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../middleware/UserContext';


const ProductModal = (props) => {

    // const { show, setShow } = props;
    // const handleClose = () => setShow(false);

    // const { slug } = useParams();
    // const [product, setProduct] = useState(null);
    // const [selectedColor, setSelectedColor] = useState(null);
    // const [selectedSize, setSelectedSize] = useState(null);
    // const [quantity, setQuantity] = useState(1);
    // const { token } = useContext(UserContext);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const response = await nodeAPI.get(`products/detail/${slug}`);
    //         // console.log(response)
    //         // console.log("API Response:", response.data);
    //         // console.log(response.product)
    //         if (response.product) {
    //             setProduct(response.product);
    //             setSelectedColor(response.product?.variants?.[0]?.color || null);
    //             setSelectedSize(response.product?.variants?.[0]?.size?.[0] || null);
    //         }
    //     };
    //     fetchProduct();
    // }, [slug]);


    // const handleAddToCart = async (e) => {
    //     e.preventDefault();

    //     if (!token) {
    //         toast.error("Vui lòng đăng nhập!")
    //         navigate("/login")
    //         return;
    //     }
    //     if (!product) {
    //         toast.error("Sản phẩm không tồn tại!")
    //         return;
    //     }

    //     const selectedVariant = product.variants.find(
    //         (variant) =>
    //             variant.color === selectedColor &&
    //             (Array.isArray(variant.size) ? variant.size.includes(selectedSize) : variant.size === selectedSize)
    //     );

    //     if (!selectedVariant) {
    //         toast.error("Vui lòng chọn màu sắc và kích thước!")
    //         return;
    //     }

    //     try {
    //         const response = await nodeAPI.post(
    //             "/carts/cartPost",
    //             {
    //                 productsvariantId: selectedVariant.id,
    //                 quantity
    //             }
    //         );
    //         console.log(response)
    //         if (response.code === "success") {
    //             toast.success(response.message);
    //             setQuantity(1);
    //         } else {
    //             toast.error(response.message);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi thêm vào giỏ hàng!:", error);
    //         toast.error(error.message);
    //     }
    // };

    return (
        <>
            {/* <Modal
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
                                            <ImageSlider
                                                images={
                                                    product?.variants?.find((variant) => variant.color === selectedColor)?.images ?? []
                                                }
                                            />
                                        </div>
                                        <div className="w-[53%] px-[10px]">
                                            <ProductInfo product={product} />

                                            <ProductOptions
                                                product={product}
                                                selectedColor={selectedColor}
                                                setSelectedColor={setSelectedColor}
                                                selectedSize={selectedSize}
                                                setSelectedSize={setSelectedSize}
                                            />
                                            <PromotionBox content={product?.descriptionPromotion} />

                                            <AddToCartForm
                                                quantity={quantity}
                                                setQuantity={setQuantity}
                                                handleAddToCart={handleAddToCart}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full mt-[60px] border">
                                    <Description description={product?.description} />
                                    </div>
                                    <Rating />
                                    <CommentProduct />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}
        </>
    );
}

export default ProductModal;