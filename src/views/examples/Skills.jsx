
import React from "react";
import Typed from 'react-typed';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx"

let ps = {};

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      try{

      ps.destroy();
      }
      catch{
        
      }
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
    return (
      <>
        <IndexNavbar />
        <br/>
        <br/>
        <div className="wrapper">
          <section className="section">
            <Container>
            <div className="content-center brand">{/* intro */}
              <h1 className="h1-seo" style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
              <Typed
                strings={["What I am capable of..."]}
                typeSpeed = {70} >           
              </Typed>
              </h1>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <div>
                <Row className="content-center">
                  <Col md = "4">
                    <div class="col1"> 
                        <span style={{fontSize:"90px"}}><i class="fas fa-code"></i></span>
                        <h5>I started with C, migrated to Java soon, later and now really interested in Javascript and Python</h5>
                        <div>
                          <h4>Languages I Know</h4>
                          <div>
                            <p>C</p>
                            <p>Java</p>
                            <p>Python</p>
                            <p>Javascript</p>
                          </div>
                        </div>
                    </div>
                    
                  </Col>
                  <Col md = "4">
                  <div class="col1"> 
                        <span style={{fontSize:"90px"}}><i class="fas fa-atom"></i></span>
                        <h5>I started with Reactjs, I use MERN stack for web development and React-Native for App Development</h5>
                        <div>
                          <h4>Frameworks/Libraries I have worked with</h4>
                          <div>
                            <p>React,Redux,ES6,React Native,Redux Forms</p>
                            <p>RESTful Services</p>
                            <p>Node, Express</p>
                            <p>SQL server, MySQL, MongoDB</p>
                            <p>Python scripting</p>
                          </div>
                        </div>
                    </div>
                  </Col>
                  <Col md = "4">
                  <div class="col1"> 
                        <span style={{fontSize:"90px"}}><i class="fas fa-tools"></i></span>
                        <h5>These are some of the many tools I use daily</h5>
                        <div>
                          <h4>Tools I Use</h4>
                          <div>
                            <p>Git</p>
                            <p>VSCode</p>
                            <p>Eclipse</p>
                            <p>Pycharm</p>
                            <p>Repl</p>
                            <p>Terminal/Powershell</p>
                          </div>
                        </div>
                    </div>
                  </Col>            
    
                </Row>
              </div>
            </Container>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default Skills;
