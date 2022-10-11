import { Button, Row, Col, Container } from "reactstrap"
import NO from  '../../assets/images/NO.jpg'/*'../../assets/images/NO.jpg'*/
const ActividadCo = () => {
    return (
      <Container>
      <Row>
      <Col  xl="12" lg='11' md='11'  sm="8">
        <Button size="lg"   block   color="primary" style={{margin:10}}>Vocabulario<img width={150} src={NO} alt="tres"/></Button>
        </Col>
        </Row>
        <Row>
        <Col    xl="12" lg='11' md='11'  sm="8">
        <Button size="lg"   block color="success"   style={{margin:10}}>Oracion<img width={150} src={NO} alt="tres"/></Button>
        </Col>
        </Row>
        <Row>
        <Col    xl="12" lg='11' md='11'  sm="8">
        <Button size="lg"   block  color="secondary"    style={{margin:10}}>Carrera<img width={150} src={NO} alt="tres"/></Button>
        </Col>
        </Row>
        <Row>
        <Col xl="12" lg='11' md='11'  sm="8"   >
        <Button size="lg"   block color="primary"   style={{margin:10}}>Trofeo<img width={150} src={NO} alt="tres"/></Button>
        </Col>
        </Row>
      </Container>
    )
  }
  
  export default ActividadCo