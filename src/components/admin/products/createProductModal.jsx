import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../css/style.css";
import TextEditor from '../tinymce/tinymce';
import { TiDeleteOutline } from "react-icons/ti";
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import uploadToCloudinary from '../../../utils/cloudinaryUpload';


const CreateProductModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]); 

    const [product, setProduct] = useState({
        title: "",
        brandID: "",
        categoriesID: "",
        codeProduct: "",
        position: "",
        featured: false,
        status: true,
    });

    const [variants, setVariants] = useState([
        {
            color: "",
            size: "",
            price: "",
            discount: "",
            specialPrice: "",
            status: true,
            images: [],
        },
    ]);

    const addVariant = () => {
        setVariants([
            ...variants,
            {
                color: "",
                size: "",
                price: "",
                discount: "",
                specialPrice: "",
                status: true,
                images: [],
            },
        ]);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleProductChange = (field, value) => {
        setProduct({ ...product, [field]: value });
    };
    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const handleImageChange = async (index, event) => {
        const files = Array.from(event.target.files);
        const newVariants = [...variants];
    
        for (let file of files) {
            
            const imageUrl = await uploadToCloudinary(file);
            if (imageUrl) {
                // Thêm ảnh vào danh sách images của biến thể
                newVariants[index].images = [...newVariants[index].images, imageUrl];
            }
        }
    
        setVariants(newVariants);
        
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productcategoriesRes, brandsRes] = await Promise.all([
                    laravelAPI.get("/api/ListCategory"),
                    laravelAPI.get("/api/ListBrands"),
                ]);
                setCategories(productcategoriesRes.data || []); 
                setBrands(brandsRes.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục hoặc thương hiệu:", error);
                setCategories([]);
                setBrands([]);
            }
        };

        fetchData();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.title || !product.codeProduct || !product.brandID || !product.categoriesID) {
            toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm.");
            return;
        }
        
        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("brandID", parseInt(product.brandID) || null);
        formData.append("categoriesID", parseInt(product.categoriesID) || null);
        formData.append("codeProduct", product.codeProduct);
        formData.append("position", product.position);
        formData.append("description", content1);
        formData.append("descriptionPromotion", content2);
        formData.append("featured", product.featured ? 1 : 0);
        formData.append("status", product.status ? 1 : 0);

        variants.forEach((variant, index) => {

            if (!variant.color || !variant.size || !variant.price) {
                toast.error(`Vui lòng nhập đầy đủ thông tin cho biến thể ${index + 1}`);
                return;
            }

            formData.append(`variants[${index}][color]`, variant.color);
            formData.append(`variants[${index}][size]`, variant.size);
            formData.append(`variants[${index}][price]`, variant.price);
            formData.append(`variants[${index}][discount]`, variant.discount);
            formData.append(`variants[${index}][specialPrice]`, variant.specialPrice);
            formData.append(`variants[${index}][status]`, variant.status ? 1 : 0);
        
            variant.images.forEach((imageUrl, imgIndex) => {
                formData.append(`variants[${index}][images][${imgIndex}]`, imageUrl);
            });
            
        });

        // Kiểm tra dữ liệu trước khi gửi
        console.log("Dữ liệu gửi lên:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const response = await laravelAPI.post("/api/products", formData);

            console.log("Success:", response);
            toast.success("Tạo sản phẩm thành công.");

            setProduct({
                title: "",
                brandID: "",
                categoriesID: "",
                codeProduct: "",
                position: "",
                featured: false,
                status: true,
            });

            setVariants([
                {
                    color: "",
                    size: "",
                    price: "",
                    discount: "",
                    specialPrice: "",
                    status: true,
                    images: [],
                },
            ]);

            setContent1("");
            setContent2("");

            handleClose();
        } catch (error) {
            console.error("Error:", error.response?.data);
            toast.error("Tạo sản phẩm không thành công.");
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm mới sản phẩm
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName='custom-modal-size'
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form className='mt-[20px]' onSubmit={handleSubmit}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới sản phẩm</h2>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên sản phẩm</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={product.title}
                                    onChange={(e) => handleProductChange("title", e.target.value)}
                                    type="text"
                                    name='title'
                                    placeholder="Tên sản phẩm"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="feature"
                                    id="feature1"
                                    checked={product.featured}
                                    onChange={() => handleProductChange("featured", true)}
                                />
                                <label htmlFor="feature1" className='text-[16px] text-[#000000] font-[500]'>Nổi bật</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="feature"
                                    id="feature2"
                                    checked={!product.featured}
                                    onChange={() => handleProductChange("featured", false)}
                                />
                                <label htmlFor="feature2" className='text-[16px] text-[#000000] font-[500]'>Không nổi bật</label>
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px] flex flex-col'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Danh mục sản phẩm</label>
                            <select
                                value={product.categoriesID || ""}
                                onChange={(e) => handleProductChange("categoriesID", e.target.value)}
                                name="categoriesID"
                                id=""
                                className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
                                <option value="">Chọn danh mục</option>
                                {categories && categories.length > 0 ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Không có danh mục nào</option>
                                )}
                            </select>
                        </div>
                        <div className='px-[10px] mb-[20px] flex flex-col'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Thương hiệu</label>
                            <select
                                value={product.brandID || ""}
                                onChange={(e) => handleProductChange("brandID", e.target.value)}
                                name="brandID"
                                id=""
                                className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
                                <option value="">Chọn Thương hiệu</option>
                                {brands && brands.length > 0 ? (
                                    brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Không có thương hiệu nào</option>
                                )}

                            </select>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mã sản phẩm</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={product.codeProduct}
                                    onChange={(e) => handleProductChange("codeProduct", e.target.value)}
                                    type="text"
                                    name='codeProduct'
                                    placeholder="Mã sản phẩm"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vị trí</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={product.position}
                                    onChange={(e) => handleProductChange("position", e.target.value)}
                                    type="number"
                                    name='position'
                                    placeholder="Tự Động tăng"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Biến thể sản phẩm</label>
                            <div>
                                {variants.map((variant, index) => (
                                    <div
                                        key={index}
                                    // className='flex items-center my-[20px] border flex-wrap gap-[20px]'
                                    >

                                        <div className='flex items-center justify-between my-[20px]'>
                                            <div className='w-[49%]'>
                                                <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Màu sắc</label>
                                                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Màu sắc"
                                                        value={variant.color}
                                                        name='color'
                                                        onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                                                        required
                                                        className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                                                </div>
                                            </div>
                                            <div className='w-[49%]'>
                                                <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Kích thước</label>
                                                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Kích thước"
                                                        value={variant.size}
                                                        name='size'
                                                        onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                                                        required
                                                        className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between my-[20px]'>
                                            <div className='w-[49%]'>
                                                <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Giá</label>
                                                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                                    <input
                                                        type="number"
                                                        placeholder="Giá"
                                                        name='price'
                                                        value={variant.price}
                                                        onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                                                        required
                                                        className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                                                </div>
                                            </div>
                                            <div className='w-[49%]'>
                                                <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Phần trăm giảm giá</label>
                                                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                                    <input
                                                        type="number"
                                                        placeholder="% giảm giá"
                                                        value={variant.discount}
                                                        name='discount'
                                                        onChange={(e) => handleVariantChange(index, "discount", e.target.value)}
                                                        required
                                                        className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full mb-[20px]'>
                                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Giá khuyến mãi</label>
                                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                                <input
                                                    type="number"
                                                    placeholder="Giá khuyến mãi"
                                                    value={variant.specialPrice}
                                                    name='specialPrice'
                                                    onChange={(e) => handleVariantChange(index, "specialPrice", e.target.value)}
                                                    required
                                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                                            </div>
                                        </div>
                                        <div className='w-full mb-[20px]'>
                                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Hình ảnh</label>
                                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                    placeholder="Hình ảnh"
                                                    onChange={(e) => handleImageChange(index, e)}
                                                    required
                                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                                            </div>
                                        </div>
                                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                                            <div className='flex items-center gap-[8px]'>
                                                <input
                                                    type="radio"
                                                    name={`statusProductVariant-${index}`}
                                                    id={`statusProductVariant-${index}`}
                                                    checked={variant.status === true}
                                                    onChange={() => handleVariantChange(index, "status", true)}
                                                />
                                                <label htmlFor={`statusProductVariant-${index}`} className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
                                            </div>
                                            <div className='flex items-center gap-[8px]'>
                                                <input
                                                    type="radio"
                                                    name={`statusProductVariant-${index}`}
                                                    id={`statusProductVariant1-${index}`}
                                                    checked={variant.status === false}
                                                    onChange={() => handleVariantChange(index, "status", false)}
                                                />
                                                <label htmlFor={`statusProductVariant1-${index}`} className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center mb-[20px]'>
                                            <button
                                                onClick={() => removeVariant(index)}
                                                className='font-[700] text-[30px] text-[#000000] hover:text-main '
                                            ><TiDeleteOutline /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addVariant}
                                className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main'
                            >
                                Thêm biến thể </button>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả sản phẩm</label>
                            <TextEditor initialValue="" onChange={setContent1} height={800} name="description"/>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Ưu đãi</label>
                            <TextEditor initialValue="" onChange={setContent2} height={500}  name="descriptionPromotion"/>
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct"
                                    checked={product.status}
                                    onChange={() => handleProductChange("status", true)}
                                />
                                <label htmlFor="statusProduct" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct1"
                                    checked={!product.status} onChange={() => handleProductChange("status", false)}
                                />
                                <label htmlFor="statusProduct1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
                            </div>
                        </div>
                        <div className=''>
                            <button className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main' type='submit'>Tạo mới</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateProductModal;