
import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('API Productos OK'))

const PORT = process.env.PORT || 3000


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'No existe este recurso',
    data: null
  })
})


import { handleError } from './middlewares/handleError.js'
app.use(handleError)


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

console.log("Servidor escuchando correctamente...")

