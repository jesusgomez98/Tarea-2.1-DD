
import { sendResponse } from '../helpers/send_response.js'
import { validateProduct } from '../schemas/product.schema.js'
import { ProductService } from '../services/product.service.js'

export const listProducts = async (req, res, next) => {
  try {
    const data = await ProductService.getAll()
    sendResponse({ res, message: 'Listado de productos', data })
  } catch (e) { next(e) }
}

export const getProduct = async (req, res, next) => {
  try {
    const item = await ProductService.getById(req.params.id)
    if (!item) return sendResponse({ res, message: 'Producto no encontrado', statusCode: 404 })
    sendResponse({ res, message: 'Detalle de producto', data: item })
  } catch (e) { next(e) }
}

export const listDisponibles = async (req, res, next) => {
  try {
    const data = await ProductService.getDisponibles()
    sendResponse({ res, message: 'Productos disponibles', data })
  } catch (e) { next(e) }
}

export const createProduct = async (req, res, next) => {
  try {
    const parsed = validateProduct(req.body)
    if (!parsed.success) {
      return sendResponse({
        res,
        message: 'Entrada invalida',
        statusCode: 400,
        data: parsed.error.issues
      })
    }
    const creado = await ProductService.create(parsed.data)
    sendResponse({ res, message: 'Producto creado', statusCode: 201, data: creado })
  } catch (e) { next(e) }
}

export const updateProduct = async (req, res, next) => {
  try {
    const parsed = validateProduct(req.body)
    if (!parsed.success) {
      return sendResponse({
        res,
        message: 'Entrada invalida',
        statusCode: 400,
        data: parsed.error.issues
      })
    }
    const actualizado = await ProductService.update(req.params.id, parsed.data)
    if (!actualizado) return sendResponse({ res, message: 'Producto no encontrado', statusCode: 404 })
    sendResponse({ res, message: 'Producto actualizado', data: actualizado })
  } catch (e) { next(e) }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const ok = await ProductService.remove(req.params.id)
    if (!ok) return sendResponse({ res, message: 'Producto no encontrado', statusCode: 404 })
    sendResponse({ res, message: 'Producto eliminado', data: null })
  } catch (e) { next(e) }
}
