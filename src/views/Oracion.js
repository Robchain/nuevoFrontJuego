import {useState, useEffect} from "react"
import axios from 'axios'
import { Button, Card, CardTitle, CardBody, CardText, CardImg, Row, Col,  Modal,  ModalHeader, ModalBody, Label, Input, ModalFooter } from 'reactstrap'
import { subidaIOracion } from "../firebase/config"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const SecondPage = () => {
  const MySwal = withReactContent(Swal)
  const [sujeto, setSujeto] = useState(null)
  const [Adjetivo, setAdjetivo] = useState(null)
  const [askQue, setAskQue] = useState(null)
  const [askComplemento, setAskComplemento] = useState(null)
  const [askCompleja, setAskCompleja] = useState(null)
  const [Muestra, setMuestra] = useState(null)
const [state, dispatch] = useState(0)
  const [cards, setCards] = useState([])
  const [list, setList] = useState([])
  const [formModal, setFormModal] = useState(false)
  const [FormValue, setFormValue] = useState({
    Categoria:"",
    Oracion:"",
    Verbo:"",
    FileSujetoImagen:"",
    FileAdjetivoImagen:"",
    FileVideoPreguntaQue:"",
    FileVideoPreguntaComplemento:"",
    FileVideoPreguntaCompleja:"",
    FileVideoMuestra:"",
    Estado:"ACTIVO"
  })
  const [selecionado, setSelecionado] = useState({
    _id:"",
    Categoria:"",
    Oracion:"",
    Verbo:"",
    FileSujetoImagen:"",
    FileAdjetivoImagen:"",
    FileVideoPreguntaQue:"",
    FileVideoPreguntaComplemento:"",
    FileVideoPreguntaCompleja:"",
    FileVideoMuestra:"",
    Estado:"ACTIVO"
  })
  const [editarMod, setEditarMod] = useState(false)
  
  useEffect(() => {
    axios.get('http://localhost:3002/api/auth/OracionAdmi/mostrartodo').then(response =>  setCards(response.data))
    axios.get('http://localhost:3002/api/auth/Categoria/mostrartodo').then(response =>  setList(response.data))
  }, [state])
  const handlechange  = (event)  =>  {
    const {name, value} = event.target
    setFormValue({...FormValue, [name]:value.toUpperCase()})
  }

  const handleAgregar = ()  =>  {
    const postCategoria    =   async ()    => {
      try {
        const a = await subidaIOracion(sujeto)
        const b = await subidaIOracion(Adjetivo)
        const c = await subidaIOracion(askQue)
        const d = await subidaIOracion(askComplemento)
        const e = await subidaIOracion(askCompleja)
        const f = await subidaIOracion(Muestra)
      axios({
              url:"http://localhost:3002/api/auth/OracionAdmi",
              method:'POST',
              data: {
                Categoria:FormValue.Categoria,
    Oracion:FormValue.Oracion,
    Verbo:FormValue.Verbo,  
    FileSujetoImagen:a,
    FileAdjetivoImagen:b,
    FileVideoPreguntaQue:c,
    FileVideoPreguntaComplemento:d,
    FileVideoPreguntaCompleja:e,
    FileVideoMuestra:f,
    Estado:"ACTIVO"
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
    Categoria:"",
    Oracion:"",
    Verbo:"",
    FileSujetoImagen:"",
    FileAdjetivoImagen:"",
    FileVideoPreguntaQue:"",
    FileVideoPreguntaComplemento:"",
    FileVideoPreguntaCompleja:"",
    FileVideoMuestra:"",
    Estado:"ACTIVO"
  })
  }
  const Eliminar = Nombr   => {
    axios.delete('http://localhost:3002/api/auth/OracionAdmi/borrar', {data: {Oracion: Nombr }}).then(respuesta =>  {
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
    setSelecionado(Nombre)
    setEditarMod(true)
  }
  const handlerFalse  = (e) =>  {
    const {name, value} = e.target
    setSelecionado({...selecionado, [name]:value.toUpperCase()})
  }
  const handlEditar = async ()  =>  {
      await axios({
      url:"http://localhost:3002/api/auth/OracionAdmi/Editar",
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
      }).then(dispatch(state + 1))
      //window.location.reload(false)
      setFormModal(!formModal) 
      
  }
  return (
    <div>
    <div>
    <Button color='primary' outline onClick={ () => { setFormModal(!formModal); setEditarMod(false) }  }>
      Agregar
    </Button>
    <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered modal-lg '>
    <ModalHeader toggle={() => setFormModal(!formModal)}>Agregar Oracion</ModalHeader>
      <ModalBody>
      <Row>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='categoria'>Categoria</Label><br/>
              <select  name="Categoria"    onChange={editarMod  === false  ? handlechange : handlerFalse}>
                        {list.map(i => (<option   key={i._id} value={i.NombreCategoria}>{i.NombreCategoria}</option>))}
                    </select><br/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoPreguntaQuien'>
              Video Pregunta "Quien"
            </Label>
            <Input type='file' id='FileVideoPreguntaQuien' name='FileVideoPreguntaQuien'  onChange={e => setAskQue(e.target.files[0])} />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Oracion
              </Label>
              <Input type='text' name='Oracion' id='lastNameMulti' placeholder='Oracion' onChange={editarMod  === false  ? handlechange : handlerFalse}  value={ editarMod  === false ? FormValue.Oracion  : selecionado.Oracion}/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='FileVideoPreguntaComplemento'>
                Video Pregunta Complemento
              </Label>
              <Input type='file' id='inputFile' name='FileVideoPreguntaComplemento' onChange={e => setAskComplemento(e.target.files[0]) } />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='FileSujetoImagen'>
                Imagen del Sujeto
              </Label>
              <Input type='file' id='FileSujetoImagen' name='FileSujetoImagen' onChange={e  => setSujeto(e.target.files[0])}/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoPreguntaCompleja'>
              Video Pregunta Compleja
            </Label>
            <Input type='file' id='FileVideoPreguntaCompleja' name='FileVideoPreguntaCompleja'  onChange={e =>  setAskCompleja(e.target.files[0])} />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                Verbo
              </Label>
              <Input type='text' name='Verbo' id='cityMulti' placeholder='Verbo' onChange={editarMod  === false  ? handlechange : handlerFalse} value={editarMod  === false ? FormValue.Verbo  : selecionado.Verbo } />
            </Col>  
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoMuestra'>
              Video Muestra
            </Label>
            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' onChange={e  => setMuestra(e.target.files[0])}/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileAdjetivoImagen'>
              Imagen del Adjetivo
            </Label>
            <Input type='file' id='FileAdjetivoImagen' name='FileAdjetivoImagen' onChange={e  => setAdjetivo(e.target.files[0])}/>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-2'>
            <Label className='form-label' for='EmailMulti'>
                Tipo Usuario
              </Label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            checked={editarMod === false ? FormValue.Estado ===  "ACTIVO" : selecionado.Estado  === 'ACTIVO'}
            onChange={editarMod  === false  ? handlechange : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
            checked={editarMod ===  false ? FormValue.Estado === "INACTIVO"  : selecionado.Estado  === "INACTIVO"}
            onChange={editarMod  === false  ? handlechange : handlerFalse}
        />Inactivo</Label> </div>
            </Col>
           </Row>
      </ModalBody>
      <ModalFooter>
        {editarMod  === false ? <Button color='primary'  onClick={handleAgregar}>Agregar</Button> : <Button color="primary" onClick={handlEditar}>Editar</Button>}
      </ModalFooter>
    </Modal>
  </div><br/>
    <Row className='match-height mb-2'>
    {
      cards.map(i =>  (
        <Col lg='4' md='6'>
        <Card>
          <CardImg top src={i.FileSujetoImagen} alt={i.Oracion} />
          <CardBody>
            <CardTitle tag='h4'>{i.Oracion}</CardTitle>
            <CardText>
            <ul className='list-unstyled'>
            <li>Verbo: {i.Verbo}</li>
          <li>Categoria: {i.Categoria}</li>
          <li>Estado: {i.Estado}</li>
              </ul>
            </CardText>
            <Button color='primary' onClick={() =>  Editar(i)}>
              Editar
            </Button>{" "}
            <Button color='danger'  onClick={() =>  Eliminar(i.Oracion)} >
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

export default SecondPage
