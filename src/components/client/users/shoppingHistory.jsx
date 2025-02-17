import { useState } from "react";

const ShoppingHistory = () => {
    const [variants, setVariants] = useState([{ color: "", size: "", price: "" }]);
    
    const addVariant = () => {
        setVariants([...variants, { color: "", size: "", price: "" }]);
    };
    
    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };
    
    const handleChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };
    
    return (
        <div className="container" style={{ maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
            <h2>Thêm Sản Phẩm</h2>
            <label htmlFor="product-name">Tên sản phẩm:</label>
            <input type="text" id="product-name" placeholder="Nhập tên sản phẩm" required style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }} />
            
            <h3>Biến thể sản phẩm</h3>
            <div>
                {variants.map((variant, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        <input type="text" placeholder="Màu sắc" value={variant.color} onChange={(e) => handleChange(index, "color", e.target.value)} required style={{ flex: 1, padding: "8px" }} />
                        <input type="text" placeholder="Kích thước" value={variant.size} onChange={(e) => handleChange(index, "size", e.target.value)} required style={{ flex: 1, padding: "8px" }} />
                        <input type="number" placeholder="Giá" value={variant.price} onChange={(e) => handleChange(index, "price", e.target.value)} required style={{ flex: 1, padding: "8px" }} />
                        <button onClick={() => removeVariant(index)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>X</button>
                    </div>
                ))}
            </div>
            <button onClick={addVariant} style={{ padding: "8px 12px", cursor: "pointer" }}>Thêm biến thể</button>
        </div>
    );
}

export {ShoppingHistory};