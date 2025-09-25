import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-12 col-md-6 p-3 p-md-5 order-2 order-md-1">
          <h1 className="fs-2">{productName}</h1>
          <p className="text-muted">{productDesription}</p>
          {learnMore && (
            <a href={learnMore} className="btn btn-outline-primary mt-3 px-4">
              Learn More
            </a>
          )}
        </div>

        {/* Image Section */}
        <div className="col-12 col-md-6 text-center order-1 order-md-2 mb-4 mb-md-0">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
