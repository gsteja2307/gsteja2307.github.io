
import React from "react";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md="3">
              <Nav>
              <NavItem>
              &copy; 2021 Made with <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJyZWQiIGQ9Ik0xMiA0LjQxOWMtMi44MjYtNS42OTUtMTEuOTk5LTQuMDY0LTExLjk5OSAzLjI3IDAgNy4yNyA5LjkwMyAxMC45MzggMTEuOTk5IDE1LjMxMSAyLjA5Ni00LjM3MyAxMi04LjA0MSAxMi0xNS4zMTEgMC03LjMyNy05LjE3LTguOTcyLTEyLTMuMjd6Ii8+PC9zdmc+" alt="love icon" className="Footer__FooterIcon-sc-1dgef3-1 bhSTbi"/> by Surya Teja  <br/>
              Design Inspiration <a href="https://www.creative-tim.com"> Creative Tim</a> <br/>
              Built with <a href="https://reactjs.org/">React</a>       
                </NavItem>
                <NavItem>
                  <NavLink href="https://opensource.org/licenses/MIT">
                    License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
