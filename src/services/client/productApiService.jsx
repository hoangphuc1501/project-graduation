import { nodeAPI } from '../../utils/axiosCustom';
// import { toast } from 'react-toastify';

const ListFavoriteApi = async () => {
    return await nodeAPI.get("/favorite");
}

const deleteApiFavorite = async (userId, productvariantId) =>{
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (!token) {
            alert("Vui lòng đăng nhập!");
            return;
        }
    return await nodeAPI.delete(`/favorite/delete`, {
        data: { userId,productvariantId }});
}
export {deleteApiFavorite, ListFavoriteApi}
