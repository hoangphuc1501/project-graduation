import { initTabs } from 'david-ai';
import ImageSlider from "../../../components/client/productDetail/imageSlider";
// import ProductInfo from "../../../components/client/productDetail/ProductInfo";
// import ProductOptions from "../../../components/client/productDetail/ProductOptions";
import PromotionBox from "../../../components/client/productDetail/PromotionBox";
import Description from "../../../components/client/productDetail/description";
import ListStore from "../../../components/client/productDetail/listStore";
import CommentProduct from "../../../components/client/productDetail/comment";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
// import { productDetailApi } from '../../../services/client/productApiService';
import { laravelAPI } from '../../../utils/axiosCustom';
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
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { token, user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // call api show chi tiết sản phẩm
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true); // Bắt đầu loading

                const response = await laravelAPI.get(`/api/products/${slug}`);
                if (response.product) {
                    setProduct(response.product);

                    // Lấy danh sách biến thể
                    const variants = response.product.variants ?? [];
                    if (variants.length > 0) {
                        const firstVariant = variants[0]; // Chọn biến thể đầu tiên
                        setSelectedColor(firstVariant.colorId);
                        setSelectedSize(firstVariant.sizes?.[0]?.id ?? null);
                        setSelectedVariant(firstVariant);
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error("Lỗi tải sản phẩm:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    // Tìm biến thể theo màu sắc đã chọn
    // const selectedVariant = product?.variants?.find(
    //     (variant) => variant.color === selectedColor
    // );
    const handleSelectColor = (colorId) => {
        setSelectedColor(colorId);

        // Tìm tất cả biến thể có màu tương ứng
        const variantsByColor = product?.variants?.filter((v) => v.colorId === colorId) ?? [];

        if (variantsByColor.length > 0) {
            setSelectedVariant(variantsByColor[0]); // Chọn biến thể đầu tiên có màu đó
            setSelectedSize(variantsByColor[0]?.sizes?.[0]?.id ?? null); // Reset size về size đầu tiên
        } else {
            setSelectedVariant(null);
            setSelectedSize(null);
        }
    };
    const handleSelectSize = (sizeId) => {
        setSelectedSize(sizeId);

        // Kiểm tra xem có biến thể nào có màu & size này không
        const variant = product?.variants?.find(
            (v) => v.colorId === selectedColor && v.sizes.some((s) => s.id === sizeId)
        );

        if (variant) {
            setSelectedVariant(variant);
        }
    };

    // thêm vào giỏ hàng
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
        const selectedVariant = product?.variants?.find(
            (variant) =>
                variant.colorId === selectedColor &&
                variant.sizes.some((size) => size.id === selectedSize)
        );
        // kiểm tra
        if (!selectedVariant) {
            toast.error("Vui lòng chọn màu sắc và kích thước!");
            return;
        }
        // console.log("Selected Variant:", selectedVariant);
        // console.log("Gửi dữ liệu lên API:", {
        //     productVariantId: selectedVariant?.id ?? null,
        //     size: selectedSize ?? null,
        //     color: selectedColor ?? null,
        //     quantity: quantity
        // });
        const cartData = {
            productVariantId: selectedVariant.id,
            sizeId: selectedSize,
            colorId: selectedColor,
            quantity: quantity
        };
        // console.log("Đang gửi dữ liệu giỏ hàng:", cartData);

        try {
            const response = await laravelAPI.post("/api/addToCart", cartData);
            // console.log("cehck add to cart", response)
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

    // thêm vào yêu thích
    const handleAddToFavorites = async () => {
        if (!token) {
            toast.error("Vui lòng đăng nhập!");
            navigate("/login");
            return;
        }

        if (!product) {
            toast.error("Sản phẩm không tồn tại!");
            return;
        }

        const selectedVariant = product?.variants?.find(
            (variant) =>
                variant.colorId === selectedColor &&
                variant.sizes.some((size) => size.id === selectedSize)
        );

        if (!selectedVariant) {
            toast.error("Vui lòng chọn màu sắc và kích thước!");
            return;
        }

        const favoriteData = {
            productVariantId: selectedVariant.id,
            sizeId: selectedSize,
            colorId: selectedColor
        };

        // console.log("Đang gửi dữ liệu yêu thích:", favoriteData);

        try {
            const response = await laravelAPI.post("/api/favorites/add", favoriteData);
            // console.log("check thêm yêu thích", response)
            if (response.code === "success") {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi thêm vào danh sách yêu thích:", error);
            toast.error("Lỗi server, vui lòng thử lại!");
        }
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl font-bold text-gray-500">Đang tải sản phẩm...</p>
                </div>
            ) : (
                <>
                    <Breadcrumb />
                    <div className="py-[40px] product-detail">
                        <div className="container mx-auto px-[16px]">
                            <div className="flex justify-between gap-[20px]">
                                <div className="w-[77%]">
                                    <div className="flex justify-between w-full">
                                        <div className="w-[46%] h-[605px]">

                                            {/* <ImageSlider
                                        images={
                                            product?.variants?.find((variant) => variant.color === selectedColor)?.images ?? []
                                        }
                                    /> */}
                                            <ImageSlider images={selectedVariant?.images ?? []} />
                                        </div>
                                        <div className="w-[53%] px-[10px]">
                                            {/* <ProductInfo product={product} selectedVariant={selectedVariant} /> */}
                                            <div className="pb-[20px] border-b border-[#ddd]">
                                                <h2 className="text-[26px] font-[700] text-[#333E44] pb-[12px]">
                                                    {product?.title}
                                                </h2>
                                                <div className="flex items-center gap-x-[20px] pb-[20px]">
                                                    <div className="flex items-center gap-[4px]">
                                                        <span className="text-[16px] font-[500] text-[#212529]">
                                                            Mã:
                                                        </span>
                                                        <span className="text-[14px] font-[500] text-main">
                                                            {product?.codeProduct}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-[4px]">
                                                        <span className="text-[16px] font-[500] text-[#212529]">
                                                            Thương hiệu:
                                                        </span>
                                                        <span className="text-[14px] font-[500] text-main">
                                                            {product?.brand?.name ?? "Không xác định"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-[4px]">
                                                        <span className="text-[16px] font-[500] text-[#212529]">
                                                            Tình trạng:
                                                        </span>
                                                        <span className="text-[14px] font-[500] text-main">
                                                            {selectedVariant?.stock > 0 ? "Còn hàng" : "Hết hàng"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-[30px]">
                                                    <span className="text-[#e8002d] text-[22px] font-[700]">
                                                        {selectedVariant?.specialPrice?.toLocaleString()} <sup>đ</sup>
                                                    </span>
                                                    <span className="text-[16px] font-[400] text-[#acacac]">
                                                        Giá niêm yết:
                                                        <strike className="ml-[4px]">
                                                            {selectedVariant?.price?.toLocaleString()} <sup>đ</sup>
                                                        </strike>
                                                    </span>
                                                    <span className="text-[14px] font-[400] text-[#e8002d]">
                                                        (-{selectedVariant?.discount}%)
                                                    </span>
                                                </div>
                                            </div>
                                            {/* <ProductOptions
                                        product={product}
                                        selectedColor={selectedColor}
                                        // setSelectedColor={setSelectedColor}
                                        setSelectedColor={handleSelectColor} // Fix lỗi chọn màu
                                        selectedSize={selectedSize}
                                        setSelectedSize={handleSelectSize} // Fix lỗi chọn size
                                        // setSelectedSize={setSelectedSize}
                                        selectedVariant={selectedVariant}
                                    /> */}
                                            <div className="pt-[20px]">
                                                {/* Chọn màu sắc */}
                                                <div className="pb-[20px]">
                                                    <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                                                        Chọn [Màu sắc]
                                                    </h3>
                                                    <div className="flex items-center flex-wrap gap-[15px]">
                                                        {product?.variants?.map((variant, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => handleSelectColor(variant.colorId)}
                                                                className={`py-[10px] px-[20px] border rounded-[12px] flex items-center gap-[8px] 
                ${selectedColor === variant.colorId ? "!border-[#e95211] bg-[#fffbf5]" : ""}`}
                                                            >
                                                                <img src={variant.images?.[0] ?? "/default-image.jpg"} alt={variant?.colorName} className="w-[40px] h-[40px]" />
                                                                <div className='flex items-center gap-[10px] flex-col'>
                                                                    <span className="text-[14px] font-[500] text-[#333333]">{variant?.colorName}</span>
                                                                    <div className="text-[14px] text-[#d0021b] font-[500]">
                                                                        {variant?.specialPrice?.toLocaleString() ?? "0"} <sup>đ</sup>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Chọn size */}
                                                <div className="pb-[20px]">
                                                    <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                                                        Chọn [Size]
                                                    </h3>
                                                    <div className="flex items-center gap-[8px] flex-wrap border-[#000000]">
                                                        {(selectedVariant?.sizes ?? []).map((size, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => handleSelectSize(size.id)}
                                                                className={`border px-[12px] py-[8px] rounded-[6px] text-[14px] text-[#333333] font-[500] 
                ${selectedSize === size.id ? "!border-[#e95211] bg-[#fffbf5]" : ""}`}
                                                            >
                                                                {size?.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <PromotionBox content={product?.descriptionPromotion} />

                                            <AddToCartForm
                                                quantity={quantity}
                                                setQuantity={setQuantity}
                                                handleAddToCart={handleAddToCart}
                                                handleAddToFavorites={handleAddToFavorites}
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

                                    {/* {product && product.id && user && <CommentProduct productId={product.id} user={user} />} */}
                                    {product && product?.id && <CommentProduct productId={product?.id} user={user} />}

                                </div>
                                <div className="w-[22%] flex flex-col gap-[40px]">
                                    <ListStore />
                                    <AccordionProduct />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetail;
