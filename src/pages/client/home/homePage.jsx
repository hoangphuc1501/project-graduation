
import CategoryAnimation from "../../../components/client/animations/categoryAnimation";
import BannerMain from "../../../components/client/banners/banner";
import SaleOff from "../../../components/client/banners/saleOff";
import ServiceBanner from "../../../components/client/banners/serviceBanner";
import Brand from "../../../components/client/brand/brand";

import NewsSection from "../../../components/client/news/newsSection";
import {ProductNew, ProductFeature} from "../../../components/client/products/productCategory";
import ProductSale from "../../../components/client/products/productSale";
import SmashPro from "../../../components/client/animations/smashPro";
import ServiceSection from "../../../components/client/services/serviceSection";
import ProductRackets from "../../../components/client/products/productRackets";
import ProductShoes from "../../../components/client/products/ProductShoes";

const HomePage = () => {
    return (
        <>
            <BannerMain/>
            <ServiceBanner/>
            <ProductNew/>
            <ProductSale/>
            <ProductFeature/>
            <ProductRackets/>
            <ProductShoes/>
            <CategoryAnimation/>
            
            <SaleOff/>
            <Brand/>
            <SmashPro/>
            <ServiceSection/>
            <NewsSection/>
            
        </>
    )
}

export default HomePage;