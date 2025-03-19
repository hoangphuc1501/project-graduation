import { laravelAPI, nodeAPI } from '../../utils/axiosCustom';
// import { toast } from 'react-toastify';


// danh mục sản phẩm
const categoryParentApi = async () => {
    return await laravelAPI.get("/api/categoryParent");
}

const categoryList = async () => {
    return await laravelAPI.get("/api/categories")
}
// end danh mục sản phẩm

// danh sách hương hiệu
const ListBrands = async () => {
    return await laravelAPI.get("/api/brands");
}
// end danh sách thương hiệu



// sản phẩm yêu thích
const ListFavoriteApi = async () => {
    return await laravelAPI.get("/api/favorites");
}

// const deleteApiFavorite = async (userId, productvariantId) =>{
//     const token = localStorage.getItem("token"); // Lấy token từ localStorage
//         if (!token) {
//             alert("Vui lòng đăng nhập!");
//             return;
//         }
//     return await laravelAPI.delete(`/api/favorites/${productvariantId}`);
// }
// end sản phẩm yêu thích

// sản phẩm
const productDetailApi = async ({slug}) => {
    return await nodeAPI.get(`/product/detail/${slug}`)
}
// end sản phẩm

export { ListFavoriteApi, categoryParentApi, ListBrands, categoryList, productDetailApi}
