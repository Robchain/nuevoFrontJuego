import { User,  Columns,  Users, Image, Circle,  Grid,  Layers, Clipboard} from "react-feather"

export default [
  {
    id: "Estudiante",
    title: "Estudiante",
    icon: <User size={20}/>,
    navLink: "/Estudiante"
  },
  {
    id: "Categoria",
    title: "Categoria",
    icon: <Grid  size={20}/>,
    navLink: "/Categoria"
  },
  {
    id:"Rompecabeza",
    title:"Rompecabeza",
    icon:<Image size={20}/>,
    navLink:"/Rompecabeza"
  },
  {
    id:"Vocabulario",
    title:"Vocabulario",
    icon:<Circle  size={20}/>,
    navLink:"/Vocabulario"
  },
  {
    id:"Oracion",
    title:"Oracion",
    icon:<Columns size={20}/>,
    navLink:"/Oracion"
  },
  {
    id:"Equipo",
    title:"Equipo",
    icon: <Users  size={20}/>,
    navLink:"/Equipo"
  },
  {
    id:"ActividadCo",
    title:"Actividades",
    icon:<Layers  size={20}/>,
    navLink:"/ActividadCo"
  },
  {
    id:"ReporteEstudiante",
    title:"Reportes",
    icon: <Clipboard  size={20} />,
    navLink:"/ReporteEstudiante"
  }
  /*{
    id:"Test",
    title:"test",
    icon: <Clipboard  size={20} />,
    navLink:"/VocabularioJ"
    
  }*/
]
