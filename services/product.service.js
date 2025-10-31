
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const DB_PATH = resolve('db', 'products.json')

async function readAll() {
  const text = await readFile(DB_PATH, 'utf8').catch(async (e) => {
    if (e.code === 'ENOENT') {           
      await writeFile(DB_PATH, '[]', 'utf8')
      return '[]'
    }
    throw e
  })
  return JSON.parse(text)
}

async function writeAll(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export class ProductService {
  static async getAll() {
    return await readAll()
  }

  static async getById(id) {
    const list = await readAll()
    return list.find(p => String(p.id) === String(id))
  }

  static async getDisponibles() {
    const list = await readAll()
    return list.filter(p => p.disponible === true)
  }

  static async create(payload) {
    const list = await readAll()
    const id = Date.now()               
    const nuevo = { id, ...payload, fecha_ingreso: new Date().toISOString() }
    list.push(nuevo)
    await writeAll(list)
    return nuevo
  }

  static async update(id, payload) {
    const list = await readAll()
    const idx = list.findIndex(p => String(p.id) === String(id))
    if (idx === -1) return null
    const actualizado = { ...list[idx], ...payload } 
    list[idx] = actualizado
    await writeAll(list)
    return actualizado
  }

  static async remove(id) {
    const list = await readAll()
    const idx = list.findIndex(p => String(p.id) === String(id))
    if (idx === -1) return false
    list.splice(idx, 1)
    await writeAll(list)
    return true
  }
}
