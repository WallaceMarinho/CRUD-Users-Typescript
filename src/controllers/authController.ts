import { Request, Response } from 'express'
import { AuthService } from '../services/authService'


export const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const result = await AuthService.register(req.body)
      res.status(201).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const result = await AuthService.login(req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  }
}

