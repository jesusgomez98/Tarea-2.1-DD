
import * as z from 'zod'

const productSchema = z.object({
  nombre: z.string({ required_error: 'El nombre es obligatorio' })
           .min(1, 'El nombre es obligatorio'),
  precio: z.number({ invalid_type_error: 'El precio debe ser numerico' })
           .positive('El precio debe ser mayor a cero'),
  descripcion: z.string()
                .min(10, 'La descripcion debe tener al menos 10 caracteres'),
  disponible: z.boolean()
}).strict()

export const validateProduct = (payload) => productSchema.safeParse(payload)
