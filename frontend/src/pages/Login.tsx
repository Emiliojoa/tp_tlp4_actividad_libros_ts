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
      const res = await fetch('http://localhost:4000/api/login', {
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
    <div style={{ maxWidth: 420, margin: '32px auto', padding: 16 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input
            {...register('email', { required: 'El email es obligatorio' })}
            type="email"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.email && (
            <small style={{ color: 'red' }}>{errors.email.message}</small>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Contraseña</label>
          <input
            {...register('password', { required: 'La contraseña es obligatoria' })}
            type="password"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.password && (
            <small style={{ color: 'red' }}>{errors.password.message}</small>
          )}
        </div>

        {serverError && <div style={{ color: 'red', marginBottom: 12 }}>{serverError}</div>}

        <button type="submit" disabled={isSubmitting} style={{ padding: '8px 16px' }}>
          {isSubmitting ? 'Enviando...' : 'Entrar'}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </div>
    </div>
  )
}