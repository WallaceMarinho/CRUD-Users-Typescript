import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { useAuth } from "./auth/AuthContext"
import type { JSX } from 'react';
import Produtos from "./pages/Produtos"
import CadastroProduto from "./pages/Produtos/CadastroProduto"
import Usuarios from "./pages/Usuarios"
import CadastroUsuario from "./pages/Usuarios/CadastroUsuario"

function PrivateRoute({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) {
  const { user } = useAuth()
  if (!user) return <Login />
  if (adminOnly && user.tipo !== 'A') return <div>Acesso negado.</div>
  return children
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "produtos",
        element: (
          <PrivateRoute>
            <Produtos />
          </PrivateRoute>
        ),
      },
      {
        path: "produtos/CadastroProduto",
        element: (
          <PrivateRoute>
            <CadastroProduto />
          </PrivateRoute>
        ),
      },
      {
       path: "usuarios",
       element: (
         <PrivateRoute adminOnly>
          <Usuarios />
         </PrivateRoute>
     ),
    },
      {
       path: "usuarios/cadastro",
       element: (
         <PrivateRoute adminOnly>
          <CadastroUsuario />
         </PrivateRoute>
      ),
     },
      { path: "login", element: <Login /> },
    ],
  },
])