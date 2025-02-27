import CreateProductModal from "../../../components/admin/products/createProductModal";
import EditProductModal from "../../../components/admin/products/editProductModal";
import "../../../components/admin/css/style.css";
import { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await laravelAPI.get("/api/products");
            // console.log("API Response:", response);
            // console.log("API Response:", response.data);
            // console.log("API Response:", response.data.data);
            if(response.code === "success"){
                setProducts(response.data.data || []);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        }
    };

    const handleEditClick = (product) => {
        console.log("Variant được chọn để chỉnh sửa:", product);
        setSelectedProduct(product);
        setShowEditModal(true);
        // console.log(product.id)
    };


    // xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        Swal.fire({
            title: "Bạn có chắn chắn muốn xóa không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.patch(`/api/products/softDelete/${id}`);
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công.",
                            icon: "success"
                        });
    
                        fetchProducts(); // Load lại danh sách sản phẩm sau khi xóa
                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: "Có lỗi xảy ra khi xóa sản phẩm.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa sản phẩm:", error);
                    Swal.fire({
                        title: "Lỗi hệ thống!",
                        text: "Không thể xóa sản phẩm.",
                        icon: "error"
                    });
                }
            }
        });
    };
    // hết xóa

    // chi tiết sản phẩm
    // Gọi API lấy chi tiết sản phẩm
    const handleViewProduct = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/products/${id}`);
            console.log(response)
            if (response.code === "success") {
                setSelectedProduct(response.product);
                navigate(`/admin/product/${id}`)
            } else {
                Swal.fire("Lỗi", "Không tìm thấy sản phẩm", "error");
            }
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            Swal.fire("Lỗi", "Không thể lấy dữ liệu sản phẩm", "error");
        }
    };
    // 
    return (
        <div className="py-[20px]">
            <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">Danh sách sản phẩm</h2>
            <div className="flex items-center justify-between py-[10px] mb-[10px]">
                <h3 className="text-[20px] text-[#000000] font-[700] ">Danh sách sản phẩm</h3>

                <CreateProductModal />
            </div>
            <div className="">
                <table className="w-full">
                    <thead className="bg-[#EEEEEE]">
                        <tr>
                            <td></td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">STT</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Hình ảnh</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Tên sản phẩm</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Vị trí</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Trạng thái</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Nổi bật</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Thông số</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Thông tin</td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr className="border-t " key={product.id}>
                                    <th className="py-[10px]"><input type="checkbox" name="" id="" /></th>
                                    <th className="py-[10px] font-[400] text-[16px] text-[400] text-center"> {index + 1}</th>
                                    <th className="py-[10px] flex items-center justify-center">
                                        {product.variants &&
                                            product.variants.length > 0 &&
                                            product.variants[0].images &&
                                            product.variants[0].images.length > 0 ? (
                                            <img 
                                            src={product.variants[0].images[0].image} 
                                            alt={product.title}
                                            className="w-[100px] h-[100px]" />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </th>
                                    <th className="py-[10px] font-[600] text-[16px] text-[#000000] text-center"> {product.title} </th>
                                    <th className="py-[10px] text-center">
                                        <input 
                                        type="number" 
                                        name="" id="" 
                                        value={product.position}
                                        min={1} 
                                        className="w-[80px] border rounded-[12px] py-[4px] !border-[#000000] text-[20px] font-[400] text-center text-[#000000]" />
                                    </th>
                                    <th className="text-center">
                                        <label class="toggle-switch">
                                            <input
                                                type="checkbox" 
                                                checked={product.status === 1}
                                                onChange={() => {}}
                                                />
                                            <div class="toggle-switch-background">
                                                <div class="toggle-switch-handle"></div>
                                            </div>
                                        </label>
                                    </th>
                                    <th className=" text-center">
                                        <label class="toggle-switch">
                                            <input 
                                            type="checkbox" 
                                            checked={product.featured === 1}
                                            onChange={() => {}}/>
                                            <div class="toggle-switch-background">
                                                <div class="toggle-switch-handle"></div>
                                            </div>
                                        </label>
                                    </th>
                                    <th>
                                        <div className="flex items-center justify-center gap-[6px]">
                                            <button 
                                            onClick={() => handleViewProduct(product.id)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-main rounded-[8px] py-[8px] px-[12px]">
                                                Thêm mới
                                            </button>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="flex items-center justify-center gap-[6px]">
                                            <button 
                                            onClick={() => handleViewProduct(product.id)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[8px] py-[8px] px-[12px]">
                                                Chi tiết
                                            </button>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="flex items-center justify-center gap-[6px]">
                                            {/* <button 
                                            onClick={() => handleViewProduct(product.id)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]">
                                                Chi tiết</button> */}
                                            <button 
                                            onClick={() => handleEditClick(product)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                Sửa
                                            </button>
                                            <button 
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                Xóa</button>
                                        </div>
                                    </th>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-[10px]">
                                    Không có sản phẩm nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <EditProductModal 
                    showUpdateProduct={showEditModal}
                    setShowUpdateProduct={setShowEditModal}
                    productData={selectedProduct}
                />
        </div>
    )
}

export default ProductList;