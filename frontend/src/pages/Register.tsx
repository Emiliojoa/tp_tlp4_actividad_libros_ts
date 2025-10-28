import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

type FormValues = {
  nombre: string
  edad: number
  email: string
  password: string
}

export default function Register() {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { nombre: '', edad: 18, email: '', password: '' }
  })
  const { errors, isSubmitting } = formState
  const navigate = useNavigate()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const resData = await res.json().catch(() => ({}))

      if (!res.ok) {
        setServerError(resData.message || 'Error en el registro')
        return
      }

      if (resData.token) {
        localStorage.setItem('token', resData.token)
      }

      navigate('/')
    } catch (err) {
      console.error(err)
      setServerError('Error de red. Intenta nuevamente.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Registrarte 
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Nombre
            </label>
            <input
              {...register('nombre', { required: 'El nombre es obligatorio' })}
              type='text'
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.nombre && (
              <small className='text-red-500 text-sm mt-1 block'>
                {errors.nombre.message}
              </small>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Edad
            </label>
            <input
              {...register('edad', {
                required: 'La edad es obligatoria',
                valueAsNumber: true,
                min: { value: 0, message: 'Edad inválida' }
              })}
              type='number'
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.edad && (
              <small className='text-red-500 text-sm mt-1 block'>
                {errors.edad.message}
              </small>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido'
                }
              })}
              type='email'
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.email && (
              <small className='text-red-500 text-sm mt-1 block'>
                {errors.email.message}
              </small>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Contraseña
            </label>
            <input
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
              type='password'
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.password && (
              <small className='text-red-500 text-sm mt-1 block'>
                {errors.password.message}
              </small>
            )}
          </div>

          {serverError && (
            <div className='text-red-600 bg-red-100 p-3 rounded-md text-sm'>
              {serverError}
            </div>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out'
          >
            {isSubmitting ? 'Enviando...' : 'Registrarme'}
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-gray-600'>
          ¿Ya tienes cuenta?{' '}
          <Link to='/' className='font-medium text-blue-600 hover:text-blue-500'>
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}