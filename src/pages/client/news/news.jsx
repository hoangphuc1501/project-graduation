
// import React, { useRef, useState } from 'react';

import ListNews from "../../../components/client/news/listNews";
import NewsFeatureSection from "../../../components/client/news/newsFeatureSection";
import SearchNews from "../../../components/client/news/searchNews";


const News = () => {

  return (
    <>
      <NewsFeatureSection/>

      <SearchNews/>

      <ListNews/>
    </>
  );
};

export default News;
