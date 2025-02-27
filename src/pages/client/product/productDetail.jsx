import { initTabs } from 'david-ai';
import ImageSlider from "../../../components/client/productDetail/imageSlider";
import ProductInfo from "../../../components/client/productDetail/ProductInfo";
import ProductOptions from "../../../components/client/productDetail/ProductOptions";
import PromotionBox from "../../../components/client/productDetail/PromotionBox";
import Description from "../../../components/client/productDetail/description";
import ListStore from "../../../components/client/productDetail/listStore";
import Rating from "../../../components/client/productDetail/rating";
import CommentProduct from "../../../components/client/productDetail/comment";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
// import { productDetailApi } from '../../../services/client/productApiService';
import { nodeAPI } from '../../../utils/axiosCustom';
import AccordionProduct from '../../../components/client/products/accordionCatetegory';
import Breadcrumb from '../../../components/client/breadcrumbs/Breadcrumb';
import { UserContext } from '../../../middleware/UserContext';
import { toast } from 'react-toastify';
import AddToCartForm from '../../../components/client/productDetail/AddToCartForm';

initTabs();


const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await nodeAPI.get(`products/detail/${slug}`);
            // console.log(response)
            // console.log("API Response:", response.data);
            // console.log(response.product)
            if (response.product) {
                setProduct(response.product);
                setSelectedColor(response.product?.variants?.[0]?.color || null);
                setSelectedSize(response.product?.variants?.[0]?.size?.[0] || null);
            }
        };
        fetchProduct();
    }, [slug]);


    const handleAddToCart = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Vui lòng đăng nhập!")
            navigate("/login")
            return;
        }
        if (!product) {
            toast.error("Sản phẩm không tồn tại!")
            return;
        }

        const selectedVariant = product.variants.find(
            (variant) =>
                variant.color === selectedColor &&
                (Array.isArray(variant.size) ? variant.size.includes(selectedSize) : variant.size === selectedSize)
        );

        if (!selectedVariant) {
            toast.error("Vui lòng chọn màu sắc và kích thước!")
            return;
        }
        // const cartItem = {
        //     id: selectedVariant.id,
        //     name: product.name,
        //     color: selectedColor,
        //     size: selectedSize,
        //     price: selectedVariant.specialPrice ?? product.price,
        //     image: selectedVariant.images?.[0]?.image,
        //     quantity: 1
        // };
        // console.log("Thêm vào giỏ hàng:", cartItem);

        try {
            const response = await nodeAPI.post(
                "/carts/cartPost",
                {
                    productsvariantId: selectedVariant.id,
                    quantity
                }
            );
            console.log(response)
            if (response.code === "success") {
                toast.success(response.message);
                setQuantity(1);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi thêm vào giỏ hàng!:", error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumb />
            <div className="py-[40px] product-detail">
                <div className="container mx-auto px-[16px]">
                    <div className="flex justify-between gap-[20px]">
                        <div className="w-[77%]">
                            <div className="flex justify-between w-full">
                                <div className="w-[46%] h-[605px]">
                                    {/* <ImageSlider /> */}
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
                                    {/* <form className="pb-[10px] " onSubmit={(e) => e.preventDefault()}>
                                        <InputNumber
                                            quantity={quantity}
                                            onChange={(value) => setQuantity(value)}
                                        />
                                        <div className="flex justify-between items-center py-[12px]">
                                            <button
                                                // min={1}
                                                // value={quantity}
                                                onClick={handleAddToCart}
                                                // onChange={(e) => setQuantity(Number(e.target.value))}
                                                className="w-[58%] bg-[#E95221] border !border-[#E95221] hover:bg-transparent py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#E95221] font-[700] uppercase">
                                                Thêm vào giỏ hàng
                                            </button>
                                            <button className="w-[40%] bg-[#ffb916] hover:bg-transparent border !border-[#ffb916] py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#ffb916] font-[700] uppercase">
                                                Mua ngay
                                            </button>
                                        </div>
                                        <div className="">
                                            <button className="w-[100%] bg-[#008FE5] hover:bg-transparent border !border-[#008FE5] py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#008FE5] font-[700]">
                                                Tư vấn qua zalo
                                            </button>
                                        </div>
                                    </form> */}
                                </div>
                            </div>
                            <div className="w-full mt-[60px]">
                                <Description description={product?.description} />

                            </div>
                            <Rating />
                            <CommentProduct />

                        </div>
                        <div className="w-[22%] flex flex-col gap-[40px]">
                            <ListStore />
                            <AccordionProduct />
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <></>
    );
};

export default ProductDetail;
