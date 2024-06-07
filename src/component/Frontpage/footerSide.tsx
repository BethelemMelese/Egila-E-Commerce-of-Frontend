import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Tooltip } from "@mui/material";

export const Box = styled.div`
  background-image: linear-gradient(
    to right,
    hsl(347, 86%, 83%),
    rgb(240, 223, 129, 0.4)
  );
  width: 100%;
  @media (max-width: 1000px) {
    // padding: 70px 30px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 50px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 100px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #000;
  margin-bottom: 10px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #000;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #000;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Footer = () => {
  return (
    <Box>
      <FooterContainer>
        <Row>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Free Delivery</FooterLink>
            <FooterLink href="#">24/7 Availability</FooterLink>
            <FooterLink href="#">Customer Satisfaction</FooterLink>
            <FooterLink href="#">Easy To Use</FooterLink>
          </Column>

          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <Tooltip title="Facebook">
                <i className="fab fa-facebook-f">
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    <FacebookIcon />
                  </span>
                </i>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Instagram">
                <i className="fab fa-instagram">
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    <InstagramIcon />
                  </span>
                </i>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="LinkedIn">
                <i className="fab fa-twitter">
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    <LinkedInIcon />
                  </span>
                </i>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Youtube">
                <i className="fab fa-youtube">
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    <YouTubeIcon />
                  </span>
                </i>
              </Tooltip>
            </FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Tel: +251941202673</FooterLink>
            <FooterLink href="#">
              <p>Email: egila@ecommecrece.et</p>
            </FooterLink>
          </Column>
        </Row>
      </FooterContainer>
    </Box>
  );
};
export default Footer;
