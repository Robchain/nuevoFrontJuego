import { useEffect, useState} from "react"
import { Table, DropdownItem, DropdownMenu,  UncontrolledDropdown, DropdownToggle, Modal, Button, ModalHeader, Label, Input, ModalBody, ModalFooter} from 'reactstrap'
import { Edit, Trash, MoreVertical} from 'react-feather'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Categoria = () => {
  const MySwal = withReactContent(Swal)
  const [state, dispatch] = useState(0)  //forzar un actualizacion aun cuando no haya cambios no recomendable
  const [tabla, setTabla] = useState([])
  const [formModal, setFormModal] = useState(false) //modal cerrado
  const [editarMod, setEditarMod] = useState(false) // modo editar desactivado
  const [selecinado, setSelecinado] = useState(   // seleccionado de dato eligido
    {
      _id:'',
      NombreCategoria:'',
      Estado:'ACTIVO'
    }
  )
  const [FormValue, setFormValue] = useState({  //estado incial de los datos en el formulario inical
    NombreCategoria:'',
    Estado:'ACTIVO'
  })
  const handlechange  =   (event)  => { // manejo de cambios en el formulario de agregar
    const {name, value} =  event.target

setFormValue({...FormValue, [name]:value.toUpperCase()})

}
  useEffect(() => { // useefect que se ejecutara al arrancar el componente 
      axios.get('http://localhost:3002/api/auth/Categoria/mostrartodo').then(response =>  setTabla(response.data))
  }, [state])

  const handleAgregar = ()  =>  {
    
    const postCategoria    =   async ()    => {
      /*try {
      await axios({
              url:"http://localhost:3002/api/auth/Categoria",
              method:'POST',
              data: FormValue
          })
        } catch (e) {
          console.log(e)
      } */
      axios.post("http://localhost:3002/api/auth/Categoria", FormValue).then(MySwal.fire({
        title: 'Good job!',
        text: 'You clicked the button!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      }))
  }
  postCategoria()
  setFormModal(!formModal) 
  dispatch(state + 1)
  setFormValue({
    NombreCategoria:'',
    Estado:'ACTIVO'
  })  
 // window.location.reload(false) //actualiza la pagina automaticamente
  }
  const Eliminar = (Nombr,  e)   => {
    setEditarMod(editarMod === false)
    e.preventDefault()
    axios.delete('http://localhost:3002/api/auth/Categoria/borrar', {data: {NombreCategoria: Nombr }})
    dispatch(state + 1)
   // window.location.reload(false)
  }
  const Editar  = (Data, e) => {  
    e.preventDefault()
    setFormModal(!formModal)
    setSelecinado(Data)
    setEditarMod(true)
    
}
  const handlerFalse  = (e)  => {
      const {name, value} = e.target
      setSelecinado({...selecinado, [name]:value.toUpperCase()})
  }
 const handlEditar = async  ()  => {
  
  await axios({
    url:"http://localhost:3002/api/auth/Categoria/Editar",
    method:'POST',
    data: selecinado
})
    /*axios.post("http://localhost:3002/api/auth/Categoria/Editar", {data:{_id:selecinado._id, NombreCategoria:selecinado.NombreCategoria, Estado: selecinado.Estado}})*/
    setFormModal(!formModal) 
    dispatch(state + 1)
    //window.location.reload(false)
  }
  return (
    <div>
     <div>
        <Button color='primary' outline onClick={() => { setFormModal(!formModal); setEditarMod(false) }}>
          Agregar
        </Button>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setFormModal(!formModal)}>Agregar Categoria</ModalHeader>
          <ModalBody>
            <div className='mb-2'>
              <Label className='form-label' for='categoria'>Categoria</Label>
              <Input type='text' id='categoria' name="NombreCategoria" placeholder='Categoria' value={editarMod === false ? FormValue.NombreCategoria : selecinado.NombreCategoria}  onChange={editarMod  === false ? handlechange : handlerFalse}/>
            </div>
            <div className='mb-2'>
            <Label>ESTADO</Label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            checked={FormValue.Estado ===  "ACTIVO"}
            onChange={ editarMod  === false ? handlechange : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
            checked={FormValue.Estado === "INACTIVO"}
            onChange={editarMod  === false ? handlechange : handlerFalse}
        />Inactivo
        </Label>
            </div>
          </ModalBody>
          <ModalFooter>
          { 
            editarMod === false ? <Button color='primary' onClick={handleAgregar}> Agregar</Button> : <Button color="primary" onClick={handlEditar} > Editar</Button>
          }
          </ModalFooter>
        </Modal>
      </div>
      <br/>
    <Table striped >
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {tabla.map(i  =>  (
              <tr key={i._id}>
                <td>{i.NombreCategoria}</td>
                <td>{i.Estado}</td>
                <td>
                <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href='/' onClick={e => Editar(i, e)}>
                  <Edit className='me-50'  size={15} /> <span className='align-middle'>Editar</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e =>  Eliminar(i.NombreCategoria, e)}>
                  <Trash className='me-50' size={15} /> <span className='align-middle'>Borrar</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
              </td>
            </tr>))}
      </tbody>
      </Table>
      </div>
  )
}

export default Categoria