import { useSkin } from "@hooks/useSkin"
import { Link} from "react-router-dom"
import { Facebook, Twitter, Mail, GitHub } from "react-feather"
import InputPasswordToggle from "@components/input-password-toggle"
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap"
import "@styles/react/pages/page-authentication.scss"


const Login = () => {
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

  const { skin } = useSkin()
  

  const illustration = skin === "dark" ? "login-v2-dark.svg" : "loginI.png",
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner">
        <Col className="d-none d-lg-flex justify-content-start" lg="8" sm="12"  xl='8'>
          <div className="d-none d-lg-flex align-self-start justify-content-center ">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center teste auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
          xl='4'
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
             Bienvenidos!
            </CardTitle>
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) =>  e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Correo
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                   Contraseña
                  </Label>
                  <Link Link to="/forgot-password">
                    <small>¿Olvidaste la contraseña?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                />
              </div>
              <Button tag={Link} to="/Categoria" color="primary" block onClick={()  => openFullscreen()} >
                Ingresar
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">¿No tienes una cuenta?</span>
              <Link to="/register">
                <span>Crea una cuenta</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">o</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
