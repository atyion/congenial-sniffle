import React from "react";

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      width: "100%",
      margin: 0,
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      height: "80px",
    },
    logo: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      color: "#3182ce",
      textDecoration: "none",
      marginRight: "2000px",
    },
    navMenu: {
      display: "flex",
      gap: "35px",
    },
    navLink: {
      color: "#4a5568",
      textDecoration: "none",
      fontSize: "1.2rem",
    },
    navLinkHover: {
      color: "#2c5282",
    },
  };

  return (
    <nav style={styles.navbar}>
      <a href="/" style={styles.logo}>
        Twitter
      </a>
      <div style={styles.navMenu}>
        <a
          href="/"
          style={styles.navLink}
          onMouseEnter={(e) =>
            (e.target.style.color = styles.navLinkHover.color)
          }
          onMouseLeave={(e) => (e.target.style.color = styles.navLink.color)}
        >
          Home
        </a>
        <a
          href="/about"
          style={styles.navLink}
          onMouseEnter={(e) =>
            (e.target.style.color = styles.navLinkHover.color)
          }
          onMouseLeave={(e) => (e.target.style.color = styles.navLink.color)}
        >
          About
        </a>
        <a
          href="/services"
          style={styles.navLink}
          onMouseEnter={(e) =>
            (e.target.style.color = styles.navLinkHover.color)
          }
          onMouseLeave={(e) => (e.target.style.color = styles.navLink.color)}
        >
          Services
        </a>
        <a
          href="/contact"
          style={styles.navLink}
          onMouseEnter={(e) =>
            (e.target.style.color = styles.navLinkHover.color)
          }
          onMouseLeave={(e) => (e.target.style.color = styles.navLink.color)}
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
