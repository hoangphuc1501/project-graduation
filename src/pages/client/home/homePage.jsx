
import CategoryAnimation from "../../../components/client/animations/categoryAnimation";
import BannerMain from "../../../components/client/banners/banner";
import SaleOff from "../../../components/client/banners/saleOff";
import ServiceBanner from "../../../components/client/banners/serviceBanner";
import Brand from "../../../components/client/brand/brand";

import NewsSection from "../../../components/client/news/newsSection";
import {ProductRackets, ProductShoes, ProductNew} from "../../../components/client/products/productCategory";
import ProductSale from "../../../components/client/products/productSale";
import SmashPro from "../../../components/client/animations/smashPro";

const HomePage = () => {
    return (
        <>
            <BannerMain/>
            <ServiceBanner/>
            <ProductNew/>
            <ProductSale/>
            <ProductRackets/>
            <ProductShoes/>
            <CategoryAnimation/>
            
            <SaleOff/>
            <Brand/>
            <SmashPro/>
            <NewsSection/>
            
        </>
    )
}

export default HomePage;