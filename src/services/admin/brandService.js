const API_URL = "http://127.0.0.1:8000/api/brands";

export const fetchBrands = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data.data || [];
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    return [];
  }
};

//thêm
export const addBrand = async (brand) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi thêm brand:", error);
  }
};

//sửa
export const updateBrand = async (id, brand) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật brand:", error);
  }
};

//xóa
export const deleteBrand = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Lỗi khi xóa brand:", error);
  }
};
