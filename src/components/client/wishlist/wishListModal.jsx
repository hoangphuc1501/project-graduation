
import Offcanvas from 'react-bootstrap/Offcanvas';
import WishListModalItem from './wishListModalItem';
import { WishListButtonViewAll } from './wishListButton';
import { useEffect, useState } from "react";
import { ListFavoriteApi } from "../../../services/client/productApiService";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import { laravelAPI } from '../../../utils/axiosCustom';

const WishListModal = (props) => {
    const { showWishList, setShowWishList } = props;
    const handleClose = () => setShowWishList(false);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const response = await ListFavoriteApi();
                if (response.code === "success") {
                    // Giới hạn tối đa 5 sản phẩm hiển thị
                    setFavorites(response.favorites.slice(0, 5));
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
    }, []);

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

    return (
        <>
            <Offcanvas
                show={showWishList}
                onHide={handleClose}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='font-[700] text-[26px] text-[#000000]'>Danh sách yêu thích</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {loading ? (
                        <div className="text-center text-[16px] text-gray-500 py-3">Đang tải danh sách...</div>
                    ) : favorites.length > 0 ? (
                        favorites.map((favorite, index) => (
                            <WishListModalItem
                                key={favorite.id || index}
                                favorite={favorite}
                                onDelete={handleDeleteFavorite} />
                        ))
                    ) : (
                        <div className="text-center text-[16px] text-gray-500 py-3">Danh sách yêu thích trống.</div>
                    )}

                    <WishListButtonViewAll />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default WishListModal;