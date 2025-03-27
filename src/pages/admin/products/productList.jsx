import CreateProductModal from "../../../components/admin/products/createProductModal";
import EditProductModal from "../../../components/admin/products/editProductModal";
import "../../../components/admin/css/style.css";
import { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { FaCirclePlus } from "react-icons/fa6";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState('');
    const [filterFeatured, setFilterFeatured] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1
    });

    // danh sách danh mục
    const fetchCategories = async () => {
        try {
            const res = await laravelAPI.get('/api/admin/ListCategory');
            if (res.code === 'success') {
                setCategories(res.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
        }
    };

    // danh sách thương hiệu
    const fetchBrands = async () => {
        try {
            const res = await laravelAPI.get('/api/admin/ListBrands');
            if (res.code === 'success') {
                setBrands(res.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thương hiệu:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    // hiển thị danh sách sản phẩm
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, filterStatus, filterFeatured, searchKeyword, sortOption, filterCategory, filterBrand]);

    const fetchProducts = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/products", {
                params: {
                    page: page,
                    per_page: pagination.per_page,
                    status: filterStatus,
                    featured: filterFeatured,
                    search: searchKeyword,
                    sort: sortOption,
                    categoryId: filterCategory,
                    brandId: filterBrand,
                }
            });
            // console.log("API Response:", response);
            // console.log("API Response:", response.data);
            // console.log("API Response:", response.data.data);
            if (response.code === "success") {
                setProducts(response.data.data || []);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page,
                });

            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };



    // xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        Swal.fire({
            title: "Bạn có chắn chắn muốn xóa không?",
            text: "Sản phẩm này sẽ bị chuyển vào thùng rác.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.patch(`/api/admin/products/softDelete/${id}`);
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công.",
                            icon: "success"
                        });

                        fetchProducts();
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
    const handleViewProduct = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/admin/products/${id}`);
            // console.log(response)
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

    // lấy thông tin chỉnh sửa
    const handleEditClick = async (product) => {
        try {
            const response = await laravelAPI.get(`/api/admin/products/${product.id}`);
            // console.log("Variant được chọn để chỉnh sửa:", response);
            if (response.code === "success") {
                setSelectedProduct(response.product);
                setShowEditModal(true);
            } else {
                toast.error("Lỗi", "Không tìm thấy sản phẩm");
            }
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            toast.error("Lỗi", "Không thể lấy dữ liệu sản phẩm", "error");
        }
    };

    // hàm phân trang
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };


    // hàm cập nhật trạng thái
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/products/${id}/status`, {
                status: !currentStatus // đảo trạng thái
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchProducts();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    // hàm cập nhật trạng thái nổi bật
    const handleToggleFeature = async (id, currentFeatured) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/products/${id}/featured`, {
                featured: !currentFeatured // đảo trạng thái
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchProducts();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái nổi bật:", err);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    // hàm cập nhật vị trí
    const handlePositionChange = async (productId, newPosition) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/products/${productId}/position`, {
                position: parseInt(newPosition),
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchProducts();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật vị trí:", error);
            toast.error("Cập nhật vị trí thất bại!");
        }
    };

    return (
        <div className="py-[20px]">
            <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">Quản lý sản phẩm</h2>
            <div className="card mb-3">
                <div className="card-header">
                    <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                        Bộ lọc và tìm kiếm
                    </h3>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-3 gap-[20px]">
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Trạng thái</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="form-control" >
                                <option value="">Tất cả</option>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Dừng hoạt động</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Trạng thái nổi bật</label>
                            <select
                                value={filterFeatured}
                                onChange={(e) => setFilterFeatured(e.target.value)}
                                className="form-control" >
                                <option value="">Tất cả</option>
                                <option value="yes">Nổi bật</option>
                                <option value="no">Không nổi bật</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Vị trí</label>
                            <select
                                className="form-control"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="position-desc">Vị trí giảm dần</option>
                                <option value="position-asc">Vị trí tăng dần</option>
                                <option value="title-desc">Tiêu đề từ Z đến A</option>
                                <option value="title-asc">Tiêu đề từ A đến Z</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Danh mục</label>
                            {/* call api lấy danh sách danh mục và lọc theo danh mục */}
                            <select className="form-control" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                                <option value="">Tất cả danh mục</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Thương hiệu</label>
                            {/* call api lấy danh sách thương hiệu và lọc theo thương hiệu */}
                            <select className="form-control" value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
                                <option value="">Tất cả thương hiệu</option>
                                {brands.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Tìm kiếm</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && fetchProducts(1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between py-[10px]">
                        <h3 className="text-[20px] text-[#000000] font-[700] ">Danh sách sản phẩm</h3>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main flex items-center gap-[20px]"
                        >
                            <span>
                                <FaCirclePlus />
                            </span>
                            Thêm mới
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center text-[16px] font-[600]">
                            Đang tải dữ liệu sản phẩm...
                        </div>
                    ) : (
                        <>
                            <table className="table table-hover table-sm">
                                <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">STT</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Hình ảnh</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center w-[25%]">Tên sản phẩm</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Vị trí</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Trạng thái</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Nổi bật</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Danh mục</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Thương hiệu</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.length > 0 ? (
                                        products?.map((product, index) => (
                                            <tr className="border-t " key={product?.id}>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center"> {index + 1 + (currentPage - 1) * 10}</td>
                                                <td className="!py-[20px] flex items-center justify-center ">
                                                    {product?.variants &&
                                                        product?.variants?.length > 0 &&
                                                        product?.variants[0].images &&
                                                        product?.variants[0].images.length > 0 ? (
                                                        <img
                                                            src={product?.variants[0].images[0].image}
                                                            alt={product?.title}
                                                            className="w-[100px] h-[100px]" />
                                                    ) : (
                                                        <span>No image</span>
                                                    )}
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center w-[25%]"> {product?.title} </td>
                                                <td className="!py-[20px] text-center">
                                                    <input
                                                        type="number"
                                                        name="position"
                                                        value={product?.position}
                                                        min={1}
                                                        onChange={(e) => handlePositionChange(product?.id, e.target.value)}
                                                        className="w-[80px] border rounded-[12px] py-[4px]  text-[16px] font-[400] text-center text-[#000000]" />
                                                </td>
                                                <td className="text-center !py-[20px]">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={product?.status === 1}
                                                            onChange={() => handleToggleStatus(product?.id, product?.status)}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td className=" text-center !py-[20px]">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={product.featured === 1}
                                                            onChange={() => handleToggleFeature(product?.id, product?.featured)}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td className=" text-center !py-[20px] font-[600] text-[16px] text-[#000000]">
                                                    {product?.category?.name}
                                                </td>
                                                <td className=" text-center !py-[20px] font-[600] text-[16px] text-[#000000]">
                                                    {product?.brand?.name}
                                                </td>
                                                <td className=" text-center !py-[20px]">
                                                    <div className="flex items-center justify-center gap-[6px]">
                                                        <button
                                                            onClick={() => handleViewProduct(product?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[8px] py-[8px] px-[12px]">
                                                            Chi tiết
                                                        </button>
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
                                                </td>
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
                            <div className="flex items-center justify-center mt-[20px]">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="›"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={1}
                                    pageCount={pagination.last_page}
                                    previousLabel="‹"
                                    forcePage={currentPage - 1}
                                    containerClassName="pagination"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    activeClassName="active"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <CreateProductModal
                showCreateProductModal={showCreateModal}
                setShowCreateProductModal={setShowCreateModal}
                fetchProducts={fetchProducts}
            />
            <EditProductModal
                showUpdateProduct={showEditModal}
                setShowUpdateProduct={setShowEditModal}
                productData={selectedProduct}
                fetchProducts={fetchProducts}
            />
        </div>
    )
}

export default ProductList;