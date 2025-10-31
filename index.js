
import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('API Productos OK'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

console.log("Servidor escuchando correctamente...")
