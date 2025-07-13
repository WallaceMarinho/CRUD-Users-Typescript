import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { hashPassword } from '../utils/hash'; 

export const UsuarioController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const { username, password, nome, tipo } = req.body;

    if (req.user.tipo !== 'A') {
      res.status(403).json({ error: 'Acesso negado. Apenas administradores podem criar usuários.' });
      return;
    }

    try {
      const hashedPassword = await hashPassword(password); // Faça o hash aqui!
      const usuario = await prisma.usuario.create({
        data: {
          username,
          password: hashedPassword,
          nome,
          tipo,
          status: 'A',
        },
      });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  list: async (req: Request, res: Response): Promise<void> => {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    const { nome, tipo, status } = req.body;

    
    if (req.user.tipo !== 'A') {
      res.status(403).json({ error: 'Acesso negado. Apenas administradores podem atualizar usuários.' });
      return;
    }

    try {
      const usuario = await prisma.usuario.update({
        where: { username },
        data: { nome, tipo, status },
      });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;

   
    if (req.user.tipo !== 'A') {
      res.status(403).json({ error: 'Acesso negado. Apenas administradores podem deletar usuários.' });
      return;
    }

    try {
      await prisma.usuario.delete({
        where: { username },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  access: async (req: Request, res: Response): Promise<void> => {
    const { username } = req.user; 

    try {
      await prisma.usuario.update({
        where: { username },
        data: {
          quant_acesso: { increment: 1 }, 
        },
      });
      res.status(200).json({ message: 'Acesso registrado com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
