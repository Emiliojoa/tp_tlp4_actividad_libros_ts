import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

type FormValues = {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { email: '', password: '' }
  })
  const { errors, isSubmitting } = formState
  const navigate = useNavigate()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const resData = await res.json().catch(() => ({}))

      if (!res.ok) {
        setServerError(resData.message || 'Error en el login')
        return
      }

      if (resData.token) {
        localStorage.setItem('token', resData.token)
      }
      navigate('/tareas')
    } catch (err) {
      console.error(err)
      setServerError('Error de red. Intenta nuevamente.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-sm'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Iniciar Sesión 
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
                required: 'La contraseña es obligatoria'
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
            <div className='text-red-600 bg-red-100 p-3 rounded-md text-sm mb-4'>
              {serverError}
            </div>
          )}

+          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out'
          >
            {isSubmitting ? 'Verificando...' : 'Entrar'}
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-gray-600'>
          ¿No tienes cuenta?{' '}
          <Link
            to='/register'
            className='font-medium text-blue-600 hover:text-blue-500'
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}