import { laravelAPI } from '../../utils/axiosCustom';

// chi tiết sản phẩm
// hiển thị chi tiết
const ProductDetailAdminApi = async (id) => {
    return await laravelAPI.get(`/api/admin/products/${id}`);
}

const updateVariantApi  = async (id, variantData) => {
    return await laravelAPI.patch(`/api/admin/productVariants/${id}`, variantData);
}
// xóa mềm
const SoftDeletelVariantApi = async (id) => {
    return await laravelAPI.patch(`/api/admin/productVariants/softDelete/${id}`);
}
// end chi tiết sản phẩm

export {ProductDetailAdminApi, SoftDeletelVariantApi, updateVariantApi}