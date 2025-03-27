import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { ProductDetailAdminApi, SoftDeletelVariantApi } from "../../../services/admin/productAdminApiService";
// import Swal from "sweetalert2";
// import CreateVariantModal from "../../../components/admin/products/createVariantModal";
// import EditVariantModal from "../../../components/admin/products/editVariantModal";

const ProducDetailAdmin = () => {

    // const [showVariantModal, setShowVariantModal] = useState(false);
    // const [showEditVariantModal, setShowEditVariantModal] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    // const [editingVariant, setEditingVariant] = useState(null);
    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    // show chi tiết
    const fetchProductDetail = async () => {
        const response = await ProductDetailAdminApi(id);
        console.log(response)
        if (response.code === "success") {
            setProduct(response.product);
        };
    }
    // const handleEditVariant = (variant) => {
    //     console.log("Variant được chọn để chỉnh sửa:", variant);
    //     setEditingVariant(variant);
    //     setShowEditVariantModal(true);
    // };
    // // xóa mềm 
    // const handleDeleteProductVariant = async (id) => {
    //     Swal.fire({
    //         title: "Bạn có chắn chắn muốn xóa không?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Đồng ý",
    //         cancelButtonText: "Hủy"
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 const response = await SoftDeletelVariantApi(id);
    //                 console.log(response)
    //                 if (response.code === "success") {
    //                     Swal.fire({
    //                         title: "Xóa thành công.",
    //                         icon: "success"
    //                     });

    //                     fetchProductDetail();
    //                 } else {
    //                     Swal.fire({
    //                         title: "Lỗi!",
    //                         text: "Có lỗi xảy ra khi xóa sản phẩm.",
    //                         icon: "error"
    //                     });
    //                 }
    //             } catch (error) {
    //                 console.error("Lỗi khi xóa sản phẩm:", error);
    //                 Swal.fire({
    //                     title: "Lỗi hệ thống!",
    //                     text: "Không thể xóa biến thể sản phẩm .",
    //                     icon: "error"
    //                 });
    //             }
    //         }
    //     });
    // };


    if (!product) {
        return <div className="text-center py-5">Đang tải...</div>;
    }


    return (
        <div className="">
            <div className="">
                <div className="">
                    <h3>{product.id}</h3>
                    <h3>{product.title}</h3>
                    <h3>{product.categoriesID}</h3>
                    <h3>{product.brandID}</h3>
                    <h3>Nổi bật:{product.featured ? "Có" : "Không"}</h3>
                    <h3>{product.position}</h3>
                    <h3>Trạng thái: {product.status ? "Hoạt động" : "Dừng hoạt động"}</h3>
                    <div>{product.codeProduct}</div>
                    <h3>{product.slug}</h3>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
                    <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: product.descriptionPromotion }} />

                </div>
                <div className="">
                    <button
                        // onClick={() => setShowVariantModal(true)}
                        className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main my-[20px] flex items-center gap-[20px]">
                        <span><FaCirclePlus /></span>
                        Thêm mới
                    </button>
                    <div className="">
                        <table className="w-full">
                            <thead className="bg-[#EEEEEE]">
                                <tr>
                                    <td></td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">STT</td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Hình ảnh</td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Màu sắc</td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Kích thước</td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Giá</td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">% giảm giá</td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Giá khuyến mãi</td>
                                    <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Trạng thái</td>
                                    {/* <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">Hành động</td> */}
                                </tr>
                            </thead>
                            <tbody>
                                {product.variants.length > 0 ? (
                                    product.variants.map((variant, index) =>
                                        variant.sizes.map((size, sizeIndex) => (
                                            <tr key={`${variant.id}-${sizeIndex}`} className="border-t ">
                                                <td className=" py-[10px] text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="cursor-pointer"

                                                    />
                                                </td>
                                                <td className=" py-[10px] text-center">{index + 1}</td>
                                                <td className=" py-[10px] flex items-center justify-center">
                                                    {variant.images.length > 0 ? (
                                                        <img
                                                            src={variant.images[0].image}
                                                            alt={`Variant ${variant.color}`}
                                                            className="w-16 h-16 object-cover"
                                                        />
                                                    ) : (
                                                        "Không có ảnh"
                                                    )}
                                                </td>
                                                <td className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">{variant.colors[0]?.name || "Không có"}</td>
                                                <td className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">{size.name}</td>
                                                <td className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {variant.price ? variant.price.toLocaleString() + "₫" : "N/A"}
                                                </td>
                                                <td className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {variant.discount ? variant.discount + "%" : "N/A"}
                                                </td>
                                                <td className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {variant.specialPrice ? variant.specialPrice.toLocaleString() + "₫" : "N/A"}
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="appearance-none relative inline-block rounded-full w-12 h-6 cursor-pointer 
                                                    before:inline-block before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                                                    before:rounded-full before:bg-stone-200 before:transition-colors before:duration-200 
                                                    before:ease-in after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 
                                                    after:w-6 after:h-6 after:border after:border-stone-200 after:bg-white after:rounded-full 
                                                    checked:after:translate-x-full after:transition-all after:duration-200 after:ease-in 
                                                    disabled:opacity-50 disabled:cursor-not-allowed dark:after:bg-white 
                                                    checked:before:bg-stone-800 checked:after:border-stone-800"
                                                        checked={variant.status}
                                                        onChange={() => { }}
                                                    />
                                                </td>
                                                {/* <td className=" py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                                    <div className="flex items-center justify-center gap-[6px]">
                                                        <button
                                                            onClick={() => handleEditVariant(variant)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[12px] py-[8px] px-[12px]">
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProductVariant(variant.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[12px] py-[8px] px-[12px]">
                                                            Xóa</button>
                                                    </div>
                                                </td> */}
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center py-3">Không có biến thể nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* <CreateVariantModal
                            showCreateVariant={showVariantModal}
                            setShowCreateVariant={setShowVariantModal}
                        />
                        <EditVariantModal
                            showEditVariant={showEditVariantModal}
                            setShowEditVariant={setShowEditVariantModal}
                            variantData={editingVariant}  // Truyền dữ liệu vào modal
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProducDetailAdmin;