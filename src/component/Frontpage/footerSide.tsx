import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Tooltip } from "@mui/material";

const Footer = () => {
  return (
    <div className="footer-confiner">
      <div className="footer-bar">
        <div className="footer-services">
          <h3>Services</h3>
          <ul>
            <li>Free Delivery</li>
            <li>24/7 Availability</li>
            <li>Customer Satisfaction</li>
            <li>Easy To Use</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Tel: +971 56 119 9791</p>
          <p>Email: info@24hoursethiopia</p>
          <p>Address: United Arab Emirates</p>
        </div>

        <div className="footer-sm">
          <h4>Follow Us</h4>
          <div className="sm-links">
            <div className="sm-item">
              <Tooltip title="Facebook">
                <a href="#" target="_blank">
                  {" "}
                  <FacebookIcon />
                </a>
              </Tooltip>
            </div>
            <div className="sm-item">
              <Tooltip title="Instagram">
                <a href="#" target="_blank">
                  {" "}
                  <InstagramIcon />
                </a>
              </Tooltip>
            </div>
            <div className="sm-item">
              <Tooltip title="LinkedIn">
                <a href="#" target="_blank">
                  {" "}
                  <LinkedInIcon />
                </a>
              </Tooltip>
            </div>
            <div className="sm-item">
              <Tooltip title="Youtube">
                <a href="#" target="_blank">
                  {" "}
                  <YouTubeIcon />
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="copyrightholder">
        <p>&copy; 2024 Egila Gadgets. All rights reserved</p>
      </div>
    </div>
  );
};
export default Footer;
