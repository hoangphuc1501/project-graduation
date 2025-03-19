import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../css/style.css";
import TextEditor from '../tinymce/tinymce';
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";



const EditProductModal = ({ showUpdateProduct, setShowUpdateProduct, productData }) => {
    // const {showUpdateProduct, setShowUpdateProduct} = props;
    const handleClose = () => setShowUpdateProduct(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

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

     // Cập nhật dữ liệu khi mở modal
    useEffect(() => {
        if (productData) {
            console.log("Dữ liệu từ API:", productData);
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
        }
    }, [productData]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleProductChange = (field, value) => {
        setProduct({ ...product, [field]: value });
    };

    useEffect(() => {
        console.log("Dữ liệu formData sau khi cập nhật:", productData);
    }, [productData]);

    // const updatedProduct = {
    //     ...product,
    //     status: product.status ? 1 : 0,
    //     featured: product.featured ? 1 : 0,
    // };
    // console.log("Dữ liệu gửi lên API:", updatedProduct);
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
        };

        try {
            const response = await laravelAPI.patch(`/api/admin/products/${productData.id}`, updatedProduct);
            console.log(response)
            if (response.code === "success") {
                toast.success("Cập nhật sản phẩm thành công!");
                setShowUpdateProduct(false);
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