import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { ProdutoController } from '../controllers/produtoController';

const router = Router();

router.post('/', authenticateToken, ProdutoController.create); 
router.get('/', authenticateToken, ProdutoController.list); 
router.put('/:id', authenticateToken, ProdutoController.update); 
router.delete('/:id', authenticateToken, ProdutoController.delete); 

export default router;
