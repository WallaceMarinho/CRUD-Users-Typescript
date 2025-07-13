import jwt from 'jsonwebtoken';

export function generateToken(payload: any) {
  const SECRET_KEY = process.env.JWT_SECRET || 'minha_chave_secreta';
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}
