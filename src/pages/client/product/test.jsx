import React, { useState } from 'react';

const ProductDescription = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <h1>1. Giới thiệu SET Vợt Cầu Lông Kumpoo Energy</h1>
            <div
                className={`description ${isExpanded ? 'expanded' : ''}`}
                style={{
                    overflow: 'hidden',
                    maxHeight: isExpanded ? '1000px' : '20px',
                    transition: 'max-height 0.9s ease-in-out',
                }}
            >
                - SET Vợt Cầu Lông Kumpoo Energy bao gồm một cây vợt cầu lông Kumpoo Small Energy, một túi nhung đựng vợt, một bộ quấn cán, 1 cuốn căng đi kèm. Set vợt có đầy đủ tất cả các phụ kiện cần cho một cây vợt và người chơi, là một giải pháp tiết kiệm cho những ai đang muốn mua trọn bộ tất cả các vật dụng cần thiết.<br /><br />
                - Có điểm cân bằng nặng đầu ở mức 295 ± 5 mm, trọng lượng 4U, độ cứng ở mức trung bình, hướng tới những người chơi có lối đánh toàn diện, linh hoạt giữa tấn công và phòng thủ, thích hợp với những bạn có lực cổ tay chưa được tốt, đặc biệt là người mới.
            </div>
            <span
                className="toggle-btn"
                onClick={toggleDescription}
                style={{
                    color: 'blue',
                    cursor: 'pointer',
                    marginTop: '10px',
                    display: 'inline-block',
                }}
            >
                {isExpanded ? 'Ẩn bớt' : 'Xem thêm'}
            </span>
        </div>
    );
};

export default ProductDescription;
