// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { deleteApiFavorite, ListFavoriteApi } from "../../../services/client/productApiService";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { UserContext } from "../../../middleware/UserContext";



const Favorite = () => {
    // const { token } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
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
            const response = await ListFavoriteApi();

            console.log("API Response:", response);
            if (response.code === "success") {
                setFavorites(response.favorites);
            } else {
                console.log("Lỗi:", response.message);
            }
        };

        fetchFavorites();
    }, [navigate]);

    // xóa  khỏi yêu thích
    const handleDeleteFavorite = async (productvariantId) => {
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
                    const res = await deleteApiFavorite(userId, productvariantId);
                    // Kiểm tra phản hồi trả về 
                    if (res.code === "success") {
                        Swal.fire({
                            text: res.message,
                            icon: "success"
                        });
                        // Cập nhật lại danh sách favorites sau khi xóa
                        setFavorites(favorites.filter(fav => fav.productVariants.id !== productvariantId));
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

    return (
        <>
            <div className="py-[60px] mb-20px">
                <div className="container px-[16px] mx-auto">
                    <div className="">
                        <h2 className="font-[700] text-[40px] text-main text-center">Danh sách yêu thích</h2>
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
                                {Array.isArray(favorites) && favorites.length > 0 ? (
                                    favorites.map((favorite, index) => (
                                        <tr className="text-center border-b py-[10px]" key={favorite?.productVariants?.id}>
                                            <td className="py-[10px] text-[16px] font-[500] text-[#000000]">{index + 1}</td>
                                            <td className="flex items-center justify-center py-[10px]">
                                                <img
                                                    src={favorite?.productVariants?.images?.[0]?.image}
                                                    alt=""
                                                    className="w-[100px] h-[100px]"
                                                />
                                            </td>
                                            <td className="py-[10px] text-[16px] font-[500] text-[#000000]">
                                                <Link to="" className="hover:text-main">
                                                    {favorite?.productVariants?.product?.title}
                                                </Link>
                                                <div className="flex items-center gap-[10px] justify-center text-[14px] font-[400]">
                                                <span>Màu: {favorite?.productVariants?.color}</span>
                                                <span>/</span>
                                                <span>size : {favorite?.productVariants?.size}</span>
                                                </div>
                                            </td>
                                            <td className="py-[10px] text-[16px] font-[500] text-[#000000]">
                                                {favorite?.productVariants?.specialPrice.toLocaleString("vi-VN")}
                                                <sup>đ</sup>
                                            </td>
                                            <td className="py-[10px]">
                                                <button className="py-[10px] text-[16px] font-[500] text-[#000000] inline-flex items-center gap-[10px] justify-center hover:text-main">
                                                    <span>
                                                        <FontAwesomeIcon icon={faCartShopping} />
                                                    </span>
                                                    Thêm giỏ hàng
                                                </button>
                                            </td>
                                            <td className="py-[10px]">
                                                <button
                                                    onClick={() => handleDeleteFavorite(favorite?.productVariants?.id)}
                                                    className="py-[10px] text-[16px] font-[500] text-[#FF0000] p-[10px] hover:text-[#000000]">
                                                    <FontAwesomeIcon icon={faTrash} />

                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">Không có sản phẩm yêu thích.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Favorite;