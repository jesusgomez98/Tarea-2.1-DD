


import express from 'express'
import productsRouter from './routes/products.routes.js'   // ← import router
import { handleError } from './middlewares/handleError.js' // ← import error handler

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('API Productos OK'))

app.use('/productos', productsRouter)  // ← montar rutas aquí


app.use((req, res) => {
  res.status(404).json({ success: false, message: 'No existe este recurso', data: null })
})

// Manejo de errores (siempre al final)
app.use(handleError)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

console.log("Servidor escuchando correctamente...")


