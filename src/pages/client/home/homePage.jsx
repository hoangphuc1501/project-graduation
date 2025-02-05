
import BannerMain from "../../../components/client/banners/banner";
import SaleOff from "../../../components/client/banners/saleOff";
import ServiceBanner from "../../../components/client/banners/serviceBanner";
import Brand from "../../../components/client/brand/brand";
import Footer from "../../../components/client/footer/footer";
import Header from "../../../components/client/headers/header";
import NewsSection from "../../../components/client/news/newsSection";


const HomePage = () => {
    return (
        <div className="">
            <BannerMain/>
            <Brand/>
            <NewsSection/>
            <ServiceBanner/>
            <SaleOff/>
        </div>
    )
}

export default HomePage;