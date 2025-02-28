const API_URL = "http://127.0.0.1:8000/api/productcategories";

export const fetchCategories = async () => {
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
export const addCategory = async (category) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error);
  }
};

//sửa
export const updateCategory = async (id, category) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
  }
};

//xóa
export const deleteCategory = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
  }
};
