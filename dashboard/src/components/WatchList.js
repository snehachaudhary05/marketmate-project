import React, { useState, useEffect, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import axios from "axios";
import { DoughnutChart } from "./DoughnutChart";
import BuyActionWindow from "./BuyActionWindow";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const { buyWindowStock, closeBuyWindow, openBuyWindow } = useContext(GeneralContext);

  // Fetch watchlist data
  useEffect(() => {
    if (BACKEND_URL) {
      axios.get(`${BACKEND_URL}/watchlist`) // replace with your real endpoint
        .then((res) => setWatchlist(res.data))
        .catch((err) => console.error("Error fetching watchlist:", err));
    }
  }, [BACKEND_URL]);

  // Doughnut chart data
  const data = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container" style={styles.container}>
      {/* Search bar */}
      <div className="search-container" style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          style={styles.searchInput}
        />
        <span style={styles.counts}>{watchlist.length} / 50</span>
      </div>

      {/* Stock list */}
      <ul style={styles.list}>
        {watchlist.map((stock, index) => (
          <WatchListItem key={index} stock={stock} openBuyWindow={openBuyWindow} />
        ))}
      </ul>

      {/* Doughnut chart */}
      <div style={styles.chartContainer}>
        <DoughnutChart data={data} />
      </div>

      {/* BuyActionWindow */}
      {buyWindowStock && <BuyActionWindow uid={buyWindowStock} />}
    </div>
  );
};

// Single stock row
const WatchListItem = ({ stock, openBuyWindow }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      style={styles.listItem}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div style={styles.item}>
        <p style={{ ...styles.stockName, color: stock.isDown ? "#e74c3c" : "#2ecc71" }}>
          {stock.name}
        </p>
        <div style={styles.itemInfo}>
          <span style={styles.percent}>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown style={{ color: "#e74c3c" }} />
          ) : (
            <KeyboardArrowUp style={{ color: "#2ecc71" }} />
          )}
          <span style={styles.price}>{stock.price}</span>
        </div>
      </div>

      {showActions && <WatchListActions uid={stock.name} openBuyWindow={openBuyWindow} />}
    </li>
  );
};

// Actions (Buy/Sell/Analytics/More)
const WatchListActions = ({ uid, openBuyWindow }) => {
  const handleBuyClick = () => openBuyWindow(uid);

  return (
    <div style={styles.actionsContainer}>
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button style={styles.buyButton} onClick={handleBuyClick}>
          Buy
        </button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button style={styles.sellButton}>Sell</button>
      </Tooltip>
      <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
        <button style={styles.actionButton}>
          <BarChartOutlined />
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button style={styles.actionButton}>
          <MoreHoriz />
        </button>
      </Tooltip>
    </div>
  );
};

// CSS in JS
const styles = {
  container: { padding: "1rem", maxWidth: "100%" },
  searchContainer: { display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1rem" },
  searchInput: { width: "100%", padding: "0.5rem", marginBottom: "0.25rem", fontSize: "1rem", boxSizing: "border-box" },
  counts: { fontSize: "0.9rem", color: "#666" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: { display: "flex", flexDirection: "column", padding: "0.5rem 0", borderBottom: "1px solid #eee" },
  item: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" },
  stockName: { fontWeight: "bold", margin: 0, fontSize: "1rem" },
  itemInfo: { display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" },
  percent: { fontSize: "0.9rem" },
  price: { fontWeight: "bold", fontSize: "0.95rem" },
  actionsContainer: { display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" },
  buyButton: { backgroundColor: "#2ecc71", color: "#fff", border: "none", padding: "0.25rem 0.5rem", borderRadius: "4px", cursor: "pointer" },
  sellButton: { backgroundColor: "#e74c3c", color: "#fff", border: "none", padding: "0.25rem 0.5rem", borderRadius: "4px", cursor: "pointer" },
  actionButton: { backgroundColor: "#3498db", color: "#fff", border: "none", padding: "0.25rem 0.5rem", borderRadius: "4px", cursor: "pointer" },
  chartContainer: { marginTop: "2rem", maxWidth: "100%", overflowX: "auto" },
};

export default WatchList;
