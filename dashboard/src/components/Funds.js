import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="fund-buttons">
          <Link className="btn btn-green">Add funds</Link>
          <Link className="btn btn-blue">Withdraw</Link>
        </div>
      </div>

      <div className="row">
        {/* Equity Column */}
        <div className="col">
          <span>
            <p className="col-title">Equity</p>
          </span>

          <div className="table">
            {[
              { label: "Available margin", value: "4,043.10", colored: true },
              { label: "Used margin", value: "3,757.30" },
              { label: "Available cash", value: "4,043.10" },
              { label: "Opening Balance", value: "4,043.10" },
              { label: "Opening Balance", value: "3,736.40" },
              { label: "Payin", value: "4,064.00" },
              { label: "SPAN", value: "0.00" },
              { label: "Delivery margin", value: "0.00" },
              { label: "Exposure", value: "0.00" },
              { label: "Options premium", value: "0.00" },
              { label: "Collateral (Liquid funds)", value: "0.00" },
              { label: "Collateral (Equity)", value: "0.00" },
              { label: "Total Collateral", value: "0.00" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="data">
                  <p>{item.label}</p>
                  <p className={`imp ${item.colored ? "colored" : ""}`}>
                    {item.value}
                  </p>
                </div>
                {(idx === 2 || idx === 5 || idx === 9) && <hr />}
              </div>
            ))}
          </div>
        </div>

        {/* Commodity Column */}
        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .funds {
          margin-bottom: 20px;
        }
        .fund-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .btn {
          padding: 8px 15px;
          border-radius: 5px;
          text-decoration: none;
          color: white;
          font-weight: bold;
        }
        .btn-green {
          background-color: #28a745;
        }
        .btn-blue {
          background-color: #007bff;
        }
        .row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .col {
          flex: 1;
          min-width: 250px;
        }
        .col-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .table {
          background: #f7f7f7;
          padding: 15px;
          border-radius: 8px;
        }
        .data {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        }
        .imp {
          font-weight: bold;
        }
        .colored {
          color: #28a745;
        }
        hr {
          border: 0;
          border-top: 1px solid #ccc;
          margin: 10px 0;
        }
        .commodity {
          background: #f7f7f7;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .row {
            flex-direction: column;
          }
          .fund-buttons {
            flex-direction: column;
            gap: 10px;
          }
          .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Funds;
