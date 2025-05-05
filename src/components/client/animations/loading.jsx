import React from "react";
import "./loading.css"; 

const Loading = () => {
    return (
        <div className="loader">
            <div className="loading-text">
                Loading
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
            </div>
            <div className="loading-bar-background">
                <div className="loading-bar">
                    <div className="white-bars-container">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="white-bar"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
