// Backend\src\routes/produtoRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { ProdutoController } from '../controllers/produtoController';

const router = Router();

// Rota protegida para criar um novo produto
router.post('/', authenticateToken, ProdutoController.create); // Alterado para '/'
router.get('/', authenticateToken, ProdutoController.list); // Alterado para '/'
router.put('/:id', authenticateToken, ProdutoController.update); // Alterado para incluir ':id'
router.delete('/:id', authenticateToken, ProdutoController.delete); // Alterado para incluir ':id'

export default router;
