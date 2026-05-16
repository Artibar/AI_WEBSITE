import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/Login.css'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { useAuth } from "../hooks/useAuth.js"
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const { createLogin, createGoogleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

 const handleLogin = async (e) => {
    e.preventDefault() 
    try {
        const res = await createLogin({email, password})
        if (res && res.success) {
            return navigate('/dashboard')
        }
    } catch (error) {
        console.error('Error during login:', error)
    }
}

  const handleGoogleLogin = async () => {
    try {
      const res = await createGoogleLogin()
      console.log("google login response", res);
      if(res && res.success){
        return navigate('/dashboard')
      }
    } catch (error) {
      console.error("Error during Google login:", error)
    }
    
  }

  return (
    <main className='login-page'>
      <section className='login-panel'>
        <header className='login-header'>
          <h3>AI powered Login</h3>
          <h2>GenWeb<span className='brand-highlight'>Ai</span></h2>
          <p>Securely authenticate and generate your project in seconds.</p>
        </header>

        <button type='button' className='button social-login' onClick={handleGoogleLogin}>
          <span className='google-icon' aria-hidden='true'>
            <svg width='18' height='18' viewBox='0 0 533.5 544.3' xmlns='http://www.w3.org/2000/svg'>
              <path fill='#4285f4' d='M533.5 278.4c0-17.4-1.4-34.1-4-50.4H272v95.4h146.9c-6.4 34.7-25.3 64.2-54 84.1v69h87.2c51-46.9 80.4-116.3 80.4-197.1z' />
              <path fill='#34a853' d='M272 544.3c73.8 0 135.7-24.4 181-66.4l-87.2-69c-24.1 16.2-55 25.8-93.8 25.8-72 0-133-48.6-154.7-113.8h-91v71.6c45.2 89.9 137.9 152.8 245.7 152.8z' />
              <path fill='#fbbc04' d='M117.3 325.9c-10.6-31.5-10.6-65.3 0-96.8V158h-91C5.4 210.5 0 241.6 0 272.2s5.4 61.7 26.3 95.2l91-41.5z' />
              <path fill='#ea4335' d='M272 107.5c39.9 0 75.9 13.7 104.1 40.7l78.1-78.1C405.8 25.7 346.9 0 272 0 164.3 0 71.6 62.9 26.3 158l91 71.6C139 156.1 200 107.5 272 107.5z' />
            </svg>
          </span>
          Continue with Google
        </button>

        <div className='divider'><span>or</span></div>

        <form onSubmit={handleLogin} className='login-form'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />

          <button type='submit' className='button primary-button'>Sign In</button>
        </form>

        <p className='login-footer'>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </section>
    </main>
  )
}

export default Login