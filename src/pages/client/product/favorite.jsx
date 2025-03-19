// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {ListFavoriteApi } from "../../../services/client/productApiService";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { laravelAPI } from "../../../utils/axiosCustom";




const Favorite = () => {
    // const { token } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // danh sách yêu thích
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Vui lòng đăng nhập!");
            navigate("/login");
            return;
        }
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const response = await ListFavoriteApi();
                if (response.code === "success") {
                    setFavorites(response.favorites);
                } else {
                    console.log("Lỗi:", response.message);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách yêu thích:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [navigate]);

    // xóa  khỏi yêu thích
    const handleDeleteFavorite = async (favoriteId) => {
        const userId = localStorage.getItem("user");
        if (!userId) {
            toast.error("Vui lòng đăng nhập!");
            return;
        }

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
                    // Gọi API xóa sản phẩm yêu thích
                    const res = await laravelAPI.delete(`/api/favorites/${favoriteId}`);
                    // console.log("xóa", res)
                    // Kiểm tra phản hồi trả về 
                    if (res.code === "success") {
                        Swal.fire({
                            text: res.message,
                            icon: "success"
                        });
                        // Cập nhật lại danh sách favorites sau khi xóa
                        setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== favoriteId));
                    } else {
                        Swal.fire({
                            text: res.message,
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Có lỗi xảy ra!",
                        icon: "error"
                    });
                }
            }
        });
    };

    // thêm vào giỏ hàng
    const handleAddToCart = async (favorite) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Vui lòng đăng nhập!");
            navigate("/login");
            return;
        }

        const productVariant = favorite.product_variant;
        if (!productVariant) {
            toast.error("Sản phẩm không tồn tại!");
            return;
        }

        // Chuẩn bị dữ liệu gửi lên API
        const cartData = {
            productVariantId: productVariant.id,
            sizeId: favorite.size?.id ?? null,
            colorId: favorite.color?.id ?? null,
            quantity: 1  // Mặc định thêm 1 sản phẩm vào giỏ hàng
        };

        try {
            const response = await laravelAPI.post("/api/addToCart", cartData);
            if (response.code === "success") {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi thêm vào giỏ hàng!:", error);
            toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng.");
        }
    };

    return (
        <>
            <div className="py-[60px] mb-20px">
                <div className="container px-[16px] mx-auto">
                    <div className="">
                        <h2 className="font-[700] text-[40px] text-main text-center">Danh sách yêu thích</h2>
                        {loading ? (
                            <div className="text-center text-[18px] font-[500] text-[#333] py-5">
                                Đang tải dữ liệu...
                            </div>
                        ) : (
                            <table className="my-[60px] w-full">
                                <thead className="bg-main">
                                    <tr className="text-center">
                                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#ffffff] ">STT</th>
                                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#ffffff]">Hình ảnh</th>
                                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#ffffff]">Tên sản phẩm</th>
                                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#ffffff]">Giá</th>
                                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#ffffff]">Hành động</th>
                                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#ffffff]">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favorites?.length > 0 ? (
                                        favorites?.map((favorite, index) => {
                                            const variant = favorite.product_variant;

                                            return (
                                                <tr className="text-center border-b py-[10px]" key={variant.id}>
                                                    <td className="py-[10px] text-[16px] font-[500] text-[#000000]">{index + 1}</td>

                                                    {/* Kiểm tra ảnh trước khi hiển thị */}
                                                    <td className="flex items-center justify-center py-[10px]">
                                                        <img
                                                            src={variant.images?.[0]?.image || "/default-image.jpg"}
                                                            alt="Sản phẩm"
                                                            className="w-[100px] h-[100px] object-cover"
                                                        />
                                                    </td>

                                                    {/* Hiển thị thông tin sản phẩm */}
                                                    <td className="py-[10px] text-[16px] font-[500] text-[#000000]">
                                                        <Link to={`/product/${variant.id}`} className="hover:text-main">
                                                            {variant.product?.title || "Tên sản phẩm"}
                                                        </Link>
                                                        <div className="flex items-center gap-[10px] justify-center text-[14px] font-[400]">
                                                            <span>Màu: {favorite.color?.name || "Không có"}</span>
                                                            <span>/</span>
                                                            <span>Size: {favorite.size?.name || "Không có"}</span>
                                                        </div>
                                                    </td>

                                                    {/*  Kiểm tra giá trước khi hiển thị */}
                                                    <td className="py-[10px] text-[16px] font-[500] text-[#000000]">
                                                        {variant.specialPrice?.toLocaleString("vi-VN") || "0"} <sup>đ</sup>
                                                    </td>

                                                    {/* Nút thêm vào giỏ hàng */}
                                                    <td className="py-[10px]">
                                                        <button 
                                                        onClick={() => handleAddToCart(favorite)}
                                                        className="py-[10px] text-[16px] font-[500] text-[#000000] inline-flex items-center gap-[10px] justify-center hover:text-main">
                                                            <span>
                                                                <FontAwesomeIcon icon={faCartShopping} />
                                                            </span>
                                                            Thêm giỏ hàng
                                                        </button>
                                                    </td>

                                                    {/* Nút xóa yêu thích */}
                                                    <td className="py-[10px]">
                                                        <button
                                                            onClick={() => handleDeleteFavorite(favorite.id)} 
                                                            className="py-[10px] text-[16px] font-[500] text-[#FF0000] p-[10px] hover:text-[#000000]">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-5 text-[18px] font-[500] text-[#333]">
                                                Không có sản phẩm yêu thích.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Favorite;