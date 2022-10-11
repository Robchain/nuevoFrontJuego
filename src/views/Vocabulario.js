import {useState, useEffect} from "react"
import axios from 'axios'
import { Button, Card, CardTitle, CardBody, CardText, CardImg, Row, Col,  Modal,  ModalHeader, ModalBody, Label, Input, ModalFooter, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { subidaIVocabulario } from "../firebase/config"
const Vocabulario = () => {
  const MySwal = withReactContent(Swal)
  const [video, setVideo] = useState(null)
  const [ask, setAsk] = useState(null)
  const [imagen, setImagen] = useState(null)
  const [state, dispatch] = useState(0)
  const [cards, setCards] = useState([])
  const [list, setList] = useState([])
  const [formModal, setFormModal] = useState(false)
  const [FormValue, setFormValue] = useState({
    Categoria:"",
    Palabra:"",
    Silaba:"",
    FileMuestra:"",
    FilePregunta:"",
    FileImagen:"",
    Estado:"ACTIVO" 
  })
  const [selecionado, setSelecionado] = useState({
    _id:'',
    Categoria:"",
    Palabra:"",
    Silaba:"",
    FileMuestra:"FileMuestra",
    FilePregunta:"FilePregunta",
    FileImagen:"FileImagen",
    Estado:"ACTIVO"
  })
  const [editarMod, setEditarMod] = useState(false)
  

  useEffect(() => {
    axios.get('http://localhost:3002/api/auth/VocabularioAdmi/mostrartodo').then(response =>  setCards(response.data))
    axios.get('http://localhost:3002/api/auth/Categoria/mostrartodo').then(response =>  setList(response.data))
  }, [state])
 const handlechange  =   (event)  => {
    const {name, value} =  event.target
setFormValue({...FormValue, [name]:value.toUpperCase()})
}
const handleAgregar = ()  =>  {
  const postCategoria    =   async ()    => {
    try {
      const vM = await subidaIVocabulario(video)
      const askV = await subidaIVocabulario(ask)
      const Img   = await subidaIVocabulario(imagen)
    await axios({
            url:"http://localhost:3002/api/auth/vocabularioAdmi",
            method:'POST',
            data: {
              Categoria:FormValue.Categoria,
              Palabra:FormValue.Palabra,
              Silaba:FormValue.Silaba,
              FileMuestra:vM,
              FilePregunta:askV,
              FileImagen:Img,
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
        })).then(dispatch(state  + 1))
      } catch (e) {
        console.log(e)
    } 
}
postCategoria()
setFormModal(!formModal) 
setFormValue({
  Categoria:"",
  Palabra:"",
  Silaba:"",
  FileMuestra:"",
  FilePregunta:"",
  FileImagen:"",
  Estado:"ACTIVO" 
})

//window.location.reload(false)
}
const Eliminar = Nombr   => {
  axios.delete('http://localhost:3002/api/auth/vocabularioAdmi/borrar', {data: {Palabra: Nombr }}).then(respuesta =>  {
    MySwal.fire({
      title: `${respuesta.data.titulo}`,
      text: `${respuesta.data.respuesta}`,
      icon: `${respuesta.data.type}`,
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false})
  }).then(dispatch(state  + 1))  
}
const Editar = Nombre =>  {
  setFormModal(!formModal)
  setSelecionado(Nombre)
  setEditarMod(true)
}
const handlerFalse  = (e) =>  {
  const {name, value} = e.target
  setSelecionado({...selecionado, [name]:value.toUpperCase()})
}
const handlEditar = async ()  =>  {
  
    await axios({
    url:"http://localhost:3002/api/auth/vocabulario/Editar",
    method:"POST",
    data:selecionado
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
   // window.location.reload(false)
    setFormModal(!formModal) 
    dispatch(state  + 1)
}

  return (
    <div>
    <div>
        <Button color='primary' outline onClick={() => {  setFormModal(!formModal); setEditarMod(false) } }>
          Agregar
        </Button>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered '>
        <ModalHeader toggle={() => setFormModal(!formModal)}>Login Form</ModalHeader>
          <ModalBody>
            <div className='mb-2'>
              <Label className='form-label' for='categoria'>Categoria</Label><br/>
              <select  name="Categoria"    onChange={editarMod  === false ? handlechange  : handlerFalse }>
                        {list.map(i => (<option   key={i._id} value={i.NombreCategoria}>{i.NombreCategoria}</option>))}
                    </select><br/>
              <Label className='form-label' for='palabra'>Palabra</Label>
              <Input type='text' id='palabra' name="Palabra" placeholder='Palabra' value={editarMod === false ? FormValue.Palabra : selecionado.Palabra}  onChange={editarMod  === false ? handlechange  : handlerFalse}/>
              <Label className='form-label' for='categoria'>Silaba</Label>
              <Input type='text' id='categoria' name="Silaba" placeholder='Silaba' value={editarMod === false ? FormValue.Silaba  : selecionado.Silaba}  onChange={editarMod  === false ? handlechange  : handlerFalse}/>
              <Label className='form-label' for='inputImage'>
              Imagen 
            </Label>
            <Input type='file' id='inputImage' name='FileImagen' onChange={e  =>  setImagen(e.target.files[0])}/>
              <Label className='form-label' for='inputVideoM'>
              Video de Muestra
            </Label>
            <Input type='file' id='inputVideoM' name='FileMuestra'  onChange={e =>  setVideo(e.target.files[0])}/>
            <Label className='form-label' for='inputask'>
              Video Pregunta
            </Label>
            <Input type='file' id='inputask' name='FilePregunta'  onChange={e =>  setAsk(e.target.files[0])}/>
            
            <Label>Estado</Label><br/>
        <Label> <input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            checked={editarMod === false ? FormValue.Estado ===  "ACTIVO" : selecionado.Estado ===  'ACTIVO' }
            onChange={ editarMod  === false ? handlechange  : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <input  
            type='radio'
            name="Estado"
            value="Inactivo"
            checked={editarMod === false ? FormValue.Estado ===  "INACTIVO" : selecionado.Estado ===  'INACTIVO'}
            onChange={  editarMod === false ? handlechange  : handlerFalse}
        />Inactivo
        </Label>
            </div>
          </ModalBody>
          <ModalFooter>
          {  
            editarMod === false ? <Button color='primary' onClick={handleAgregar} >Agregar</Button> : <Button color="primary" onClick={handlEditar}>  Editar  </Button>
           }
          </ModalFooter>
        </Modal>
      </div><br/>
    <Row className='match-height mb-2'>
    {
      cards.map(i =>  (
        <Col lg='4' md='6'>
        <Card>
          <CardImg top src={i.FileImagen} alt={i.Palabra} />
          <CardBody>
            <CardTitle tag='h4'>{i.Palabra}</CardTitle>
            <CardText>
            <ul className='list-unstyled' key={i._id}>
          <li>Categoria: {i.Categoria}</li>
          <li>Silaba: {i.Silaba}</li>
          <li>Estado: {i.Estado}</li>
              </ul>
            </CardText>
            <Button color='primary' onClick={() =>  Editar(i)}>
              Editar
            </Button>{" "}
            <Button color='danger' onClick={()  =>  Eliminar(i.Palabra)}>
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

export default Vocabulario