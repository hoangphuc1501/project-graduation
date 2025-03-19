
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';
import uploadToCloudinary from '../../../utils/cloudinaryUpload';
import { toast } from 'react-toastify';

const CreateVariantModal = ({ showCreateVariant, setShowCreateVariant }) => {
    const { id: ProductID } = useParams();
    const handleClose = () => setShowCreateVariant(false);

    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    // Gọi API lấy danh sách màu sắc
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

    // Gọi API lấy danh sách kích thước
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

    const [formData, setFormData] = useState({
        ProductID: "",
        color: "",
        size: "",
        price: "",
        stock: "",
        discount: "",
        specialPrice: "",
        status: true,
        images: [],
    });

    useEffect(() => {
        if (ProductID) {
            setFormData((prevState) => ({ ...prevState, ProductID }));
        }
    }, [ProductID]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "number" ? Number(value) : 
                    type === "radio" ? (value === "true") : value,
        }));
    };

    const handleImageChange = async (event) => {
        const files = Array.from(event.target.files);
        let uploadedImages = [];

        for (let file of files) {
            const imageUrl = await uploadToCloudinary(file);
            if (imageUrl) {
                uploadedImages.push(imageUrl);
            }
        }

        setFormData((prev) => ({
            ...prev,
            images: uploadedImages,
        }));
    };

    // Gọi API khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.ProductID) {
            toast.error("Vui lòng chọn sản phẩm.");
            return;
        }

        if (!formData.color) {
            toast.error("Vui lòng chọn màu sắc.");
            return;
        }

        if (!formData.size) {
            toast.error("Vui lòng chọn kích thước.");
            return;
        }

        const dataToSend = {
            ProductID: Number(formData.ProductID),
            color: formData.color,
            size: formData.size,
            price: formData.price,
            discount: formData.discount ?? 0,
            specialPrice: formData.specialPrice ?? 0,
            stock: formData.stock ?? 0,
            status: formData.status ? 1 : 0,
            images: formData.images,
        };

        try {
            const response = await laravelAPI.post("/api/admin/productVariants", dataToSend);
            console.log("check variant",response)
            if (response.code === "success") {
                toast.success(response.message);
                setShowCreateVariant(false);
                setFormData({
                    ProductID: ProductID,
                    color: "",
                    size: "",
                    price: "",
                    discount: "",
                    specialPrice: "",
                    stock: "",
                    status: true,
                    images: [],
                });
            } else {
                toast.error("Thêm biến thể thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi thêm biến thể:", error);
            toast.error("Có lỗi xảy ra!");
        }
    };

    return (
        <Modal show={showCreateVariant} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Biến Thể</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>ID Sản Phẩm</label>
                        <div className="border p-2">{formData.ProductID}</div>
                    </div>

                    {/* Chọn Màu Sắc */}
                    <div className="mb-3">
                        <label>Màu Sắc</label>
                        <select
                            className="form-select"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn màu sắc</option>
                            {colors.map((color) => (
                                <option key={color.id} value={color.id}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chọn Kích Thước */}
                    <div className="mb-3">
                        <label>Kích Thước</label>
                        <select
                            className="form-select"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn kích thước</option>
                            {sizes.map((size) => (
                                <option key={size.id} value={size.id}>
                                    {size.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Giá, Giảm Giá, Giá Khuyến Mãi */}
                    <div className="mb-3">
                        <label>Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Phần trăm giảm giá</label>
                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Giá khuyến mãi</label>
                        <input
                            type="number"
                            name="specialPrice"
                            value={formData.specialPrice}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Số lượng</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    {/* Upload Hình Ảnh */}
                    <div className="mb-3">
                        <label>Hình Ảnh</label>
                        <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Trạng Thái */}
                    <div className="mb-3">
                        <label>Trạng Thái</label>
                        <div className="d-flex gap-3">
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="true"
                                    checked={formData.status === true}
                                    onChange={handleChange}
                                />{" "}
                                Hoạt động
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="false"
                                    checked={formData.status === false}
                                    onChange={handleChange}
                                />{" "}
                                Dừng hoạt động
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Tạo mới
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};




// const CreateVariantModal = ({ showCreateVariant, setShowCreateVariant }) => {
//     const { id: ProductID } = useParams();
//     const handleClose = () => setShowCreateVariant(false);
//     const [colors, setColors] = useState([]);
//     const [sizes, setSizes] = useState([]);
//      // hàm gọi color
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

//     const [formData, setFormData] = useState({
//         ProductID: "",
//         color: "",
//         size: "",
//         price: "",
//         discount: "",
//         specialPrice: "",
//         status:  true,
//         images: [],
//     });

//     useEffect(() => {
//         if (ProductID) {
//             setFormData((prevState) => ({ ...prevState, ProductID }));
//         }
//     }, [ProductID]);

//     const handleChange = (e) => {
//         const { name, value, type } = e.target;
    
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: type === "number" ? Number(value) : 
//                     type === "radio" ? (value === "true") : value,
//         }));
//     };
    
//     const handleImageChange = async (event) => {
//         const files = Array.from(event.target.files);
//         let uploadedImages = [];
    
//         for (let file of files) {
//             const imageUrl = await uploadToCloudinary(file);
//             if (imageUrl) {
//                 uploadedImages.push(imageUrl);
//             }
//         }
    
//         setFormData((prev) => ({
//             ...prev,
//             images: uploadedImages,
//         }));
//     };
    

//      // Gọi API khi submit form
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Kiểm tra nếu thiếu ProductID
//         if (!formData.ProductID) {
//             toast.error("Vui lòng chọn sản phẩm.");
//             return;
//         }

//         const dataToSend = {
//             ProductID: Number(formData.ProductID),
//             color: formData.color,
//             size: formData.size,
//             price: formData.price,
//             discount: formData.discount ?? 0,
//             specialPrice: formData.specialPrice ?? 0,
//             status: formData.status ? 1 : 0, 
//             images: formData.images, 
//         };



//         try {
//             const response = await laravelAPI.post("/api/productVariants", dataToSend);
//             console.log(response)
//             if (response.code === "success") {
//                 toast.success(response.message)
//                 setShowCreateVariant(false);
//                 setFormData({
//                     ProductID: ProductID,
//                     color: "",
//                     size: "",
//                     price: "",
//                     discount: "",
//                     specialPrice: "",
//                     status: true,
//                     images: [],
//                 });
//             }else{
//                 toast.error("Thêm sản phẩm thất bại")
//                 setShowCreateVariant(false);
//             }
//         } catch (error) {
//             console.error("Lỗi khi thêm biến thể:", error);
//             alert("Có lỗi xảy ra!");
//         }
//     };

//     return (
//         <>
//             <Modal
//                 show={showCreateVariant}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form action="" onSubmit={handleSubmit}>
//                         <h2
//                             className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới Biến thể</h2>
//                         <div
//                             className='flex items-center my-[20px] flex-wrap gap-[20px]'>
//                             <div className='w-full'>
//                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >ID sản phẩm</label>
//                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] w-full">
//                                     {formData.ProductID}
//                                 </div>
//                             </div>  
//                             <div className='w-full'>
//                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Màu sắc</label>
//                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] w-full">
//                                     <input
//                                         type="text"
//                                         placeholder="Màu sắc"
//                                         name="color"
//                                         value={formData.color}
//                                         onChange={handleChange}
//                                         required
//                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                 </div>
//                             </div>
//                             <div className='w-full'>
//                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Kích thước</label>
//                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] w-full">
//                                     <input
//                                         type="text"
//                                         name="size"
//                                         placeholder="Kích thước"
//                                         value={formData.size}
//                                         onChange={handleChange}
//                                         required
//                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                 </div>
//                             </div>
//                             <div className='w-full'>
//                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Giá</label>
//                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                     <input
//                                         type="number"
//                                         placeholder="Giá"
//                                         name="price"
//                                         value={formData.price}
//                                         onChange={handleChange}
//                                         required
//                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                 </div>
//                             </div>
//                             <div className='w-full'>
//                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Phần trăm giảm giá</label>
//                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                     <input
//                                         type="number"
//                                         placeholder="% giảm giá"
//                                         name="discount"
//                                         value={formData.discount}
//                                         onChange={handleChange}
//                                         required
//                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                 </div>
//                             </div>

//                             <div className='w-full mb-[20px]'>
//                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Giá khuyến mãi</label>
//                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                     <input
//                                         type="number"
//                                         placeholder="Giá khuyến mãi"
//                                         name="specialPrice"
//                                         value={formData.specialPrice}
//                                         onChange={handleChange}
//                                         required
//                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                 </div>
//                             </div>
//                             {/* <div className='w-full mb-[20px]'>
//                                 <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Hình ảnh</label>
//                                 <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
//                                     <input
//                                         type="file"
//                                         multiple
//                                         accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
//                                         placeholder="Hình ảnh"
//                                         onChange={handleImageChange}
//                                         required
//                                         className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
//                                 </div>
//                             </div> */}
//                             <div className="mb-[20px] w-full">
//                                 <label for="formFileMultiple" class="form-label">Hình ảnh</label>
//                                 <input 
//                                 accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
//                                 onChange={handleImageChange}
//                                 required
//                                 name='images'
//                                 class="form-control" 
//                                 type="file" 
//                                 id="formFileMultiple" 
//                                 multiple/>
//                             </div>
//                             <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
//                                 <div className='flex items-center gap-[8px]'>
//                                     <input
//                                         type="radio"
//                                         name="status"
//                                         value="true"
//                                         checked={formData.status === true}
//                                         onChange={handleChange}
//                                         id="statusProductVariant"
//                                     />
//                                     <label htmlFor="statusProductVariant" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
//                                 </div>
//                                 <div className='flex items-center gap-[8px]'>
//                                     <input
//                                         type="radio"
//                                         value="false"
//                                         checked={formData.status === false}
//                                         onChange={handleChange}
//                                         name="status"
//                                         id="statusProductVariant1"
//                                     />
//                                     <label htmlFor="statusProductVariant1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
//                                 </div>
//                             </div>
//                         </div>
//                         <button
//                             type='submit'
//                             className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main my-[20px] flex items-center gap-[20px]">
//                             Tạo mới
//                         </button>
//                     </form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     )
// }
export default CreateVariantModal;