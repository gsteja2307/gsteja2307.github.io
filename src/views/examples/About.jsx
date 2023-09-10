import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import Typed from 'react-typed';
import Footer from "components/Footer/Footer.jsx";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
let ps ={};
class About extends React.Component {
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
    const aboutPage={
      height:
      "100%"
    };
    return ( 
      <>
        <IndexNavbar /> {/* nav bar*/}
        <br/>
        <br/>
        <div className="wrapper">{/* main div */}
        <section className="section" data-section="about" style={{height:"100%"}}>{/*section div  wrapping all  content*/}
            <Container> {/* the content is in here */}
              <div className="content-center brand">{/* intro */}
              <h1 className="h1-seo" style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
              <Typed
                strings={["Who Am I?"]}
                typeSpeed = {70} >           
              </Typed>
              </h1>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <div style={{aboutPage}}>
              <Row className="justify-content-between">
                <Col md="7">
                  <Row>
                  <div >
                  <div>
                  <p>
                  I've been writing code for past 4 years and I've 20+ months of experience in software industry. 
                  </p>
                  <p>
                  I've gotten my hands dirty in various languages and frameworks. I mostly worked on frontend development, but i'm comfortable in coding back end as well. Data Structures and algorithms is my favourite till date.
                  </p>
                  </div>
                  <br/>
                  <div>
                  <p>
                  Computers fascinate me alot. I am passsionate about building an excellent software, explore things and learn something new everyday.
                  </p>
                  <p>
                  I am responsible for all my projects and I take self development very seriously. I task and try to push myself to the limit every single day and enjoy every second of it. 
                  </p>
                  </div>
                  <br/>
                  <div>
                  <p>
                  My goal is to become a full stack developer and completely utilize my skills in a team of passionate, amazing people and work hard to achieve it.
                  </p>
                  <p>
                    If you are an employer looking to hire or a friend who just wanna talk, feel free to drop an email or tweet me <a href="https://twitter.com/GSuryaTeja10">@GSuryaTeja10</a> :)
                  </p>
                  </div>
                  </div>
                  </Row>                 
                </Col>
                <Col md="3">
                  <Row className="justify-content-between align-items-center">
                    <p className="profile-description text-right">
                    <span><img src={require("../../assets/img/my-image.jpg")} alt="displaypicture" /> </span>
                    </p>
                  </Row>
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

export default About;
