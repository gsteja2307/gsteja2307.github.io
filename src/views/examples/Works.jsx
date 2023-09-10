
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx"

let ps = {};

class Works extends React.Component {
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
        <div className="wrapper">
        <div className="section">
            <Container>
              <Row className="justify-content-between">
                <Col md="5">
                  <h1 className="profile-title text-left">Rancour Animus</h1>
                  <h5 className="text-on-back">01</h5>
                  <p className="profile-description text-left">
                    Rancour Animus is a plan management app , got some plans?
                    then login to the app and add all your plans to the dashboard
                    to keep track of them , more over you can edit and delete 
                    the plans when you are done with them. 
                    Built using Nodejs,Expressjs,ExpressHandlebars,bootstrap
                  </p>
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="primary"
                      href="#pablo"
                      onClick={e => window.open("https://github.com/gsteja2307/rancour-animus",'_blank')}
                    >
                      <i className="tim-icons icon-book-bookmark" /> Source Code
                    </Button>
                    {/*
                         <Button
                      className="btn-simple"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-bulb-63" /> Demo
                    </Button>
                    */}
                   
                  </div>
                </Col>
                <Col md="6">
                  <h1 className="profile-title text-left">VijayCommerce</h1>
                  <h5 className="text-on-back">02</h5>
                  <p className="profile-description text-left">
                    A Responsive scalable Ecommerce Website built using Reactjs,Redux,Firebase.
                    Do you own a youtube channel or a blog ? and have a huge fan following ?
                    Do you wish to launch your own Ecommerce Website , then you are at the right place!!
                    This commerce website can be hosted by yourselves , because this is serverless built 
                    on Firebase , all your marchendise can be uploaded in json format to firebase and
                    it takes care of rendering to it front end
                  </p>
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="primary"
                      href="#pablo"
                      onClick={e => window.open("https://github.com/gsteja2307/vijaycommerce",'_blank')}
                    >
                      <i className="tim-icons icon-book-bookmark" /> Source Code
                    </Button>
                    {/*
                      <Button
                      className="btn-simple"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-bulb-63" /> Demo
                    </Button>
                     */}
                    
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="section">
            <Container>
              <Row className="justify-content-between">
                <Col md="6">
                  <h1 className="profile-title text-left">Memory Game</h1>
                  <h5 className="text-on-back">03</h5>
                  <p className="profile-description text-left">
                    Feelign bored ? then this 8 X 8 Tile game is a must try!
                    In this game there are 8 pairs of cards shuffled and randomly
                    placed in 8 X 8 grid , you must flip each card at a time and try 
                    to pick the another card of the pair which u flipped earlier, if 
                    you pick the wrogn card , then the old card is flipped back and 
                    you must try again. try to finish the game in least number of steps 
                    possible. Built using : HTML, CSS, Javascript
                    
                  </p>
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="primary"
                      href="#pablo"
                      onClick={e => window.open("https://github.com/gsteja2307/MemoryGame",'_blank')}
                      
                    >
                      <i className="tim-icons icon-book-bookmark" /> Source Code
                    </Button>
                    <Button
                      className="btn-simple"
                      color="info"
                      href="#pablo"
                      onClick={e => window.open("https://surya-memory-game.000webhostapp.com/",'_blank')}
                    >
                      <i className="tim-icons icon-bulb-63" /> Demo
                    </Button>
                  </div>
                </Col>
                <Col md="5">
                   <h1 className="profile-title text-left">Student Complaint Board</h1>
                  <h5 className="text-on-back">04</h5>
                  <p className="profile-description text-left">
                    A complaint managment CMS website built using HTML,CSS,JS,PHP,MYSQL
                    This website an organisation/Institute in managing their public relations.
                    The admin can view and manage the complaints raised by the students and 
                    assign them to staff to ensure the problem is solved. If the student is 
                    not satisfied with the result he can reopen the complaint which can be further
                    solved by the Admin
                  </p>
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="primary"
                      href="#pablo"
                      onClick={e => window.open("https://github.com/gsteja2307/StudentComplaintBoard",'_blank')}
                    >
                      <i className="tim-icons icon-book-bookmark" /> Source Code
                    </Button>
                    {/*
                    
                    <Button
                      className="btn-simple"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-bulb-63" /> Demo
                    </Button>
                     */}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
         <div className="section">
            <Container>
              <Row className="justify-content-between">
                <Col md="6">
                  <h1 className="profile-title text-left">Robo Friends</h1>
                  <h5 className="text-on-back">05</h5>
                  <p className="profile-description text-left">
                    Too tierd of browsing through image less contacts ? or do u feel agnoized looking at
                    mobile screen when searchign through ccontacts ? Dont worry ! just export your
                    Contacts in JSOn format and upload it to this website and Browse through them and more over they will all have fancy looking Robot Images 
                    
                  </p>
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="primary"
                      href="#pablo"
                      onClick={e => window.open("https://github.com/gsteja2307/robofriends",'_blank')}
                      
                    >
                      <i className="tim-icons icon-book-bookmark" /> Source Code
                    </Button>
                   
                  </div>
                </Col>
                <Col md="5">
                  <h1 className="profile-title text-left">Hangman</h1>
                  <h5 className="text-on-back">06</h5>
                  <p className="profile-description text-left">
                  Classic hangman game. Guess the word without hanging the man.   
                  </p>
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="primary"
                      href="#pablo"
                      onClick={e => window.open("https://github.com/gsteja2307/Hangman",'_blank')}
                      
                    >
                      <i className="tim-icons icon-book-bookmark" /> Source Code
                    </Button>
                   
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          
          <Footer />
        </div>
      </>
    );
  }
}

export default Works;
