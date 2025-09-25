import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ["Dashboard", "Orders", "Holdings", "Positions", "Funds", "Apps"];

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsMobileMenuOpen(false); // close mobile menu after selection
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="mobile-topbar">
        <img src="logo.png" alt="Logo" className="mobile-logo" />
        <button className="hamburger" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {/* Original Desktop Sidebar */}
      <div className="menu-container">
        <img src="logo.png" style={{ width: "50px" }} />
        <div className="menus">
          <ul>
            <li>
              <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
                <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
                <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
                <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
                <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
                <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(5)}>
                <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
              </Link>
            </li>
          </ul>
          <hr />
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">ZU</div>
            <p className="username">USERID</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            {menuItems.map((name, idx) => (
              <li key={idx}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/${name.toLowerCase()}`}
                  onClick={() => handleMenuClick(idx)}
                >
                  <p className={selectedMenu === idx ? activeMenuClass : menuClass}>{name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        /* Mobile Top Bar */
        .mobile-topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: #f7f7f7;
          border-bottom: 1px solid #ccc;
        }

        .mobile-logo {
          width: 40px;
          height: auto;
        }

        .hamburger {
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Mobile Dropdown Menu */
        .mobile-menu {
          position: absolute;
          top: 60px; /* height of topbar */
          left: 0;
          width: 100%;
          background: #f7f7f7;
          padding: 10px 0;
          border-top: 1px solid #ccc;
          z-index: 1000;
        }

        .mobile-menu ul {
          list-style: none;
          margin: 0;
          padding: 0 20px;
        }

        .mobile-menu ul li {
          margin: 10px 0;
        }

        /* Responsive Rules */
        @media (max-width: 768px) {
          .menu-container {
            display: none; /* hide sidebar on mobile */
          }

          .mobile-topbar {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          body {
            margin-left: 0; /* keep desktop content as before */
          }
        }
      `}</style>
    </>
  );
};

export default Menu;
