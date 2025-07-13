import prisma from '../config/prisma'
import { hashPassword, comparePassword } from '../utils/hash'
import { generateToken } from '../utils/token'

export const AuthService = {
  
  login: async (data: any) => {
    const { username, password } = data

    const user = await prisma.usuario.findUnique({ where: { username } })
    if (!user) throw new Error('Usuário não encontrado')

    const valid = await comparePassword(password, user.password)
    if (!valid) throw new Error('Senha inválida')

   const token = generateToken({ username: user.username, tipo: user.tipo })

  await prisma.usuario.update({
    where: { username },
    data: {
      quant_acesso: user.quant_acesso + 1
    }
   })
    return { message: 'Login bem-sucedido', token, tipo: user.tipo }
  }
}
