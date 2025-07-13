import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

type Usuario = {
  username: string
  nome: string
  tipo: string
  status: string
  quant_acesso?: number
  tent_acesso?: number
}

export default function Usuarios() {
  const { token, user } = useAuth()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    async function fetchUsuarios() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários')
        }
        const data = await response.json()
        setUsuarios(data)
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchUsuarios()
  }, [token, user])

  if (user?.tipo !== 'A') {
  return <div>Acesso negado. Apenas administradores podem visualizar os usuários.</div>
}

  if (loading) return <div>Carregando usuários...</div>
  if (error) return <div>Erro: {error}</div>
  if (usuarios.length === 0) return <div>Nenhum usuário cadastrado.</div>

  return (
    <div>
      <h1>Usuários</h1>
      <button onClick={() => navigate('/usuarios/cadastro')}>Novo Usuário</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Qtd. Acessos</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.username}>
              <td>{usuario.nome}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.status}</td>
              <td>{usuario.quant_acesso ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}