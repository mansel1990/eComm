import React from "react";
import { Row, Col } from "react-bootstrap";
import fb from "../images/fb.svg";
import insta from "../images/insta.svg";
import phone from "../images/phone.svg";
import mail from "../images/mail.svg";

const Footer = () => {
  return (
    <footer className="footer-cls py-3">
      <Row className="footer-row-cls">
        <Col lg={4} sm={12}>
          <div className="footer-div-left-cls px-5">
            <img className="footer-icon-img-cls" src={phone} alt="img" />
            9686812526
          </div>
          <div className="footer-div-left-cls px-5">
            <img className="footer-icon-img-cls" src={mail} alt="img" />
            gaiasoapschennai@gmail.com
          </div>
        </Col>
        <Col lg={4} sm={12}>
          <div>&copy; Gaia soaps</div>{" "}
          <div>* Cold Pressed | Natural | Skin Safe *</div>
        </Col>
        <Col lg={4} sm={12} className="footer-div-right-cls px-5">
          <div>Follow us on: </div>
          <a
            href="https://www.facebook.com/gaiasoapschennai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer-icon-img-cls" src={fb} alt="img" />
          </a>
          <a
            href="https://www.instagram.com/gaiasoapschennai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer-icon-img-cls" src={insta} alt="img" />
          </a>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
