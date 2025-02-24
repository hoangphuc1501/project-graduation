import React from "react";

const decodeHTMLEntities = (text) => {
    if (!text) return ""; // Tránh lỗi nếu `text` là null hoặc undefined
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.body.innerHTML;
};

const TinyMceToHtml = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(content) }} />;
};

export default TinyMceToHtml;