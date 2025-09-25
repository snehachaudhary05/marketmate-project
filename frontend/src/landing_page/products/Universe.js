import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The MarketMate Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        {/* Example card */}
        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" alt="Smallcase" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>

        {/* Signup Button */}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <button
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto", display: "block" }}
          >
            Signup Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Universe;
