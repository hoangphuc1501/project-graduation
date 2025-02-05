import './404.css';
import { Link } from "react-router-dom";
const Page404 = () => {
    return (
        <div>
            <h1>Không tìm thấy trang!</h1>
            <p class="zoom-area">
                <b>Nguyên nhân: URL đã được thay đổi hoặc xóa khỏi hệ thống</b>
            </p>
            <section class="error-container">
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
                <span class="zero">
                    <span class="screen-reader-text">0</span>
                </span>
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
            </section>
            <div class="link-container">
                <Link to="/" className='more-link'>
                    Quay lại trang chủ
                </Link>
            </div>
        </div>
    );
};
export default Page404;
