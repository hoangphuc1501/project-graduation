import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { laravelAPI } from "../../../utils/axiosCustom";
import { UserContext } from "../../../middleware/UserContext";
import StarRating from "./StarRating";
import moment from 'moment';
import { FaStar } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";



const CommentProduct = ({ productId }) => {
    const { user, token } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [star, setStar] = useState(5);
    const [loadingComments, setLoadingComments] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);

    //     const [replyContent, setReplyContent] = useState({});
    // const [replyingTo, setReplyingTo] = useState(null);


    // Lấy danh sách bình luận và đánh giá
    useEffect(() => {
        const fetchCommentsAndReviews = async () => {
            try {
                if (!productId) return;
                setLoadingComments(true);
                setLoadingReviews(true);
                // Gọi API lấy bình luận
                const resComments = await laravelAPI.get(`/api/comments/${productId}`);
                // console.log("check resComments", resComments);
                setComments(Array.isArray(resComments.data) ? resComments.data : []);
                setLoadingComments(false);

                // Gọi API lấy đánh giá
                const resReviews = await laravelAPI.get(`/api/reviews/${productId}`);
                // console.log("check resReviews", resReviews);
                setReviews(Array.isArray(resReviews.data) ? resReviews.data : []);
                setLoadingReviews(false);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            }
        };

        fetchCommentsAndReviews();
    }, [productId]);

    // Gửi bình luận
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user || !token) {
            toast.error("Bạn cần đăng nhập để bình luận!");
            return;
        }

        try {
            const res = await laravelAPI.post("/api/comments", {
                productId,
                content: commentContent,
            });
            // console.log("check bình luận", res);
            if (res && res.data) {
                // Tạo dữ liệu mới có user để hiển thị ngay lập tức
                const newComment = {
                    id: res.data.id,
                    content: commentContent,
                    createdAt: res.data.createdAt,
                    user: user,
                };
                setComments([newComment, ...comments]); // Cập nhật UI ngay lập tức
                setCommentContent("");
                toast.success("Đã gửi bình luận!");
            }
        } catch (error) {
            console.error("Lỗi gửi bình luận:", error);
            toast.error("Gửi bình luận thất bại!");
        }
    };

    // Gửi đánh giá (chỉ khi đã mua hàng)
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user || !token) {
            toast.error("Bạn cần đăng nhập để đánh giá!");
            return;
        }

        try {
            const res = await laravelAPI.post("/api/reviews", {
                productId,
                content: reviewContent,
                star,
            });
            // console.log("check reviews", res)
            if (res.code === "success") {
                setReviews([res.data, ...reviews]);
                setReviewContent("");
                setStar(5);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Lỗi gửi đánh giá:", error);
            toast.error("Bạn chưa mua sản phẩm này!");
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Số sao đầy
        const emptyStars = 5 - fullStars; // Số sao rỗng

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <IoMdStarOutline key={i} className="text-yellow-500" />
                ))}
            </>
        );
    };
    return (
        <div className="w-full my-[40px]">
            {/* Đánh giá (Rating) */}
            <div className="shadow-[0_0_6px_#dddddd] px-[20px] py-[20px] rounded-[10px] bg-[#f3f4f6] my-[30px]">
                <h3 className="text-[16px] font-[700] text-[#00000] mb-[8px]">
                    Đánh giá ({reviews?.length})
                </h3>

                {user ? (
                    <form onSubmit={handleReviewSubmit} className="review-form space-y-3">
                        <StarRating rating={star} onRatingChange={setStar} />
                        <textarea
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                            required
                            placeholder="Nhập nội dung đánh giá..."
                            className="w-full border px-[10px] py-[10px] h-[100px] rounded-[8px] outline-none text-[16px] font-[400] text-[#000000]"
                        />
                        <button
                            type="submit"
                            className="text-[16px] font-[400] text-[#ffffff] bg-main rounded-[8px] px-[20px] py-[6px]"
                        >
                            Gửi Đánh Giá
                        </button>
                    </form>
                ) : (
                    <div className="text-center mt-[20px]">
                        <p className="text-[14px] font-[400] text-[#00000]">Bạn cần đăng nhập để đánh giá sản phẩm!</p>
                        <Link
                            to="/login"
                            className="text-[16px] font-[400] text-[#ffffff] bg-main rounded-[8px] px-[20px] py-[6px] mt-[20px] hover:text-[#ffffff] inline-block"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                )}

                {loadingReviews ? (
                    <p className="text-center text-gray-500">Đang tải đánh giá...</p>
                ) : (
                    <ul className="mt-[30px] space-y-2">
                        {reviews?.length > 0 ? (
                            reviews.map((review) => (
                                <li key={review.id} className="border-b pb-[12px] mb-[12px]">
                                    <div className="flex items-center justify-between ">
                                        <span className="text-[16px] font-[700] text-[#000000] mb-[10px]">
                                            {review?.user?.fullname || "Ẩn danh"}
                                        </span>
                                        <span className="text-[16px] font-[400] text-[#000000] mb-[10px]">
                                            {moment(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                        </span>
                                    </div>
                                    <p className="ml-[30px] text-[14px] font-[400] text-[#000000] py-[20px] px-[10px] bg-[#ffffff] rounded-[10px] flex justify-center flex-col gap-[4px]">
                                        <div className="flex items-center gap-[4px]"><strong>Đánh giá:</strong>  {renderStars(review?.star)}</div>
                                        <div><strong>Nhận xét:</strong> {review?.content}</div>
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p className="text-[16px] font-[700] text-[#000000] text-center">Chưa có đánh giá nào.</p>
                        )}
                    </ul>
                )}
            </div>

            {/* Bình luận */}
            <div className="shadow-[0_0_6px_#dddddd] px-[20px] py-[20px] rounded-[10px]">
                <h3 className="text-[16px] font-[700] text-[#00000] mb-[8px]">
                    Bình luận ({comments?.length})
                </h3>

                {user ? (
                    <form
                        onSubmit={handleCommentSubmit}
                        className="comment-form space-y-3"
                    >
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            required
                            placeholder="Nhập bình luận..."
                            className="w-full border px-[10px] py-[10px] h-[100px] rounded-[8px] outline-none text-[16px] font-[400] text-[#000000]"
                        />
                        <button
                            type="submit"
                            className="text-[16px] font-[400] text-[#ffffff] bg-main rounded-[8px] px-[20px] py-[6px]"
                        >
                            Gửi bình luận
                        </button>
                    </form>
                ) : (
                    <div className="text-center mt-[20px]">
                        <p className="text-[14px] font-[400] text-[#00000]">Bạn cần đăng nhập để bình luận sản phẩm!</p>
                        <Link
                            to="/login"
                            className="text-[16px] font-[400] text-[#ffffff] bg-main rounded-[8px] px-[20px] py-[6px] mt-[20px] hover:text-[#ffffff] inline-block"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                )}

                {loadingComments ? (
                    <p className="text-center text-gray-500">Đang tải bình luận...</p>
                ) : (
                    <ul className="mt-[30px] space-y-2">
                        {comments?.length > 0 ? (
                            comments.map((comment) => (
                                <li key={comment.id} className="border-b pb-[12px] mb-[12px]">
                                    <div className="flex items-center justify-between ">
                                        <span className="text-[16px] font-[700] text-[#000000] mb-[10px]">
                                            {comment?.user?.fullname || "Ẩn danh"}
                                        </span>
                                        <span className="text-[16px] font-[400] text-[#000000] mb-[10px]">
                                            {moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                        </span>
                                    </div>
                                    <p className="ml-[30px] text-[14px] font-[400] text-[#000000] py-[20px] px-[10px] bg-[#f3f4f6] rounded-[10px]">
                                        {comment?.content}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p className="text-[16px] font-[700] text-[#000000] text-center">Chưa có bình luận nào.</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CommentProduct;

