import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../css/style.css";
import TextEditor from '../tinymce/tinymce';
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import uploadToCloudinary from '../../../utils/cloudinaryUpload';


const CreateProductModal = (props) => {
    const {showCreateProductModal, setShowCreateProductModal, fetchProducts } = props;

    const handleClose = () => setShowCreateProductModal(false);
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]); 
    const [sizeToAdd, setSizeToAdd] = useState(""); 
    const [product, setProduct] = useState({
        title: "",
        brandID: "",
        categoriesID: "",
        codeProduct: "",
        position: "",
        featured: false,
        status: true,
    });

    // thêm biến thể
    const [variants, setVariants] = useState({});
    const addVariant = (color) => {
        if (!color || variants[color]) return;
        setVariants((prev) => ({
            ...prev,
            [color]: prev[color] || {
                price: "",
                discount: "",
                specialPrice: "",
                images: [],
                sizes: {},
                status: true,
            },
        }));
    };

    // thêm kích thước
    const addSize = (event) => {
        event.preventDefault();
        if (sizeToAdd && !selectedSizes.includes(sizeToAdd)) {
            setSelectedSizes([...selectedSizes, sizeToAdd]);
            setSizeToAdd(""); // Reset dropdown về mặc định
        }
    };
    // thêm đổi hình ảnh
    const handleProductChange = (field, value) => {
        setProduct({ ...product, [field]: value });
    };
    
    // cập nhật hình ảnh theo từng màu
    // const handleVariantChange = (color, field, value) => {
    //     setVariants((prev) => ({
    //         ...prev,
    //         [color]: {
    //             ...prev[color],
    //             [field]: value,
    //         },
    //     }));
    // };
    const handleVariantChange = (color, field, value) => {
        setVariants(prev => {
            const updatedVariants = { ...prev };
            updatedVariants[color] = {
                ...updatedVariants[color],
                [field]: value,
            };
            if (field === "price" || field === "discount") {
                const price = parseFloat(updatedVariants[color].price) || 0;
                const discount = parseFloat(updatedVariants[color].discount) || 0;
                updatedVariants[color].specialPrice = price * (1 - discount / 100);
            }
            return updatedVariants;
        });
    };
    // thêm kích thước và số lượng cho màu sắc
    const handleSizeChange = (color, size, stock) => {
        if (!color || !size) return;
        setVariants((prev) => ({
            ...prev,
            [color]: {
                ...prev[color],
                sizes: {
                    ...prev[color].sizes,
                    [size]: parseInt(stock),
                },
            },
        }));
    }
    // up hình ảnh lên cloud
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
        setVariants((prev) => {
            const updatedVariants = { ...prev };
            delete updatedVariants[color];
            return updatedVariants;
        });
    };
    // danh sách thương hiệu và danh mục
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productcategoriesRes, brandsRes] = await Promise.all([
                    laravelAPI.get("/api/admin/ListCategory"),
                    laravelAPI.get("/api/admin/ListBrands"),
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

    // hàm gọi color
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/listColor");
                setColors(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách màu sắc:", error);
            }
        };
        fetchColors();
    }, []);

    // hàm gọi size
    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/listSize");
                setSizes(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách kích thước:", error);
            }
        };
        fetchSizes();
    }, []);

    // hàm submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.title || !product.codeProduct || !product.brandID || !product.categoriesID) {
            toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm.");
            return;
        }
        const formData = {
            ...product,
            position: product.position,
            brandID: parseInt(product.brandID) || null,
            categoriesID: parseInt(product.categoriesID) || null,
            featured: product.featured ? 1 : 0,
            status: product.status ? 1 : 0,
            description: content1,
            descriptionPromotion: content2,
            variants: Object.keys(variants).map((color) => ({
                price: parseFloat(variants[color]?.price) || 0,
                discount: parseFloat(variants[color]?.discount) || 0,
                specialPrice: parseFloat(variants[color]?.specialPrice) || 0,
                images: variants[color]?.images || [],
                colors: [parseInt(color)],
                status: variants[color]?.status ? 1 : 0,
                sizes: Object.keys(variants[color]?.sizes || {}).map((size) => ({
                    sizeID: parseInt(size),
                    stock: variants[color].sizes[size],
                })),
            })),
        };
        // console.log("Dữ liệu gửi lên:", JSON.stringify(formData, null, 2));
        try {
            const response = await laravelAPI.post("/api/admin/products", formData);
            // console.log("check:", response);
            toast.success(response.message);
            setProduct({
                title: "",
                brandID: "",
                categoriesID: "",
                codeProduct: "",
                position: "",
                featured: false,
                status: true,
            });

            setVariants({});
            setContent1("");
            setContent2("");
            handleClose();
            fetchProducts();
        } catch (error) {
            console.error("Lỗi khi gửi API:", error);
            toast.error("Tạo sản phẩm không thành công.");
        }
    };


    return (
        <>

            <Modal
                show={showCreateProductModal}
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
                                    value={product?.title}
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
                                    checked={product?.featured}
                                    onChange={() => handleProductChange("featured", true)}
                                />
                                <label htmlFor="feature1" className='text-[16px] text-[#000000] font-[500]'>Nổi bật</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="feature"
                                    id="feature2"
                                    checked={!product?.featured}
                                    onChange={() => handleProductChange("featured", false)}
                                />
                                <label htmlFor="feature2" className='text-[16px] text-[#000000] font-[500]'>Không nổi bật</label>
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px] flex flex-col'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Danh mục sản phẩm</label>
                            <select
                                value={product?.categoriesID || ""}
                                onChange={(e) => handleProductChange("categoriesID", e.target.value)}
                                name="categoriesID"
                                id=""
                                className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
                                <option value="">Chọn danh mục</option>
                                {categories && categories.length > 0 ? (
                                    categories?.map((category) => (
                                        <option key={category?.id} value={category?.id}>
                                            {category?.name}
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
                                value={product?.brandID || ""}
                                onChange={(e) => handleProductChange("brandID", e.target.value)}
                                name="brandID"
                                id=""
                                className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
                                <option value="">Chọn Thương hiệu</option>
                                {brands && brands.length > 0 ? (
                                    brands?.map((brand) => (
                                        <option key={brand?.id} value={brand?.id}>
                                            {brand?.name}
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
                                    value={product?.codeProduct}
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
                                    value={product?.position}
                                    onChange={(e) => handleProductChange("position", e.target.value)}
                                    type="number"
                                    name='position'
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
                                            onClick={addSize}
                                            className="text-[16px] text-[#ffffff] font-[400] py-[8px] px-[20px] rounded-[8px] border !boder-main bg-main "
                                        >Thêm</button>
                                    </div>
                                    <div className="mt-[20px]">
                                        {selectedSizes?.map((size, index) => (
                                            <div key={index} className="flex items-center gap-[40px] border-b pb-[10px] mb-[10px]">
                                                <span className='font-[700] text-[16px] text-[#000000]'>Kích thước: {sizes.find(s => s.id === parseInt(size))?.name}</span>
                                                <div className='flex items-center gap-[10px] '>
                                                    <label className='font-[700] text-[16px] text-[#000000]'> Số lượng:</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Số lượng"
                                                        className="border !border-[#000000] w-[300px] text-[16px] font-[600] px-[10px] py-[8px] rounded-[8px] text-[#000000]"
                                                        onChange={(e) => handleSizeChange(color, size, e.target.value)}
                                                        min="0"
                                                        max="1000"
                                                    />
                                                </div>

                                                <button
                                                    onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}
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
                            <TextEditor initialValue="" onChange={setContent1} height={800} name="description" />
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Ưu đãi</label>
                            <TextEditor initialValue="" onChange={setContent2} height={500} name="descriptionPromotion" />
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct"
                                    checked={product?.status}
                                    onChange={() => handleProductChange("status", true)}
                                />
                                <label htmlFor="statusProduct" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct1"
                                    checked={!product?.status} onChange={() => handleProductChange("status", false)}
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

// const CreateProductModal = () => {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const [content1, setContent1] = useState('');
//     const [content2, setContent2] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [colors, setColors] = useState([]);
//     const [sizes, setSizes] = useState([]);
//     const [selectedSizes, setSelectedSizes] = useState([]); // Lưu các kích thước đã chọn
//     const [selectedColors, setSelectedColors] = useState([]);
//     const [selectedVariants, setSelectedVariants] = useState([]);
//     const [sizeToAdd, setSizeToAdd] = useState(""); // Lưu giá trị đang chọn trong dropdown
//     const [product, setProduct] = useState({
//         title: "",
//         brandID: "",
//         categoriesID: "",
//         codeProduct: "",
//         position: "",
//         featured: false,
//         status: true,
//     });

//     const [variants, setVariants] = useState({});

//     const addVariant = () => {
//         setSelectedVariants([
//             ...selectedVariants,
//             { colorID: "", price: "", discount: "", specialPrice: "", images: [], sizes: {} }
//         ]);
//     };
//     const updateVariant = (index, field, value) => {
//         const updatedVariants = [...selectedVariants];
//         updatedVariants[index][field] = value;
//         setSelectedVariants(updatedVariants);
//     };
//     const addSizeToVariant = (index, sizeID) => {
//         if (!sizeID) return;

//         const updatedVariants = [...selectedVariants];
//         if (!updatedVariants[index].sizes[sizeID]) {
//             updatedVariants[index].sizes[sizeID] = 0; // Mặc định số lượng là 0
//         }
//         setSelectedVariants(updatedVariants);
//     };
//     const removeSizeFromVariant = (variantIndex, sizeID) => {
//         const updatedVariants = [...selectedVariants];
//         delete updatedVariants[variantIndex].sizes[sizeID];
//         setSelectedVariants(updatedVariants);
//     };
//     const removeVariant = (index) => {
//         const updatedVariants = [...selectedVariants];
//         updatedVariants.splice(index, 1);
//         setSelectedVariants(updatedVariants);
//     };

//     const handleProductChange = (field, value) => {
//         setProduct({ ...product, [field]: value });
//     };
//     // cập nhật hình ảnh theo từng màu
//     const handleVariantChange = (color, field, value) => {
//         setVariants((prev) => ({
//             ...prev,
//             [color]: {
//                 ...prev[color],
//                 [field]: value,
//             },
//         }));
//     };
//     // thêm kích thước và số lượng cho màu sắc
//     const handleSizeChange = (color, size, stock) => {
//         if (!color || !size) return;
//         setVariants((prev) => ({
//             ...prev,
//             [color]: {
//                 ...prev[color],
//                 sizes: {
//                     ...prev[color].sizes,
//                     [size]: parseInt(stock),
//                 },
//             },
//         }));
//     }
//     const handleImageChange = async (color, event) => {
//         const files = Array.from(event.target.files);

//         const uploadedImages = await Promise.all(
//             files.map(file => uploadToCloudinary(file))
//         );

//         setVariants((prev) => ({
//             ...prev,
//             [color]: {
//                 ...prev[color],
//                 images: [...prev[color].images, ...uploadedImages],
//             },
//         }));
//     };
//     const updateSizeStock = (variantIndex, sizeID, stock) => {
//         const updatedVariants = [...selectedVariants];
//         updatedVariants[variantIndex].sizes[sizeID] = parseInt(stock, 10) || 0;
//         setSelectedVariants(updatedVariants);
//     };

//     // xóa màu sắc
//     // danh sách thương hiệu và danh mục
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [productcategoriesRes, brandsRes] = await Promise.all([
//                     laravelAPI.get("/api/admin/ListCategory"),
//                     laravelAPI.get("/api/admin/ListBrands"),
//                 ]);
//                 setCategories(productcategoriesRes.data || []);
//                 setBrands(brandsRes.data || []);
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh mục hoặc thương hiệu:", error);
//                 setCategories([]);
//                 setBrands([]);
//             }
//         };

//         fetchData();
//     }, []);

//     // hàm gọi color
//     useEffect(() => {
//         const fetchColors = async () => {
//             try {
//                 const response = await laravelAPI.get("/api/admin/listColor");
//                 setColors(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh sách màu sắc:", error);
//             }
//         };
//         fetchColors();
//     }, []);

//     // hàm gọi size
//     useEffect(() => {
//         const fetchSizes = async () => {
//             try {
//                 const response = await laravelAPI.get("/api/admin/listSize");
//                 setSizes(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh sách kích thước:", error);
//             }
//         };
//         fetchSizes();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!product.title || !product.codeProduct || !product.brandID || !product.categoriesID) {
//             toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm.");
//             return;
//         }
//         const formData = {
//             ...product,
//             position: product.position,
//             brandID: parseInt(product.brandID) || null,
//             categoriesID: parseInt(product.categoriesID) || null,
//             featured: product.featured ? 1 : 0,
//             status: product.status ? 1 : 0,
//             description: content1,
//             descriptionPromotion: content2,
//             variants: Object.keys(variants).map((color) => ({
//                 price: parseFloat(variants[color]?.price) || 0,
//                 discount: parseFloat(variants[color]?.discount) || 0,
//                 specialPrice: parseFloat(variants[color]?.specialPrice) || 0,
//                 images: variants[color]?.images || [],
//                 colors: [parseInt(color)],
//                 status: variants[color]?.status ? 1 : 0,
//                 sizes: Object.keys(variants[color]?.sizes || {}).map((size) => ({
//                     sizeID: parseInt(size),
//                     stock: variants[color].sizes[size],
//                 })),
//             })),
//         };
//         console.log("Dữ liệu gửi lên:", JSON.stringify(formData, null, 2));
//         try {
//             const response = await laravelAPI.post("/api/admin/products", formData);
//             console.log("check:", response);
//             toast.success("Tạo sản phẩm thành công!");
//             setProduct({
//                 title: "",
//                 brandID: "",
//                 categoriesID: "",
//                 codeProduct: "",
//                 position: "",
//                 featured: false,
//                 status: true,
//             });

//             setVariants({});
//             setContent1("");
//             setContent2("");
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi gửi API:", error);
//             toast.error("Tạo sản phẩm không thành công.");
//         }
//     };


//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Thêm mới sản phẩm
//             </Button>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//                 dialogClassName='custom-modal-size'
//             >
//                 <Modal.Header closeButton>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form className='mt-[20px]' onSubmit={handleSubmit}>
//                         <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới sản phẩm</h2>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên sản phẩm</label>
//                             <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                 <input
//                                     value={product.title}
//                                     onChange={(e) => handleProductChange("title", e.target.value)}
//                                     type="text"
//                                     name='title'
//                                     placeholder="Tên sản phẩm"
//                                     className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="feature"
//                                     id="feature1"
//                                     checked={product.featured}
//                                     onChange={() => handleProductChange("featured", true)}
//                                 />
//                                 <label htmlFor="feature1" className='text-[16px] text-[#000000] font-[500]'>Nổi bật</label>
//                             </div>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="feature"
//                                     id="feature2"
//                                     checked={!product.featured}
//                                     onChange={() => handleProductChange("featured", false)}
//                                 />
//                                 <label htmlFor="feature2" className='text-[16px] text-[#000000] font-[500]'>Không nổi bật</label>
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex flex-col'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Danh mục sản phẩm</label>
//                             <select
//                                 value={product.categoriesID || ""}
//                                 onChange={(e) => handleProductChange("categoriesID", e.target.value)}
//                                 name="categoriesID"
//                                 id=""
//                                 className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
//                                 <option value="">Chọn danh mục</option>
//                                 {categories && categories.length > 0 ? (
//                                     categories.map((category) => (
//                                         <option key={category.id} value={category.id}>
//                                             {category.name}
//                                         </option>
//                                     ))
//                                 ) : (
//                                     <option value="">Không có danh mục nào</option>
//                                 )}
//                             </select>
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex flex-col'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Thương hiệu</label>
//                             <select
//                                 value={product.brandID || ""}
//                                 onChange={(e) => handleProductChange("brandID", e.target.value)}
//                                 name="brandID"
//                                 id=""
//                                 className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
//                                 <option value="">Chọn Thương hiệu</option>
//                                 {brands && brands.length > 0 ? (
//                                     brands.map((brand) => (
//                                         <option key={brand.id} value={brand.id}>
//                                             {brand.name}
//                                         </option>
//                                     ))
//                                 ) : (
//                                     <option value="">Không có thương hiệu nào</option>
//                                 )}

//                             </select>
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mã sản phẩm</label>
//                             <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                 <input
//                                     value={product.codeProduct}
//                                     onChange={(e) => handleProductChange("codeProduct", e.target.value)}
//                                     type="text"
//                                     name='codeProduct'
//                                     placeholder="Mã sản phẩm"
//                                     className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vị trí</label>
//                             <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                 <input
//                                     value={product.position}
//                                     onChange={(e) => handleProductChange("position", e.target.value)}
//                                     type="number"
//                                     name='position'
//                                     placeholder="Tự Động tăng"
//                                     className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Biến thể sản phẩm</label>

//                             {/* 🔵 Chọn Màu Sắc */}


//                             {/* 🎨 Hiển Thị Biến Thể Theo Màu */}
//                             {selectedVariants.map((variant, index) => (
//                                 <div key={index} className="border p-4 rounded-lg mb-4">
//                                     {/* Chọn màu sắc */}
//                                     <label className="font-bold">Màu sắc:</label>
//                                     <select
//                                         value={variant.colorID}
//                                         onChange={(e) => updateVariant(index, "colorID", e.target.value)}
//                                         className="border px-3 py-2 rounded w-full"
//                                     >
//                                         <option value="">Chọn màu</option>
//                                         {colors.map((color) => (
//                                             <option key={color.id} value={color.id}>{color.name}</option>
//                                         ))}
//                                     </select>

//                                     {/* Nhập giá, giảm giá, giá khuyến mãi */}
//                                     <div className="flex gap-4 mt-3">
//                                         <input
//                                             type="number"
//                                             placeholder="Giá"
//                                             value={variant.price}
//                                             onChange={(e) => updateVariant(index, "price", e.target.value)}
//                                             className="border px-3 py-2 rounded w-full"
//                                         />
//                                         <input
//                                             type="number"
//                                             placeholder="Giảm giá (%)"
//                                             value={variant.discount}
//                                             onChange={(e) => updateVariant(index, "discount", e.target.value)}
//                                             className="border px-3 py-2 rounded w-full"
//                                         />
//                                         <input
//                                             type="number"
//                                             placeholder="Giá khuyến mãi"
//                                             value={variant.specialPrice}
//                                             onChange={(e) => updateVariant(index, "specialPrice", e.target.value)}
//                                             className="border px-3 py-2 rounded w-full"
//                                         />
//                                     </div>

//                                     {/* 📏 Chọn kích thước */}
//                                     <div className="mt-3">
//                                         <label className="font-bold">Chọn kích thước:</label>
//                                         <select
//                                             onChange={(e) => addSizeToVariant(index, e.target.value)}
//                                             className="border px-3 py-2 rounded w-full"
//                                         >
//                                             <option value="">Chọn kích thước</option>
//                                             {sizes.map((size) => (
//                                                 <option key={size.id} value={size.id}>{size.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     {/* 📋 Danh sách kích thước đã chọn */}
//                                     <div className="mt-2">
//                                         {Object.keys(variant.sizes).map((sizeID) => (
//                                             <div key={sizeID} className="flex items-center gap-2 border p-2 rounded">
//                                                 <span>{sizes.find(s => s.id === parseInt(sizeID))?.name}</span>
//                                                 <input
//                                                     type="number"
//                                                     placeholder="Số lượng"
//                                                     value={variant.sizes[sizeID]}
//                                                     onChange={(e) => updateSizeStock(index, sizeID, e.target.value)}
//                                                     className="border px-2 py-1 rounded w-16"
//                                                 />
//                                                 <button
//                                                     onClick={() => removeSizeFromVariant(index, sizeID)}
//                                                     className="bg-red-500 text-white px-2 py-1 rounded"
//                                                 >
//                                                     Xóa
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* 🖼️ Tải ảnh lên */}
//                                     <div className="mt-3">
//                                         <input
//                                             type="file"
//                                             multiple
//                                             accept="image/*"
//                                             className="mt-3"
//                                             onChange={(e) => updateVariant(index, "images", Array.from(e.target.files))}
//                                         />
//                                     </div>

//                                     {/* ❌ Xóa màu */}
//                                     <button
//                                         onClick={() => removeVariant(index)}
//                                         className="bg-red-500 text-white px-3 py-1 rounded mt-3"
//                                     >
//                                         Xóa màu này
//                                     </button>
//                                 </div>
//                             ))}

//                             {/* ➕ Nút thêm màu sắc mới */}
//                             <button
//                                 onClick={addVariant}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//                             >
//                                 + Thêm màu sắc
//                             </button>

//                         </div>

//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả sản phẩm</label>
//                             <TextEditor initialValue="" onChange={setContent1} height={800} name="description" />
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Ưu đãi</label>
//                             <TextEditor initialValue="" onChange={setContent2} height={500} name="descriptionPromotion" />
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="status"
//                                     id="statusProduct"
//                                     checked={product.status}
//                                     onChange={() => handleProductChange("status", true)}
//                                 />
//                                 <label htmlFor="statusProduct" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
//                             </div>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="status"
//                                     id="statusProduct1"
//                                     checked={!product.status} onChange={() => handleProductChange("status", false)}
//                                 />
//                                 <label htmlFor="statusProduct1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
//                             </div>
//                         </div>
//                         <div className=''>
//                             <button className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main' type='submit'>Tạo mới</button>
//                         </div>
//                     </form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// }



export default CreateProductModal;

// import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import "../css/style.css";
// import TextEditor from '../tinymce/tinymce';
// import { TiDeleteOutline } from "react-icons/ti";
// import { laravelAPI } from "../../../utils/axiosCustom";
// import { toast } from "react-toastify";
// import uploadToCloudinary from '../../../utils/cloudinaryUpload';


// const CreateProductModal = () => {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const [content1, setContent1] = useState('');
//     const [content2, setContent2] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [colors, setColors] = useState([]);
//     const [sizes, setSizes] = useState([]);

//     const [product, setProduct] = useState({
//         title: "",
//         brandID: "",
//         categoriesID: "",
//         codeProduct: "",
//         position: "",
//         featured: false,
//         status: true,
//     });

//     const [variants, setVariants] = useState([
//         {
//             color: "",
//             size: "",
//             price: "",
//             discount: "",
//             specialPrice: "",
//             stock: "",
//             status: true,
//             images: [],
//         },
//     ]);

//     const addVariant = () => {
//         setVariants([
//             ...variants,
//             {
//                 color: "",
//                 size: "",
//                 price: "",
//                 discount: "",
//                 specialPrice: "",
//                 stock: "",
//                 status: true,
//                 images: [],
//             },
//         ]);
//     };

//     const removeVariant = (index) => {
//         setVariants(variants.filter((_, i) => i !== index));
//     };

//     const handleProductChange = (field, value) => {
//         setProduct({ ...product, [field]: value });
//     };
//     const handleVariantChange = (index, field, value) => {
//         const newVariants = [...variants];
//         // newVariants[index][field] = value;
//         if (field === "size" || field === "color") {
//             newVariants[index][field] = value ? parseInt(value) : null;
//         } else {
//             newVariants[index][field] = value;
//         }
//         setVariants(newVariants);
//     };

//     const handleImageChange = async (index, event) => {
//         const files = Array.from(event.target.files);
//         const newVariants = [...variants];

//         for (let file of files) {

//             const imageUrl = await uploadToCloudinary(file);
//             if (imageUrl) {
//                 // Thêm ảnh vào danh sách images của biến thể
//                 newVariants[index].images = [...newVariants[index].images, imageUrl];
//             }
//         }

//         setVariants(newVariants);

//     };
//     // danh sách thương hiệu và danh mục
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [productcategoriesRes, brandsRes] = await Promise.all([
//                     laravelAPI.get("/api/admin/ListCategory"),
//                     laravelAPI.get("/api/admin/ListBrands"),
//                 ]);
//                 setCategories(productcategoriesRes.data || []);
//                 setBrands(brandsRes.data || []);
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh mục hoặc thương hiệu:", error);
//                 setCategories([]);
//                 setBrands([]);
//             }
//         };

//         fetchData();
//     }, []);

//     // hàm gọi color
//     useEffect(() => {
//         const fetchColors = async () => {
//             try {
//                 const response = await laravelAPI.get("/api/admin/listColor");
//                 setColors(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh sách màu sắc:", error);
//             }
//         };
//         fetchColors();
//     }, []);

//     // hàm gọi size
//     useEffect(() => {
//         const fetchSizes = async () => {
//             try {
//                 const response = await laravelAPI.get("/api/admin/listSize");
//                 setSizes(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh sách kích thước:", error);
//             }
//         };
//         fetchSizes();
//     }, []);

//     // hàm submit form
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!product.title || !product.codeProduct || !product.brandID || !product.categoriesID) {
//             toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm.");
//             return;
//         }

//         // const formData = new FormData();
//         // formData.append("title", product.title);
//         // formData.append("brandID", parseInt(product.brandID) || null);
//         // formData.append("categoriesID", parseInt(product.categoriesID) || null);
//         // formData.append("codeProduct", product.codeProduct);
//         // formData.append("position", product.position);
//         // formData.append("description", content1);
//         // formData.append("descriptionPromotion", content2);
//         // formData.append("featured", product.featured ? 1 : 0);
//         // formData.append("status", product.status ? 1 : 0);

//         // variants.forEach((variant, index) => {

//         //     if (!variant.color || !variant.size || !variant.price) {
//         //         toast.error(`Vui lòng nhập đầy đủ thông tin cho biến thể ${index + 1}`);
//         //         return;
//         //     }

//         //     formData.append(`variants[${index}][color]`, variant.color);
//         //     formData.append(`variants[${index}][size]`, variant.size);
//         //     formData.append(`variants[${index}][price]`, variant.price);
//         //     formData.append(`variants[${index}][stock]`, variant.stock);
//         //     formData.append(`variants[${index}][discount]`, variant.discount);
//         //     formData.append(`variants[${index}][specialPrice]`, variant.specialPrice);
//         //     formData.append(`variants[${index}][status]`, variant.status ? 1 : 0);

//         //     variant.images.forEach((imageUrl, imgIndex) => {
//         //         formData.append(`variants[${index}][images][${imgIndex}]`, imageUrl);
//         //     });

//         // });

//         // Kiểm tra dữ liệu trước khi gửi
//         // console.log("Dữ liệu gửi lên:");
//         // for (let [key, value] of formData.entries()) {
//         //     console.log(`${key}:`, value);
//         // }

//         const formData = {
//             title: product.title,
//             brandID: parseInt(product.brandID) || null,
//             categoriesID: parseInt(product.categoriesID) || null,
//             codeProduct: product.codeProduct,
//             position: product.position,
//             description: content1,
//             descriptionPromotion: content2,
//             featured: product.featured ? 1 : 0,
//             status: product.status ? 1 : 0,
//             variants: variants.map((variant) => ({
//                 price: parseFloat(variant.price),
//                 stock: parseInt(variant.stock) || 0,
//                 discount: variant.discount ? parseFloat(variant.discount) : 0,
//                 specialPrice: variant.specialPrice ? parseFloat(variant.specialPrice) : 0,
//                 status: variant.status ? 1 : 0,
//                 sizes: variant.size ? [parseInt(variant.size)] : [],
//                 colors: variant.color ? [parseInt(variant.color)] : [],
//                 images: variant.images,
//             })),
//         };
//         console.log("Dữ liệu gửi lên:", JSON.stringify(formData, null, 2));

//         try {
//             const response = await laravelAPI.post("/api/admin/products", formData);

//             console.log("check:", response);
//             toast.success("Tạo sản phẩm thành công.");

//             setProduct({
//                 title: "",
//                 brandID: "",
//                 categoriesID: "",
//                 codeProduct: "",
//                 position: "",
//                 featured: false,
//                 status: true,
//             });

//             setVariants([
//                 {
//                     color: "",
//                     size: "",
//                     price: "",
//                     discount: "",
//                     specialPrice: "",
//                     stock: "",
//                     status: true,
//                     images: [],
//                 },
//             ]);

//             setContent1("");
//             setContent2("");

//             handleClose();
//         } catch (error) {
//             console.error("Error:", error.response?.data);
//             toast.error("Tạo sản phẩm không thành công.");
//         }
//     };

//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Thêm mới sản phẩm
//             </Button>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//                 dialogClassName='custom-modal-size'
//             >
//                 <Modal.Header closeButton>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form className='mt-[20px]' onSubmit={handleSubmit}>
//                         <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới sản phẩm</h2>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên sản phẩm</label>
//                             <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                 <input
//                                     value={product.title}
//                                     onChange={(e) => handleProductChange("title", e.target.value)}
//                                     type="text"
//                                     name='title'
//                                     placeholder="Tên sản phẩm"
//                                     className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="feature"
//                                     id="feature1"
//                                     checked={product.featured}
//                                     onChange={() => handleProductChange("featured", true)}
//                                 />
//                                 <label htmlFor="feature1" className='text-[16px] text-[#000000] font-[500]'>Nổi bật</label>
//                             </div>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="feature"
//                                     id="feature2"
//                                     checked={!product.featured}
//                                     onChange={() => handleProductChange("featured", false)}
//                                 />
//                                 <label htmlFor="feature2" className='text-[16px] text-[#000000] font-[500]'>Không nổi bật</label>
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex flex-col'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Danh mục sản phẩm</label>
//                             <select
//                                 value={product.categoriesID || ""}
//                                 onChange={(e) => handleProductChange("categoriesID", e.target.value)}
//                                 name="categoriesID"
//                                 id=""
//                                 className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
//                                 <option value="">Chọn danh mục</option>
//                                 {categories && categories.length > 0 ? (
//                                     categories.map((category) => (
//                                         <option key={category.id} value={category.id}>
//                                             {category.name}
//                                         </option>
//                                     ))
//                                 ) : (
//                                     <option value="">Không có danh mục nào</option>
//                                 )}
//                             </select>
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex flex-col'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Thương hiệu</label>
//                             <select
//                                 value={product.brandID || ""}
//                                 onChange={(e) => handleProductChange("brandID", e.target.value)}
//                                 name="brandID"
//                                 id=""
//                                 className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
//                                 <option value="">Chọn Thương hiệu</option>
//                                 {brands && brands.length > 0 ? (
//                                     brands.map((brand) => (
//                                         <option key={brand.id} value={brand.id}>
//                                             {brand.name}
//                                         </option>
//                                     ))
//                                 ) : (
//                                     <option value="">Không có thương hiệu nào</option>
//                                 )}

//                             </select>
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mã sản phẩm</label>
//                             <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                 <input
//                                     value={product.codeProduct}
//                                     onChange={(e) => handleProductChange("codeProduct", e.target.value)}
//                                     type="text"
//                                     name='codeProduct'
//                                     placeholder="Mã sản phẩm"
//                                     className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vị trí</label>
//                             <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                 <input
//                                     value={product.position}
//                                     onChange={(e) => handleProductChange("position", e.target.value)}
//                                     type="number"
//                                     name='position'
//                                     placeholder="Tự Động tăng"
//                                     className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
//                             </div>
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Biến thể sản phẩm</label>
//                             <div>
//                                 {variants.map((variant, index) => (
//                                     <div
//                                         key={index}
//                                     // className='flex items-center my-[20px] border flex-wrap gap-[20px]'
//                                     >

//                                         <div className='flex items-center justify-between my-[20px]'>
//                                             <div className='w-[49%]'>
//                                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Màu sắc</label>
//                                                 <select
//                                                     value={variants[index].color || ""}
//                                                     onChange={(e) => handleVariantChange(index, "color", e.target.value)}
//                                                     name="colorID"
//                                                     id=""
//                                                     className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
//                                                     <option value="">Chọn màu sắc</option>
//                                                     {colors && colors.length > 0 ? (
//                                                         colors.map((color) => (
//                                                             <option key={color.id} value={color.id}>
//                                                                 {color.name}
//                                                             </option>
//                                                         ))
//                                                     ) : (
//                                                         <option value="">Không có màu sắc nào</option>
//                                                     )}

//                                                 </select>
//                                             </div>
//                                             <div className='w-[49%]'>
//                                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Kích thước</label>
//                                                 <select
//                                                     value={variants[index].size || ""}
//                                                     onChange={(e) => handleVariantChange(index, "size", e.target.value)}
//                                                     name="sizeID"
//                                                     id=""
//                                                     className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
//                                                     <option value="">Chọn kích thước</option>
//                                                     {sizes && sizes.length > 0 ? (
//                                                         sizes.map((size) => (
//                                                             <option key={size.id} value={size.id}>
//                                                                 {size.name}
//                                                             </option>
//                                                         ))
//                                                     ) : (
//                                                         <option value="">Không có kích thước nào</option>
//                                                     )}

//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className='flex items-center justify-between my-[20px]'>
//                                             <div className='w-[49%]'>
//                                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Giá</label>
//                                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                                     <input
//                                                         type="number"
//                                                         placeholder="Giá"
//                                                         name='price'
//                                                         value={variant.price}
//                                                         onChange={(e) => handleVariantChange(index, "price", e.target.value)}
//                                                         required
//                                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                                 </div>
//                                             </div>
//                                             <div className='w-[49%]'>
//                                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Phần trăm giảm giá</label>
//                                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                                     <input
//                                                         type="number"
//                                                         placeholder="% giảm giá"
//                                                         value={variant.discount}
//                                                         name='discount'
//                                                         onChange={(e) => handleVariantChange(index, "discount", e.target.value)}
//                                                         required
//                                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='flex items-center justify-between my-[20px]'>
//                                             <div className='w-[49%] mb-[20px]'>
//                                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Giá khuyến mãi</label>
//                                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                                     <input
//                                                         type="number"
//                                                         placeholder="Giá khuyến mãi"
//                                                         value={variant.specialPrice}
//                                                         name='specialPrice'
//                                                         onChange={(e) => handleVariantChange(index, "specialPrice", e.target.value)}
//                                                         required
//                                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                                 </div>
//                                             </div>
//                                             <div className='w-[49%] mb-[20px]'>
//                                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Số lượng</label>
//                                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                                     <input
//                                                         type="number"
//                                                         placeholder="Số lượng"
//                                                         value={variant.stock}
//                                                         onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
//                                                         name="stock"
//                                                         required
//                                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='w-full mb-[20px]'>
//                                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Hình ảnh</label>
//                                             <div className="mb-[20px] w-full">
//                                                 <input
//                                                     type="file"
//                                                     multiple
//                                                     accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
//                                                     placeholder="Hình ảnh"
//                                                     onChange={(e) => handleImageChange(index, e)}
//                                                     required
//                                                     // className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full"
//                                                     className="form-control"
//                                                     />
//                                             </div>
//                                         </div>
//                                         <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
//                                             <div className='flex items-center gap-[8px]'>
//                                                 <input
//                                                     type="radio"
//                                                     name={`statusProductVariant-${index}`}
//                                                     id={`statusProductVariant-${index}`}
//                                                     checked={variant.status === true}
//                                                     onChange={() => handleVariantChange(index, "status", true)}
//                                                 />
//                                                 <label htmlFor={`statusProductVariant-${index}`} className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
//                                             </div>
//                                             <div className='flex items-center gap-[8px]'>
//                                                 <input
//                                                     type="radio"
//                                                     name={`statusProductVariant-${index}`}
//                                                     id={`statusProductVariant1-${index}`}
//                                                     checked={variant.status === false}
//                                                     onChange={() => handleVariantChange(index, "status", false)}
//                                                 />
//                                                 <label htmlFor={`statusProductVariant1-${index}`} className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
//                                             </div>
//                                         </div>
//                                         <div className='flex items-center justify-center mb-[20px]'>
//                                             <button
//                                                 onClick={() => removeVariant(index)}
//                                                 className='font-[700] text-[30px] text-[#000000] hover:text-main '
//                                             ><TiDeleteOutline /></button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <button
//                                 onClick={addVariant}
//                                 className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main'
//                             >
//                                 Thêm biến thể </button>
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả sản phẩm</label>
//                             <TextEditor initialValue="" onChange={setContent1} height={800} name="description" />
//                         </div>
//                         <div className='px-[10px] mb-[20px]'>
//                             <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Ưu đãi</label>
//                             <TextEditor initialValue="" onChange={setContent2} height={500} name="descriptionPromotion" />
//                         </div>
//                         <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="status"
//                                     id="statusProduct"
//                                     checked={product.status}
//                                     onChange={() => handleProductChange("status", true)}
//                                 />
//                                 <label htmlFor="statusProduct" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
//                             </div>
//                             <div className='flex items-center gap-[8px]'>
//                                 <input
//                                     type="radio"
//                                     name="status"
//                                     id="statusProduct1"
//                                     checked={!product.status} onChange={() => handleProductChange("status", false)}
//                                 />
//                                 <label htmlFor="statusProduct1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
//                             </div>
//                         </div>
//                         <div className=''>
//                             <button className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main' type='submit'>Tạo mới</button>
//                         </div>
//                     </form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// }

// export default CreateProductModal;