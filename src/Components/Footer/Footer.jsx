import { footerName } from "../../constants/strings/HomePage";
import "./footer.css";

function Footer() {
  return (
    <div>
      <h2 className="footer-details">&copy; {footerName}</h2>
    </div>
  );
}

export default Footer;
