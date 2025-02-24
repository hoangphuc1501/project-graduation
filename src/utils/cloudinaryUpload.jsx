import axios from "axios";

const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "badminton"); 
    formData.append("cloud_name", "dyoestl0x"); 

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dyoestl0x/image/upload",
            formData
        );
        console.log("Upload thành công:", response.data);
        return response.data.secure_url; // Trả về link ảnh đã upload
    } catch (error) {
        console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
        return null; // Nếu lỗi, trả về null
    }
};

export default uploadToCloudinary;