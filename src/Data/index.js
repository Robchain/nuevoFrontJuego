import axios from 'axios'

export const categorias = () => axios.get('http://localhost:3002/api/auth/Categoria/mostrartodo').then(response =>  setTabla(response.data))