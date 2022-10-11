import {useState, useEffect} from "react"
import axios from 'axios'
import {UncontrolledCarousel, Button, Card, CardTitle, CardBody, CardText, CardImg, Row, Col,  Modal,  ModalHeader, ModalBody, Label, Input, ModalFooter } from 'reactstrap'
import { subidaIRompecabeza } from "../firebase/config"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Rompecabeza = () => {
  const MySwal = withReactContent(Swal)
  const [state, dispatch] = useState(0)
  const [cards, setCards] = useState([])
  const [fileB, setFileB] = useState(null)
  const [fileC, setFileC] = useState(null)
  const [formModal, setFormModal] = useState(false)
  const [FormValue, setFormValue] = useState({
        Nombre:"",
        Pieza: 4,
        FileBlanco:"",
        FileColor:"",
        Estado:"ACTIVO"
  })
  const [selecion, setSelecion] = useState({
          _id:'',
          Nombre:'',
          Pieza: 4,
          FileBlanco: " ",
          FileColor:" ",
          Estado:"ACTIVO"
   })
  
  const [editarMod, setEditarMod] = useState(false)
  
  useEffect(() => { 
            axios.get('http://localhost:3002/api/auth/rompecabezaAdmi/mostrartodo').then(response =>  setCards(response.data))
          }, [state])

  const handlechange  = (event)  =>  {
    const {name, value} = event.target
    setFormValue({...FormValue, [name]:value.toUpperCase()})
    console.log(FormValue)
  }
  
     
  const handleAgregar = ()  =>  {
    const postCategoria    =   async ()    => {
      try {
        const ulrC = await subidaIRompecabeza(fileC)
        console.log(ulrC)
        const ulrB  = await subidaIRompecabeza(fileB)
        console.log(ulrB)
       axios({
              url:"http://localhost:3002/api/auth/rompecabezaAdmi",
              method:'POST',
              data: {
                Nombre:FormValue.Nombre,
                Pieza: FormValue.Pieza,
                FileBlanco:ulrB,
                FileColor:ulrC,
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
        Pieza: 4,
        FileBlanco:"",
        FileColor:"",
        Estado:"ACTIVO"
    })
  }
  const Eliminar = Nombr   => {
    axios.delete('http://localhost:3002/api/auth/rompecabezaAdmi/borrar', {data: {Nombre: Nombr }}).then(respuesta =>  {
      MySwal.fire({
        title: `${respuesta.data.titulo}`,
        text: `${respuesta.data.respuesta}`,
        icon: `${respuesta.data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
    }).then(dispatch(state + 1))
    
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
      url:"http://localhost:3002/api/auth/rompecabeza/Editar",
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
      }).then(dispatch(state + 1))
      
      setFormModal(!formModal) 
  }
 
  return (
    <div>
    <div>
        <Button color='primary' outline onClick={() => {  setFormModal(!formModal); setEditarMod(false) }  }>
          Agregar
        </Button>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered '>
        <ModalHeader toggle={() => setFormModal(!formModal)}>Login Form</ModalHeader>
          <ModalBody>
          <div className='mb-2'>
              <Label className='form-label' for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre' name="Nombre" placeholder='Nombre' value={editarMod  === false ?  FormValue.Nombre  : selecion.Nombre}  onChange={editarMod  === false ? handlechange  : handlerFalse}/>
              <Label className='form-label' for='inputFileC'>
              Foto Color
            </Label>
            <Input type='file' id='inputFileC' name='FileColor' onChange={e  => setFileC(e.target.files[0]) } />
              <Label className='form-label' for='inputFileB'>
              Foto Blanco y Negro
            </Label>
            <Input type='file' id='inputFileB' name='FileBlanco' onChange={(e)  => setFileB(e.target.files[0])} />
            <Label>PIEZA</Label><br/>
        <Label> <Input  
            type='radio'
            name="Pieza"
            value={4}
            checked={editarMod === false ? FormValue.Pieza === 4 : selecion.Pieza === 4}
            onChange={editarMod  === false ? handlechange  : handlerFalse}
        />4</Label><br/>
        <Label><Input 
            type='radio'
            name="Pieza"
            value={6}
            checked={ editarMod === false ? FormValue.Pieza === 6 : selecion.Pieza === 6}
            onChange={editarMod  === false ? handlechange  : handlerFalse}
        />6 </Label><br/>
            <Label>ESTADO</Label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            checked={editarMod === false ? FormValue.Estado ===  "ACTIVO" : selecion.Estado === "ACTIVO"}
            onChange={editarMod  === false ? handlechange  : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
            checked={editarMod === false ? FormValue.Estado === "INACTIVO"  : selecion.Estado === "INACTIVO"}
            onChange={editarMod  === false ? handlechange  : handlerFalse}
        />Inactivo
        </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            {editarMod  === false ? <Button color='primary' onClick={handleAgregar}> Agregar </Button> : <Button onClick={handlEditar}  color="primary">Editar</Button>}
          </ModalFooter>
        </Modal>
      </div><br/>
    <Row className='match-height mb-2'>
    {
      cards.map(i =>  (
        
        <Col lg='4' md='6'>
        <Card>
        <CardImg top src={i.FileColor} alt={i.Nombre} />
          <CardBody>
            <CardTitle tag='h4'>{i.Nombre}</CardTitle>
            <CardText>
            <ul>
            <li>Nombre: {i.Nombre}</li>
            <li>Numero de piezas: {i.Pieza} </li>
            <li>Estado: {i.Estado}</li>
            </ul>
            </CardText>
            <Button color='primary' onClick={() => Editar(i)}>
              Editar
            </Button>{" "}
            <Button color='danger' onClick={() =>  Eliminar(i.Nombre)}>
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

export default Rompecabeza