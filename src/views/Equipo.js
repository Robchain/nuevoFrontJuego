import {useState, useEffect} from  'react'
import { Button, Modal, ModalHeader, ModalBody, CardImg, ModalFooter, Input, Label, Row, Col, Card, CardBody, CardText, CardTitle } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { subidaIEquipo } from "../firebase/config"
import withReactContent from 'sweetalert2-react-content'
const Equipo = () => {
  const MySwal = withReactContent(Swal)
  const [file, setFile] = useState(null)
  const [state, dispatch] = useState(0)
  const [formModal, setFormModal] = useState(false)
  const [card, setCard] = useState([])
  const [FormValue, setFormValue] = useState({
    Nombre:"",
    Imagen:"",
    Estado:"ACTIVO"
  })
  const [selecion, setSelecion] = useState({
    _id:"",
    Nombre:"",
    Imagen:"",
    Estado:"ACTIVO"
  })
  const [editarMod, setEditarMod] = useState(false)
  const handlechange = (event) =>  {
    const {name, value} = event.target
    setFormValue({...FormValue, [name]:value.toUpperCase()})
  }
  useEffect(() => {
    axios.get("http://localhost:3002/api/auth/Equipo/mostrartodo").then(response =>  setCard(response.data))
    
    }, [state])

  const handleAgregar = ()  =>  {
    const postCategoria    =   async ()    => {
      try {
        const data = await subidaIEquipo(file)
      await axios({
              url:"http://localhost:3002/api/auth/Equipo",
              method:'POST',
              data: {
                Nombre:FormValue.Nombre,
                Imagen:data,
                Estado:FormValue.Estado
              }
          }).then(respuesta  => { 
            MySwal.fire({
            title: `${respuesta.data.titulo}`,
            text: `${respuesta.data.respuesta}`,
            icon: `${respuesta.data.type}`,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false}) 
          }).catch(
            MySwal.fire({
            title: 'Error!',
            text: "Falto un campo",
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          })).then(dispatch(state + 1))
        } catch (e) {
          console.log(e)
      } 
  }
  postCategoria()
  setFormModal(!formModal) 
  setFormValue({
      Nombre:"",
      Imagen:"",
      Estado:"ACTIVO"

  })
  }
  const Eliminar = Nombr   => {
    axios.delete('http://localhost:3002/api/auth/Equipo/Eliminar', {data: {Nombre: Nombr }}).then(respuesta =>  {
      MySwal.fire({
        title: `${respuesta.data.titulo}`,
        text: `${respuesta.data.respuesta}`,
        icon: `${respuesta.data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
    }).then(dispatch(state + 1))
    //window.location.reload(false)
  }
  const Editar = Nombre =>  {
    setFormModal(!formModal)
    setSelecion(Nombre)
    setEditarMod(true)
  }
  const handlerFalse  = (e) =>  {
    const {name, value} = e.target
    setSelecion({...selecion, [name]:value.toUpperCase()})
  }
  const handlEditar = async ()  =>  {
      await axios({
      url:"http://localhost:3002/api/auth/Equipo/editar",
      method:"POST",
      data:selecion
      }).then(respuesta  => { 
        MySwal.fire({
        title: `${respuesta.data.titulo}`,
        text: `${respuesta.data.respuesta}`,
        icon: `${respuesta.data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
      })
      
      setFormModal(!formModal) 
      dispatch(state + 1)
  }
  return (
    <div>
    <Button color='primary' outline onClick={() => {  setFormModal(!formModal); setEditarMod(false) } }>
    Agregar
  </Button>
  <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered '>
        <ModalHeader toggle={() => setFormModal(!formModal)}>Agregar Equipo</ModalHeader>
          <ModalBody>
          <div className='mb-2'>
              <Label className='form-label' for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre' name="Nombre" placeholder='Nombre' value={editarMod === false  ? FormValue.Nombre :  selecion.Nombre}  onChange={editarMod === false ? handlechange  : handlerFalse}/>
              <Label className='form-label' for='inputFileB'>
              Foto Del Equipo
            </Label>
            <Input type='file' id='inputFileB' name='Imagen' onChange={e  =>  setFile(e.target.files[0])}/>
            <label>ESTADO</label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            checked={editarMod === false ?  FormValue.Estado ===  "ACTIVO"  : selecion.Estado === "ACTIVO"}
            onChange={ editarMod === false ? handlechange  : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
            checked={editarMod === false ?  FormValue.Estado ===  "INACTIVO"  : selecion.Estado === "INACTIVO"}
            onChange={editarMod ===  false ? handlechange : handlerFalse}
        />Inactivo
        </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            {editarMod  === false ? <Button color='primary' onClick={handleAgregar}>Agregar</Button> : <Button onClick={handlEditar} color="primary"> Editar</Button> }
          </ModalFooter>
        </Modal>
        <Row className='match-height mb-2'><br/>
    {
      card.map(i =>  (
        
        <Col lg='4' md='6'>
        <Card>
          <CardImg top src={i.Imagen} alt={i.Nombre} />
          <CardBody>
            <CardTitle tag='h4'>{i.Nombre}</CardTitle>
            <CardText>
            <ul className='list-unstyled'>
          <li> Nombre: {i.Nombre}</li>
          <li>Estado: {i.Estado}</li>
            </ul>
            </CardText>
            <Button color='primary' onClick={() => Editar(i)} >
              Editar
            </Button>{" "}
            <Button color='danger' onClick={()  =>  Eliminar(i.Nombre)}>
              Eliminar
            </Button>
          </CardBody>
        </Card>
        </Col>
      ))
    }
    </Row>
      </div>
  )
}

export default Equipo