import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { UsuarioController } from '../controllers/usuarioController';

const router = Router();

router.post('/', authenticateToken, UsuarioController.create);
router.get('/', authenticateToken, UsuarioController.list);
router.put('/:username', authenticateToken, UsuarioController.update);
router.delete('/:username', authenticateToken, UsuarioController.delete);
router.post('/access', authenticateToken, UsuarioController.access); 

export default router;
