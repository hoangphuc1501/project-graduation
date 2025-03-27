import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
    const query = new URLSearchParams(useLocation().search);
    const code = query.get('code');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-main mb-4">
                {code === '00' ? 'Thanh toán thành công!' : 'Thanh toán thất bại hoặc bị hủy.'}
            </h1>
            <a href="/" className="text-blue-600 underline">Quay về trang chủ</a>
        </div>
    );
};

export default PaymentResult;
