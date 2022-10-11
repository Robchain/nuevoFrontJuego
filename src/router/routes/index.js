// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"

// ** Utils
import { isObjEmpty } from "@utils"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/Login"
const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))
const Error = lazy(() => import("../../views/Error"))
const Rompecabeza = lazy(() =>  import("../../views/Rompecabeza"))
const Vocabulario = lazy(() => import('../../views/Vocabulario'))
const Oracion = lazy(() =>  import('../../views/Oracion'))
const Estudiante  = lazy(() =>  import('../../views/Estudiante'))
const Categoria = lazy(() =>  import('../../views/Categoria'))
const Reporte = lazy(()  =>  import('../../views/Reporte'))
const ActividadCo = lazy(() =>  import('../../views/ActividadCo'))
const Equipo = lazy(()  =>  import('../../views/Equipo'))
const VocabularioJ  = lazy(() =>  import('../../views/VocabularioJ'))
const MenuJ = lazy(() =>  import('../../views/Juego/MenuJ'))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/Rompecabeza",
    element: <Rompecabeza />
  },
  {
    path: "/Vocabulario",
    element: <Vocabulario />
  },
  {
    path: "/Categoria",
    element: <Categoria />
  },
  {
    path: "/Estudiante",
    element: <Estudiante />
  },
  {
    path: "/Oracion",
    element: <Oracion />
  },
  {
    path: "/Equipo",
    element: <Equipo />
  },
  {
    path: "/ActividadCo",
    element: <ActividadCo />
  },
  {
    path: "/ReporteEstudiante",
    element: <Reporte />
  },
  {
    path: "/VocabularioJ",
    element: <VocabularioJ />,
    meta: {
      //menuHidden: true
      layout:"blank"
    }
  },
  {
    path:"/MenuJ",
    element:<MenuJ/>,
    meta:{
      layout:"blank"
    }
  }
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
