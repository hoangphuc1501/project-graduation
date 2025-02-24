import { nodeAPI } from '../../utils/axiosCustom';
// import { toast } from 'react-toastify';


// danh mục sản phẩm
const categoryParentApi = async () => {
    return await nodeAPI.get("/products/categoryParent");
}

const categoryList = async () => {
    return await nodeAPI.get("/products/category")
}
// end danh mục sản phẩm

// danh sách hương hiệu
const ListBrands = async () => {
    return await nodeAPI.get("/products/brands");
}
// end danh sách thương hiệu



// sản phẩm yêu thích
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
// end sản phẩm yêu thích

// sản phẩm
const productDetailApi = async ({slug}) => {
    return await nodeAPI.get(`/product/detail/${slug}`)
}
// end sản phẩm

export {deleteApiFavorite, ListFavoriteApi, categoryParentApi, ListBrands, categoryList, productDetailApi}
