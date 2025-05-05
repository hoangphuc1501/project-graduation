
// import React, { useRef, useState } from 'react';

import { useEffect, useState } from "react";
import ListNews from "../../../components/client/news/listNews";
import NewsFeatureSection from "../../../components/client/news/newsFeatureSection";
import SearchNews from "../../../components/client/news/searchNews";
import Loading from "../../../components/client/animations/loading";
import Breadcrumb from "../../../components/client/breadcrumbs/Breadcrumb";


const News = () => {
 const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

  return (
    <>
    <Breadcrumb />
    {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] bg-opacity-[0.6]">
                    <Loading />
                </div>
            )}
      <NewsFeatureSection/>

      <SearchNews/>

      <ListNews/>
    </>
  );
};

export default News;
