import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import produtoRoutes from './routes/produtoRoutes';
import usuarioRoutes from './routes/usuarioRoutes';

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('API está rodando')
})

app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
