// Backend/src/routes/usuarioRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { UsuarioController } from '../controllers/usuarioController';

const router = Router();

// Rota protegida para criar um novo usuário
router.post('/', authenticateToken, UsuarioController.create);
router.get('/', authenticateToken, UsuarioController.list);
router.put('/:username', authenticateToken, UsuarioController.update);
router.delete('/:username', authenticateToken, UsuarioController.delete);
router.post('/access', authenticateToken, UsuarioController.access); // Rota para registrar acesso

export default router;
