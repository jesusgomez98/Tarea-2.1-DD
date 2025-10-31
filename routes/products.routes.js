
import { Router } from 'express'
import {
  listProducts,
  getProduct,
  listDisponibles,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js'

const router = Router()

router.get('/', listProducts)
router.get('/disponibles', listDisponibles)
router.get('/:id', getProduct)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
