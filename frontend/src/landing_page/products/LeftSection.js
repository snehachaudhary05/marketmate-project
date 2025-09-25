import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>

        {/* Content Section */}
        <div className="col-12 col-md-6 p-3 p-md-5">
          <h1 className="fs-2 fs-md-1">{productName}</h1>
          <p className="text-muted">{productDesription}</p>

          {/* Links */}
          <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
            <a href={tryDemo} className="btn btn-primary px-4">
              Try Demo
            </a>
            <a href={learnMore} className="btn btn-outline-primary px-4">
              Learn More
            </a>
          </div>

          {/* Store Badges */}
          <div className="d-flex justify-content-center justify-content-md-start gap-4 mt-4">
            <a href={googlePlay}>
              <img
                src="media/images/googlePlayBadge.svg"
                alt="Google Play"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                alt="App Store"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
