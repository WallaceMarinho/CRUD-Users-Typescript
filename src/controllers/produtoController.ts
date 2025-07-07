// Backend\src\controllers/produtoController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const ProdutoController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, preco } = req.body;
      const produto = await prisma.produto.create({
        data: {
          nome,
          preco,
          criadoPor: req.user.username // Pegando do token JWT
        },
      });
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  list: async (req: Request, res: Response): Promise<void> => {
    try {
      const produtos = await prisma.produto.findMany();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, preco } = req.body; // Supondo que você tenha esses campos
    try {
      const produto = await prisma.produto.update({
        where: { id: Number(id) },
        data: { nome, preco },
      });
      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await prisma.produto.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
