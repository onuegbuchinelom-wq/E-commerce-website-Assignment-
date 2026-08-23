import "./Footer.css";

function Footer({ brandName = "GLOWMART" }) {
  return (
    <footer className="footer">
      <p className="footer__text">
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;