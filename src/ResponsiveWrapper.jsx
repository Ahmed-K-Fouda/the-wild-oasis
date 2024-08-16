import React, { useState, useEffect } from "react";

const ResponsiveWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1180);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          <h1>😔Sorry, this application is not available on mobile devices.</h1>
          <p style={{ color: "darkred", fontSize: "1.3rem" }}>
            Please access it from a computer with a screen width of at least
            1180px.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ResponsiveWrapper;
