import React from 'react'
import { Row, Col, CardImg, Container, Button } from 'reactstrap'
import Test from '../assets/images/text.jpg'


const VocabularioJ = () => {
  const elem = document.documentElement
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem = window.top.document.body //To break out of frame in IE
      elem.msRequestFullscreen()
    }
  }
 
  
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      window.top.document.msExitFullscreen()
    }
  }
    
  return (
    <Container  >
<Row>
        <Col xl="6" lg='6' md='6'  sm="8"  >
        <CardImg  src={Test} alt='card2' />
          </Col>
          <Col  xl="6" lg='6' md='6'    >
        <CardImg src={Test} alt='card2' />
        </Col>
        <Col   xl="6" lg='6' md='6'   >
        <CardImg  src={Test} alt='card2'   />
        </Col>
         <Col xl="6" lg='6' md='6'   >
        <CardImg  src={Test} alt='card2'  />
        </Col>  
     </Row>
     <Container>
     <Row>
      <Col  lg="2">  <Button onClick={()  =>  closeFullscreen()}> inicio </Button></Col><Col lg="2"  onClick={()  => openFullscreen()}><Button>volver</Button></Col>
    </Row>
   </Container>
   </Container>
   /*  <>
   <div className='padre1'>
    <img   className='son' src={Test} alt="card2"/>
    <img   className='son' src={Test} alt="card2"/>
    </div>
    <div  className='padre2'>
    <img  className='son' src={Test} alt="card2"/>
    <img  className='son' src={Test} alt="card2"/>
    </div>
    <Button > inicio </Button>{"  "}<Button>volver</Button>{"  "} <Button color="primary"  onClick={()  => openFullscreen()}>salir de pantalla completa</Button>{"  "}
    <Button color="primary" onClick={()  =>  closeFullscreen()}>a</Button>
   </>*/
  )
}

export default VocabularioJ