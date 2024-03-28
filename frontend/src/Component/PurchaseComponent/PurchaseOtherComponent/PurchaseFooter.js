import React from 'react';
import '../PurchaseCssFiles/PurchaseFooter.css'; // Ensure this CSS file has appropriate styles defined
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PurchaseFooter() {
  return (
    <Container fluid className="bg-white footer-custom  fw-bold " >
      <Row className="justify-content-center text-center py-5">
        <Col md={3} sm={6} xs={12} className="mb-4">
          <h5><u>About</u></h5>
          <Link to="/contactpage" className="text-decoration-none ">Contact us</Link>
        </Col>

        <Col md={3} sm={6} xs={12} className="mb-4">
          <h5><u>Developed By</u></h5>
          <p className='text-primary'>ASHIK M I<br/>
            HRITHIK T G<br/>
            MANOJ M<br/>
            RACHAN DEVAIAH M V</p>
        </Col>

        <Col md={3} sm={6} xs={12} className="mb-4">
          <h5><u>Cohort Owner</u></h5>
          <p className='text-primary'>Mrs Vedhashree C G <br/>Dept of Computer Science</p>
        </Col>

        <Col md={3} sm={6} xs={12} className="mb-4">
          <h5><u>Institution</u></h5>
          <img src="./Images/collegelogo.jpg"  alt='collegelogo'></img>
          <p className='text-primary'>Cauvery Polytechnic Gonikoppal<br/>
                                      Gonikoppal 571213<br/>
                                      Kodagu ,Karnataka</p>
        </Col>
      </Row>
    </Container>
  );
}

export default PurchaseFooter;
