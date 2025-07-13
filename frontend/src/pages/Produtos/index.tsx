import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

type Produto = {
  id: number
  nome: string
  preco: number
  criadoPor: string
  criadoEm: string
  atualizadoEm: string
}

export default function Produtos() {
  const { token } = useAuth()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProdutos() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('http://localhost:3000/produtos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos')
        }
        const data = await response.json()
        setProdutos(data)
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }
    fetchProdutos()
  }, [token])

  if (loading) return <div>Carregando produtos...</div>
  if (error) return <div>Erro: {error}</div>
  if (produtos.length === 0)
    return (
      <div>
        <button onClick={() => navigate('/produtos/novo')}>Novo Produto</button>
        Nenhum produto cadastrado.
      </div>
    )

  return (
    <div>
      <h1>Produtos</h1>
      <button onClick={() => navigate('/produtos/CadastroProduto')}>Novo Produto</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Criado por</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.criadoPor}</td>
              <td>{new Date(produto.criadoEm).toLocaleString()}</td>
              <td>{new Date(produto.atualizadoEm).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}