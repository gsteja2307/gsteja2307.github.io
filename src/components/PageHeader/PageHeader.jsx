
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import Typed from 'react-typed';

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Hello <span role='img' aria-label="hello">&#9995;</span>,</h1>
            <h2>
        <Typed
          strings={[
              "I'm Surya Teja <span role='img' aria-label=\"smile\">&#128516;</span>",
              "Thanks for stopping by <span role='img' aria-label=\"angel\">&#128519;</span>",
              "I'm a full Stack developer <span role='img' aria-label=\"computer\">&#128187;</span>",
              "Currently working as a Software Engineer <span role='img' aria-label=\"work\">&#128188;</span>",
              "Checkout my portfolio for more stuff <span role='img' aria-label=\"up\">&#9757;</span>"
          ]}
          typeSpeed = {9}
          backSpeed = {9}
          loop >           
          </Typed>
          </h2>
          </div>
        </Container>
      </div>
    );
  }
}


export default PageHeader;
