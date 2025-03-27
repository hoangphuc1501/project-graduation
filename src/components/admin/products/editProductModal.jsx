import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../css/style.css";
import TextEditor from '../tinymce/tinymce';
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import uploadToCloudinary from '../../../utils/cloudinaryUpload';



const EditProductModal = ({ showUpdateProduct, setShowUpdateProduct, productData, fetchProducts }) => {
    // const {showUpdateProduct, setShowUpdateProduct} = props;
    const handleClose = () => setShowUpdateProduct(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState({});
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [sizeToAdd, setSizeToAdd] = useState("");
    const [product, setProduct] = useState({
        title: "",
        brandID: "",
        categoriesID: "",
        codeProduct: "",
        position: "",
        description: "",
        descriptionPromotion: "",
        featured: false,
        status: true,
    });

    // lấy danh sách
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [colorRes, sizeRes, categoryRes, brandRes] = await Promise.all([
                    laravelAPI.get("/api/admin/listColor"),
                    laravelAPI.get("/api/admin/listSize"),
                    laravelAPI.get("/api/admin/ListCategory"),
                    laravelAPI.get("/api/admin/ListBrands"),
                ]);

                setColors(colorRes.data || []);
                setSizes(sizeRes.data || []);
                setCategories(categoryRes.data || []);
                setBrands(brandRes.data || []);
            } catch (err) {
                toast.error("Lỗi khi tải dữ liệu ban đầu!");
            }
        };

        fetchInitialData();
    }, []);

    // load dữ liệu
    useEffect(() => {
        if (productData) {
            // console.log("===> productData.variants:", productData.variants);
    
            setProduct({
                title: productData.title || "",
                brandID: productData.brandID || "",
                categoriesID: productData.categoriesID || "",
                codeProduct: productData.codeProduct || "",
                position: productData.position || "",
                description: productData.description || "",
                descriptionPromotion: productData.descriptionPromotion || "",
                featured: Boolean(productData.featured),
                status: Boolean(productData.status),
            });
    
            const variantMap = {};
            const sizeMap = {};
    
            productData.variants?.forEach((variant) => {
                const variationOptions = variant.variation_options || [];
    
                variationOptions.forEach((opt) => {
                    const colorId = opt.colorId;
                    const sizeId = opt.sizeId;
                    const stock = opt.stock;
                    const colorKey = String(colorId);
    
                    if (!variantMap[colorKey]) {
                        variantMap[colorKey] = {
                            price: variant.price,
                            discount: variant.discount,
                            specialPrice: variant.specialPrice,
                            images: (variant.images || []).map(img => img.image),
                            status: variant.status,
                            sizes: {},
                        };
                        sizeMap[colorKey] = [];
                    }
    
                    variantMap[colorKey].sizes[sizeId] = stock;
    
                    if (!sizeMap[colorKey].includes(String(sizeId))) {
                        sizeMap[colorKey].push(String(sizeId));
                    }
                });
            });
    
            setVariants(variantMap);
            setSelectedSizes(sizeMap);
        }
    }, [productData]);
    
    
    // thêm biến thể
    const addVariant = (color) => {
        if (!color || variants[color]) return;
        setVariants(prev => ({
            ...prev,
            [color]: {
                price: "",
                discount: "",
                specialPrice: "",
                images: [],
                sizes: {},
                status: true,
            },
        }));
        setSelectedSizes(prev => ({
            ...prev,
            [color]: [],
        }));
    };

    // thêm size
    const addSize = (color) => {
        if (!color || !sizeToAdd) return;
        setSelectedSizes(prev => {
            const currentSizes = prev[color] || [];
            if (currentSizes.includes(sizeToAdd)) return prev; // tránh thêm trùng
            return {
                ...prev,
                [color]: [...currentSizes, sizeToAdd],
            };
        });
        setSizeToAdd("");
    };
    // hàm thay đổi size
    const handleSizeChange = (color, size, stock) => {
        setVariants(prev => ({
            ...prev,
            [color]: {
                ...prev[color],
                sizes: {
                    ...prev[color].sizes,
                    [size]: parseInt(stock),
                },
            },
        }));
    };
    // hàm thay đổi biến thể
    const handleVariantChange = (color, field, value) => {
        setVariants((prev) => {
            const updated = { ...prev };
    
            // Tự động tính specialPrice nếu chỉnh giá hoặc giảm giá
            if (field === "price" || field === "discount") {
                const price = field === "price" ? parseFloat(value) : parseFloat(updated[color].price) || 0;
                const discount = field === "discount" ? parseFloat(value) : parseFloat(updated[color].discount) || 0;
                updated[color] = {
                    ...updated[color],
                    [field]: value,
                    specialPrice: price * (1 - discount / 100),
                };
            } else {
                updated[color] = {
                    ...updated[color],
                    [field]: value,
                };
            }
    
            return updated;
        });
    };
    // hàm thay đổi hình ảnh
    const handleImageChange = async (color, event) => {
        const files = Array.from(event.target.files);
        const uploadedImages = await Promise.all(
            files.map(file => uploadToCloudinary(file))
        );
        setVariants((prev) => ({
            ...prev,
            [color]: {
                ...prev[color],
                images: [...prev[color].images, ...uploadedImages],
            },
        }));
    };
     // xóa màu sắc
    const removeVariant = (color) => {
        setVariants(prev => {
            const updated = { ...prev };
            delete updated[color];
            return updated;
        });
        setSelectedSizes(prev => {
            const updated = { ...prev };
            delete updated[color];
            return updated;
        });
    };
    // hàm thay đổi dữ liệu sản phẩm
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleProductChange = (field, value) => {
        setProduct({ ...product, [field]: value });
    };

    // useEffect(() => {
    //     console.log("Dữ liệu formData sau khi cập nhật:", productData);
    // }, [productData]);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        if (!productData || !productData.id) {
            toast.error("Không tìm thấy sản phẩm để cập nhật!");
            return;
        }
        const updatedProduct = {
            ...product,
            status: product.status ? 1 : 0,
            featured: product.featured ? 1 : 0,
            variants: Object.keys(variants).map(color => ({
                price: parseFloat(variants[color].price) || 0,
                discount: parseFloat(variants[color].discount) || 0,
                specialPrice: parseFloat(variants[color].specialPrice) || 0,
                status: variants[color].status ? 1 : 0,
                images: variants[color].images || [],
                colors: [parseInt(color)],
                sizes: (selectedSizes[color] || []).map(size => ({
                    sizeID: parseInt(size),
                    stock: variants[color].sizes[size] || 0,
                }))
            }))
        };

        try {
            const response = await laravelAPI.patch(`/api/admin/products/${productData.id}`, updatedProduct);
            // console.log(response)
            if (response.code === "success") {
                toast.success(response.message);
                setShowUpdateProduct(false);
                fetchProducts()
            } else {
                toast.error("Có lỗi xảy ra!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            toast.error("Không thể cập nhật sản phẩm.");
        }
    };


    return (
        <>
            <Modal
                show={showUpdateProduct}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName='custom-modal-size'
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form className='mt-[20px]' onSubmit={handleUpdateProduct}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Cập nhật sản phẩm</h2>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên sản phẩm</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Tên sản phẩm"
                                    value={product.title}
                                    onChange={handleChange}
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="feature"
                                    id="feature1"

                                    checked={product.featured === true}
                                    onChange={() => setProduct({ ...product, featured: true })}
                                />
                                <label htmlFor="feature1" className='text-[16px] text-[#000000] font-[500]'>Nổi bật</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="feature"
                                    id="feature2"
                                    checked={product.featured === false}
                                    onChange={() => setProduct({ ...product, featured: false })}
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
                                    name="codeProduct"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Mã sản phẩm"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vị trí</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={product.position}
                                    min={1}
                                    name='position'
                                    onChange={(e) => setProduct({ ...product, position: e.target.value })}
                                    type="number"
                                    placeholder="Tự Động tăng"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Biến thể sản phẩm</label>

                            {/*  Chọn Màu Sắc */}
                            <div className="mb-[20px]">
                                <select
                                    className='border !border-[#000000] py-[8px] px-[10px] w-full rounded-[8px] text-[16px] text-[#000000] font-[600] outline-none'
                                    value=""
                                    onChange={(e) => addVariant(e.target.value)}>
                                    <option value="">Chọn màu sắc</option>
                                    {colors?.map(color => (
                                        <option key={color?.id} value={color?.id}>{color?.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/*Hiển Thị Biến Thể Theo Màu */}
                            {Object.keys(variants).map((color) => (
                                <div key={color} className="mt-[20px] shadow-[0_0_5px_#dddddd] p-[20px] rounded-[8px]">
                                    <h3 className='text-[16px] font-[700] text-[#000000] pb-[10px]'>Màu: {colors?.find(c => c.id === parseInt(color))?.name}</h3>

                                    {/*  Giá - Giảm Giá - Giá KM */}
                                    <div className='flex items-center justify-between my-[20px]'>
                                        <div className='w-[49%]'>
                                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Giá</label>
                                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                                <input
                                                    type="number"
                                                    placeholder="Giá"
                                                    name='price'
                                                    value={variants[color].price} onChange={(e) => handleVariantChange(color, "price", e.target.value)}
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
                                                    value={variants[color].discount} onChange={(e) => handleVariantChange(color, "discount", e.target.value)}
                                                    name='discount'
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
                                                value={variants[color].specialPrice} onChange={(e) => handleVariantChange(color, "specialPrice", e.target.value)}
                                                name='specialPrice'
                                                required
                                                className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                                        </div>
                                    </div>
                                    {/* Ảnh */}
                                    <div className="mb-[20px]">
                                        <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Hình ảnh</label>
                                        <input
                                            className='form-control'
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(color, e)} />
                                        <div className="flex items-center gap-[30px] my-[20px]">
                                            {variants[color].images.map((img, index) => (
                                                <img key={index} src={img} alt="Ảnh sản phẩm" width="100" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Chọn Kích Thước & Số Lượng */}
                                    <div className="flex items-center gap-[10px]">
                                        <select
                                            value={sizeToAdd}
                                            onChange={(e) => setSizeToAdd(e.target.value)}
                                            className="border !border-[#000000] px-[10px] py-[8px] rounded-[8px] text-[16px] text-[#000000] font-[600] outline-none"
                                        >
                                            <option value="">Chọn kích thước</option>
                                            {sizes?.map((size) => (
                                                <option key={size?.id} value={size?.id}>{size?.name}</option>
                                            ))}
                                        </select>

                                        <button
                                            type='button'
                                            onClick={() => addSize(color)}
                                            className="text-[16px] text-[#ffffff] font-[400] py-[8px] px-[20px] rounded-[8px] border !boder-main bg-main "
                                        >Thêm</button>
                                    </div>
                                    <div className="mt-[20px]">
                                    {(selectedSizes[color] || []).map((size, index) => (
                                            <div key={index} className="flex items-center gap-[40px] border-b pb-[10px] mb-[10px]">
                                                <span className='font-[700] text-[16px] text-[#000000]'>Kích thước: {sizes.find(s => s.id === parseInt(size))?.name}</span>
                                                <div className='flex items-center gap-[10px] '>
                                                    <label className='font-[700] text-[16px] text-[#000000]'> Số lượng:</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Số lượng"
                                                        value={variants[color]?.sizes[size] || 0} 
                                                        className="border !border-[#000000] w-[300px] text-[16px] font-[600] px-[10px] py-[8px] rounded-[8px] text-[#000000]"
                                                        onChange={(e) => handleSizeChange(color, size, e.target.value)}
                                                        min="0"
                                                        max="1000"
                                                    />
                                                </div>

                                                <button
                                                type='button'
                                                    onClick={() =>
                                                        setSelectedSizes(prev => ({
                                                            ...prev,
                                                            [color]: prev[color].filter(s => s !== size)
                                                        }))
                                                    }
                                                    className="bg-[#FF0000] text-[#ffffff] px-[10px] py-[8px] rounded-[8px] text-[16px] font-[400]"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Xóa Màu */}
                                    <button className="w-full bg-[#FF0000] text-[#ffffff] px-[10px] py-[8px] rounded-[8px] text-[16px] font-[400] mt-[20px]" onClick={() => removeVariant(color)}>Xóa Màu</button>
                                </div>
                            ))}

                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả sản phẩm</label>
                            <TextEditor
                                initialValue={product.description}
                                onChange={(value) => setProduct({ ...product, description: value })}
                                name="description" />
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Ưu đãi</label>
                            <TextEditor
                                initialValue={product.descriptionPromotion}
                                onChange={(value) => setProduct({ ...product, descriptionPromotion: value })}
                                name="descriptionPromotion" />
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct"
                                    // value="true"
                                    checked={product.status === true}
                                    onChange={() => handleProductChange("status", true)}
                                />
                                <label htmlFor="statusProduct" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct1"
                                    // value="false"
                                    checked={product.status === false}
                                    onChange={() => handleProductChange("status", false)}
                                />
                                <label htmlFor="statusProduct1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
                            </div>
                        </div>
                        <div className=''>
                            <button
                                className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main'
                                type='submit'
                            >Cập nhật
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditProductModal;